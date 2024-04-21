import React, {useEffect, useState} from "react"
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/en-gb';
import dayjs, {Dayjs} from "dayjs";
import {DateRange} from "@mui/icons-material";
import axios from "axios";
import {BASE_URL, PORT} from "../../utils/constants";
import Button from "../button/Button";

type DateRange = {from: Dayjs, to: Dayjs}

const BookingDatePicker = ({listingId, maxBookDuration}:{listingId: string | undefined, maxBookDuration: number}) => {
    const [startDate, setStartDate] = useState<Dayjs | null>();
    const [endDate, setEndDate] = useState<Dayjs | null>();
    const [bookedDates, setBookedDates] = useState<DateRange[]>([]);

    useEffect(() => {
        axios.get(BASE_URL + ':' + PORT + `/api/listings/bookings/${listingId}`)
            .then(res => {
                let bookings = res.data;
                let dates: DateRange[] = []
                bookings.forEach((booking: any) => dates.push({from: dayjs(booking.start_date), to: dayjs(booking.end_date)}))
                setBookedDates(dates);
            })
            .catch((e: any) => alert(e.response.data));
    }, []);

    const dateIsBooked = (date: dayjs.Dayjs | null | undefined) => {
        if (!date) return false;
        return bookedDates.some((range) => {
            return date >= range.from && date <= range.to
        })
    }

    const dateIsDisabled = (date: Dayjs) => {
        if (!date) return false;
        if (!startDate) return true;
        let nextBookedDate = getNextBookedDate(startDate);
        return date < startDate || date >= nextBookedDate;
    }

    const getNextBookedDate = (from: dayjs.Dayjs) => {
        let date = from;
        let counter = 0;
        while (!dateIsBooked(date) && counter < maxBookDuration) {
            date = date.add(1, 'day');
            counter++;
        }
        return date;
    }

    const handleStartDateChange = (e: any) => {
        setStartDate(e);
    }

    return(
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
                <DatePicker label="From" value={startDate} onChange={handleStartDateChange} shouldDisableDate={dateIsBooked} minDate={dayjs()}/>
                <DatePicker label="To" value={endDate} onChange={setEndDate} shouldDisableDate={dateIsDisabled} minDate={dayjs()}/>
            </LocalizationProvider>
        </div>
    )
}
export default BookingDatePicker;
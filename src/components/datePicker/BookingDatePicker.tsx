import React, {useEffect, useState} from "react"
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/en-gb';
import dayjs, {Dayjs} from "dayjs";
import {DateRange} from "@mui/icons-material";
import axios from "axios";
import {BASE_URL, PORT} from "../../utils/constants";

type DateRange = {from: Dayjs, to: Dayjs}

const BookingDatePicker = ({listingId, maxBookDuration, startDate, endDate, handleSetStartDate, handleSetEndDate, disabled}:{
    listingId: string | undefined,
    maxBookDuration: number,
    startDate: Dayjs | null | undefined,
    endDate: Dayjs | null | undefined,
    handleSetStartDate: (e:any) => void,
    handleSetEndDate: (e:any) => void
    disabled: boolean
}) => {
    const [bookedDates, setBookedDates] = useState<DateRange[]>([]);

    useEffect(() => {
        axios.get(BASE_URL + ':' + PORT + `/api/listings/bookings/${listingId}`)
            .then(res => {
                let bookings = res.data;
                let dates: DateRange[] = []
                bookings.forEach((booking: any) => {
                    if (booking.start_date && booking.end_date) {
                        dates.push({from: dayjs(booking.start_date.split('T')[0]), to: dayjs(booking.end_date.split('T')[0])});
                    }
                })
                setBookedDates(dates);
            })
            .catch((e: any) => alert(e.response.data));
    }, [disabled]);

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
        return date <= startDate || date >= nextBookedDate;
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

    return(
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
                <DatePicker label="From" value={startDate} onChange={handleSetStartDate} shouldDisableDate={dateIsBooked} minDate={dayjs()}/>
                <DatePicker label="To" value={endDate} onChange={handleSetEndDate} shouldDisableDate={dateIsDisabled} minDate={dayjs()}/>
            </LocalizationProvider>
        </div>
    )
}
export default BookingDatePicker;
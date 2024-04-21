import React, {useEffect, useState} from "react"
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/en-gb';
import dayjs, {Dayjs} from "dayjs";
import {DateRange} from "@mui/icons-material";

type DateRange = {from: Dayjs, to: Dayjs}

const BookingCalendar = ({listingId, maxBookDuration}:{listingId: string | undefined, maxBookDuration: number}) => {
    const [startDate, setStartDate] = useState<Dayjs | null>();
    const [endDate, setEndDate] = useState<Dayjs | null>();
    const [bookedDates, setBookedDate] = useState<DateRange[]>([]);

    const dateIsBooked = (date: dayjs.Dayjs | null | undefined) => {
        if (!date) return false;
        return bookedDates.some((range) => {
            return date >= range.from && date <= range.to
        })
    }

    const dateIsDisabled = (date: Dayjs) => {
        if (!date) return false;
        if (!startDate) return false;
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
export default BookingCalendar;

// https://mui.com/x/react-date-pickers/date-calendar/
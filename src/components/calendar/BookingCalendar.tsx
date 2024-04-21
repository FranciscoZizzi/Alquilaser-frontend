import React, {useEffect, useState} from "react"
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, {Dayjs} from "dayjs";

type DateRange = {from: Dayjs, to: Dayjs}

const BookingCalendar = () => {
    const [startDate, setStartDate] = useState<Dayjs | null>();
    const [endDate, setEndDate] = useState<Dayjs | null>();
    const [bookedDates, setBookedDate] = useState<DateRange[]>([
        // {from: dayjs(), to:dayjs('2024-05-15')}
    ]);
    const [disabledDates, setDisabledDate] = useState<DateRange[]>([]);

    const dateIsBooked = (date: Dayjs) => {
        return bookedDates.some((range) => {
            return date >= range.from && date <= range.to
        })
    }

    const dateIsDisabled = (date: Dayjs) => {
        return disabledDates.some((range) => {
            return date >= range.from && date <= range.to
        })
    }

    return(
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="From" value={startDate} onChange={setStartDate} shouldDisableDate={dateIsBooked} minDate={dayjs()}/>
                <DatePicker label="To" value={endDate} onChange={setEndDate} shouldDisableDate={dateIsDisabled} minDate={dayjs()}/>
            </LocalizationProvider>
        </div>
    )
}
export default BookingCalendar;

// https://mui.com/x/react-date-pickers/date-calendar/
import React, {useEffect, useState} from "react"
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/en-gb';
import dayjs, {Dayjs} from "dayjs";

const RepairDatePicker = ({startDate, endDate, handleSetStartDate, handleSetEndDate}:{
    listingId: string | undefined,
    maxBookDuration: number,
    startDate: Dayjs | null | undefined,
    endDate: Dayjs | null | undefined,
    handleSetStartDate: (e:any) => void,
    handleSetEndDate: (e:any) => void
    disabled: boolean
}) => {
    const dateIsBooked = (date: Dayjs) => {
        return !date;
    }

    const dateIsDisabled = (date: Dayjs) => {
        if (!date) return false;
        if (!startDate) return true;
        return date <= startDate;
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
export default RepairDatePicker;
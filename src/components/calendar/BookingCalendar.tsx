import React, {useEffect, useState} from "react"
import {DateCalendar, DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, {Dayjs} from "dayjs";

type DateRange = {from: Dayjs, to: Dayjs}

const BookingCalendar = () => {
    const [value, setValue] = useState<Dayjs>(dayjs);
    const [disabledDates, setDisabledDates] = useState<DateRange[]>([
        {from: dayjs('0000-00-00'), to: dayjs().subtract(1, 'day')}
    ]);

    const onChange = (e: any) => {
        setValue(e);
    }

    const dateIsDisabled = (date: Dayjs) => {
        return disabledDates.some((range) => {
            return date >= range.from && date <= range.to
        })
    }

    return(
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar value={value} onChange={onChange} shouldDisableDate={dateIsDisabled}/>
                {/*https://mui.com/x/react-date-pickers/date-calendar/*/}
            </LocalizationProvider>
            <p>{value.toString()}</p>
        </div>
    )
}
export default BookingCalendar;
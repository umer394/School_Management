"use client"
import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar'
import moment from 'moment'
import { calendarEvents } from '@/lib/data'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { useState } from 'react'
const localizer = momentLocalizer(moment)

const BigCalendar = () => {
    const [view, setView] = useState<View>(Views.WORK_WEEK);
    const handleOnViewChange = (selectedView: View) => {
        setView(selectedView);
    };
    return (
        <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            views={[Views.WORK_WEEK, Views.DAY]}
            view={view}
            date={new Date(2024, 7, 12)}
            min={new Date(2024, 1, 0, 8, 0, 0)}
            max={new Date(2024, 1, 0, 17,0,0)}
            style={{ height: "1000px" }}
            onView={handleOnViewChange}
        />
    );
}

export default BigCalendar
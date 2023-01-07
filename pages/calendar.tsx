/* eslint-disable react/display-name */
import { useState, useEffect } from "react"
import FullCalendar, { EventInput } from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { EventLeaveArg } from "@fullcalendar/interaction"
import { EventClickArg } from "@fullcalendar/react"
import DraggableShift from "components/DraggableShift"
import { EventModal } from "components/EventModal"
import { v4 } from "uuid"
import dayjs from "dayjs"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

interface CalendarStateData {
    weekendsVisible: boolean;
    externalEvents: EventInput[];
}

export default function App() {
    // initial state
    const [state, setState] = useState<CalendarStateData>({
        weekendsVisible: true,
        externalEvents: [
            { title: "Työntekijä 1", color: "#0097a7", id: v4(), },
            { title: "Työntekijä 2", color: "#f44336", id: v4(), },
            { title: "Työntekijä 3", color: "#f57f17", id: v4(), },
            { title: "Työntekijä 4", color: "#90a4ae", id: v4(), },
        ],
    })
    const [open, setOpen] = useState(false)
    const [eventInfo, setEventInfo] = useState<EventClickArg>()
    const [calendarEvents, setCalendarEvents] = useState<EventInput[]>([])
    const toggleModal = () => setOpen(!open)

    useEffect(() => {
        // See if there is any events in local storage
        if (localStorage.getItem("calendarEvents") !== null) {
            const events = JSON.parse(localStorage.getItem("calendarEvents")!)
            setCalendarEvents(events)
        }
    }, [])

    // handle event receive
    const handleEventReceive = (eventInfo: EventLeaveArg) => {
        // Check if there's overlapping event with same workerId
        const overLappingEvents = calendarEvents.filter((e) => e.workerId === eventInfo.draggedEl.id)
        console.log(overLappingEvents)
        const isOverlapping = overLappingEvents.map(event => {
            const eventStart = dayjs(event.start?.toString())
            const eventEnd = dayjs(event.end?.toString())
            const newEventStart = dayjs(eventInfo.event.startStr)
            const newEventEnd = dayjs(eventInfo.event.endStr)
            console.log(eventStart, eventEnd, newEventStart, newEventEnd)
            if (newEventStart.isSameOrAfter(eventStart, "minute") && newEventStart.isSameOrBefore(eventEnd, "minute")) {
                alert("Tämä työntekijä on jo varattu tälle aikavälille")
                eventInfo.revert()
                return true
            }
            if (newEventEnd.isSameOrAfter(eventStart, "minute") && newEventEnd.isSameOrBefore(eventEnd, "minute")) {
                alert("Tämä työntekijä on jo varattu tälle aikavälille")
                eventInfo.revert()
                return true
            }
        })

        if (isOverlapping.includes(true)) return

        eventInfo.revert()
        const newEvent = {
            id: v4(),
            workerId: eventInfo.draggedEl.id,
            title: eventInfo.event.title,
            color: eventInfo.event.backgroundColor,
            start: eventInfo.event.startStr,
            end: eventInfo.event.endStr,
        }
        saveEvent(newEvent)
    }

    // Handle event click
    const handleEventClick = (eventInfo: EventClickArg) => {
        setOpen(true)
        setEventInfo(eventInfo)
    }

    const saveEvent = (newEvent: EventInput) => {
        // Save state to local storage
        const updatedEvents = [...calendarEvents, newEvent]
        setCalendarEvents(updatedEvents)
        localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents))
        console.log(updatedEvents)
    }

    const removeEvent = (event: EventInput) => {
        event.event.remove()
        const updatedEvents = calendarEvents.filter((e) => e.id !== event.event.id)
        setCalendarEvents(updatedEvents)
        localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents))
    }

    return (
        <div className="App">
            <div style={{ float: "left", width: "99%", margin: "5rem 0.25rem" }}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay"
                    }}
                    initialView="timeGridWeek"
                    eventDurationEditable={true}
                    editable={true}
                    eventResizableFromStart={true}
                    forceEventDuration={true}
                    defaultTimedEventDuration={"07:30:00"}
                    locale="fi"
                    firstDay={1}
                    droppable={true}
                    events={calendarEvents}
                    eventReceive={(e) => handleEventReceive(e)}
                    eventClick={(e) => handleEventClick(e)}
                />
                {open && <EventModal event={eventInfo!} open={open} toggleModal={toggleModal} removeEvent={removeEvent} />}
                <div style={{ float: "left", width: "25%", margin: "1rem" }}>

                    <div id="external-events">
                        {state.externalEvents.map((event) => (
                            <DraggableShift key={event.id} event={event} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

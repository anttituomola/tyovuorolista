/* eslint-disable react/display-name */
import { useState } from "react"
import FullCalendar, { EventInput } from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { EventLeaveArg } from "@fullcalendar/interaction"
import { EventClickArg } from "@fullcalendar/react"
import DraggableShift from "components/DraggableShift"
import { v4 } from "uuid"
import { EventModal } from "components/EventModal"

interface CalendarStateData {
    weekendsVisible: boolean;
    externalEvents: EventInput[];
    calendarEvents: EventInput[];
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
        calendarEvents: []
    })
    const [open, setOpen] = useState(false)
    const [eventInfo, setEventInfo] = useState<EventClickArg>()
    const toggleModal = () => setOpen(!open)

    // handle event receive
    const handleEventReceive = (eventInfo: EventLeaveArg) => {
        eventInfo.revert()
        const newEvent = {
            id: crypto.randomUUID(),
            title: eventInfo.event.title,
            color: eventInfo.event.backgroundColor,
            start: eventInfo.event.startStr,
        }

        setState((state) => {
            return {
                ...state,
                calendarEvents: [...state.calendarEvents, newEvent]
            }
        })
    }

    // Handle event click
    const handleEventClick = (eventInfo: EventClickArg) => {
        setOpen(true)
        setEventInfo(eventInfo)
        console.log(open)
    }

    return (
        <div className="App">
            <div style={{ float: "left", width: "25%" }}>

                <div id="external-events">
                    {state.externalEvents.map((event) => (
                        <DraggableShift key={event.id} event={event} />
                    ))}
                </div>
            </div>

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
                    events={state.calendarEvents}
                    eventReceive={(e) => handleEventReceive(e)}
                    eventClick={(e) => handleEventClick(e)}
                />
                {open && <EventModal event={eventInfo} open={open} toggleModal={toggleModal}/>}
            </div>
        </div>
    )
}

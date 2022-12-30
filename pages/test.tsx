/* eslint-disable react/display-name */
import React, { useEffect, useState, useRef, memo } from "react"
import FullCalendar, { EventInput } from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"
import { EventLeaveArg } from "@fullcalendar/interaction"

interface DraggableShiftProps {
    event: EventInput
}

const DraggableShift = memo(({ event }: DraggableShiftProps) => {
    let elRef = useRef(null)

    useEffect(() => {
        if (elRef?.current) {
            let draggable = new Draggable(elRef.current, {
                eventData: function () {
                    return { ...event }
                }
            })

            // a cleanup function
            return () => draggable.destroy()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [elRef])

    return (
        <div
            ref={elRef}
            className="fc-event fc-h-event mb-1 fc-daygrid-event fc-daygrid-block-event p-2"
            title={event.title}
            style={{
                backgroundColor: event.color,
                borderColor: event.color,
                cursor: "pointer"
            }}
        >
            <div className="fc-event-main">
                <div>
                    <strong>{event.title}</strong>
                </div>
            </div>
        </div>
    )
})

interface CalendarStateData {
    weekendsVisible: boolean;
    externalEvents: EventInput[];
    calendarEvents: EventInput[];
}

/* {
    title: string | null;
    color: string;
    id: string;
} */

export default function App() {
    // initial state
    const [state, setState] = useState<CalendarStateData>({
        weekendsVisible: true,
        externalEvents: [
            { title: "Art 1", color: "#0097a7", id: '34432' },
            { title: "Art 2", color: "#f44336", id: '323232' },
            { title: "Art 3", color: "#f57f17", id: '1111' },
            { title: "Art 4", color: "#90a4ae", id: '432432' }
        ],
        calendarEvents: []
    })

    // handle event receive
    const handleEventReceive = (eventInfo: EventLeaveArg) => {
        eventInfo.revert()
        const newEvent = {
            id: crypto.randomUUID(),
            title: eventInfo.event.title,// eventInfo.draggedEl.getAttribute("title"),
            color: eventInfo.event.backgroundColor,
            start: eventInfo.event.startStr,
            end: eventInfo.event.endStr,
        }
        console.log(newEvent)

        if(newEvent.title === null) return

        setState((state) => {
            return {
                ...state,
                calendarEvents: [...state.calendarEvents, newEvent]
            }
        })
        console.log("calendarEvents", state.calendarEvents)
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
            <div style={{ float: "left", width: "75%" }}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay"
                    }}
                    initialView="timeGridWeek"
                    events={state.calendarEvents}
                    eventReceive={(e) => handleEventReceive(e)}
                    droppable={true}
                />
            </div>
        </div>
    )
}

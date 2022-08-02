/* eslint-disable react/display-name */
import { useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"
import { DraggableShift } from "./DraggableShift"
import cuid from "cuid"
import { Shift } from "types"

export default function App() {
    // initial state
    const [state, setState] = useState({
        weekendsVisible: true,
        staffMembers: [
            { title: "Riia", color: "#264653", staffMemberId: 1, id: cuid(), duration: "07:30" },
            { title: "Juuso", color: "#287271", staffMemberId: 2, id: cuid(), duration: "07:30" },
            { title: "Laura", color: "#2a9d8f", staffMemberId: 3, id: cuid(), duration: "07:30" },
            { title: "Mika", color: "#e9c46a", staffMemberId: 4, id: cuid(), duration: "07:30" },
            { title: "Jonna", color: "#f4a261", staffMemberId: 5, id: cuid(), duration: "07:30" },
            { title: "Harri", color: "#e76f51", staffMemberId: 6, id: cuid(), duration: "07:30" },
        ]
    })
    const [calendarEvents, setCalendarEvents] = useState<Shift[]>([])

    // handle event receive
    const handleEventReceive = (eventInfo) => {
        // TODO Prevent duplicate events on a same day

        const newShift = {
            id: cuid(),
            start: eventInfo.event.startStr,
            end: eventInfo.event.endStr,
            title: eventInfo.draggedEl.getAttribute("title"),
            staffMemberId: eventInfo.event.extendedProps.staffMemberId,
            color: eventInfo.event.backgroundColor,
        }
        console.log(newShift)

        setCalendarEvents([...calendarEvents, newShift])
    }

    return (
        <div className="App">
            <div style={{ float: "left", width: "25%" }}>
                <div id="external-events">
                    {state.staffMembers.map((event) => (
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
                    slotMinTime={"08:00"}
                    slotMaxTime={"27:00"}
                    locale="fi"
                    firstDay={1}
                    editable={true}
                    selectable={true}
                    weekends={state.weekendsVisible}
                    droppable={true}
                    eventReceive={handleEventReceive}
                    selectMirror={true}
                    dayMaxEvents={true}
                    events={calendarEvents}
                />
            </div>
            <div style={{ float: "left", width: "75%" }}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay"
                    }}
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={state.weekendsVisible}
                    droppable={true}
                    eventReceive={handleEventReceive}
                    events={calendarEvents}

                />
            </div>
        </div>
    )
}

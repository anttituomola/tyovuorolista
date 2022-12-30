/* eslint-disable react/display-name */
import React, { useEffect, useState, useRef, memo } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"
import DraggableShift from "components/DraggableShift.js"
import cuid from "cuid"

export default function App() {
    // initial state
    const [state, setState] = useState({
        weekendsVisible: true,
        externalEvents: [
            { title: "Art 1", color: "#0097a7", id: 34432 },
            { title: "Art 2", color: "#f44336", id: 323232 },
            { title: "Art 3", color: "#f57f17", id: 1111 },
            { title: "Art 4", color: "#90a4ae", id: 432432 }
        ],
        calendarEvents: [
        ]
    })

    // handle event receive
    const handleEventReceive = (eventInfo) => {
        eventInfo.revert()
        const newEvent = {
            id: cuid(),
            title: eventInfo.draggedEl.getAttribute("title"),
            color: eventInfo.event.backgroundColor,
            start: eventInfo.event.startStr,
            end: eventInfo.date,
        }
        console.log(newEvent)

        setState((state) => {
            return {
                ...state,
                calendarEvents: state.calendarEvents.concat(newEvent)
            }
        })
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
                    eventReceive={handleEventReceive}
                />
            </div>
        </div>
    )
}

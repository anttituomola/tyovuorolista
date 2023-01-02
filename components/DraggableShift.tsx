/* eslint-disable react/display-name */
import React, { useEffect, useRef, memo } from "react"
import { Draggable } from "@fullcalendar/interaction"
import { EventInput } from "@fullcalendar/react"


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
        }
    }, [event])

    return (
        <div
            ref={elRef}
            title={event.title}
            style={{
                backgroundColor: event.color,
                borderColor: event.color,
                cursor: "pointer"
            }}
        >
            <div>
                <div>
                    <strong>{event.title}</strong>
                </div>
            </div>
        </div>
    )
})

export default DraggableShift
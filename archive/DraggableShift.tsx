/* eslint-disable react/display-name */
import { useEffect, useRef, memo } from "react"
import { Draggable } from "@fullcalendar/interaction"
import styles from "styles/DraggableShift.module.css"


export const DraggableShift = memo(({ event }) => {
    let elRef = useRef(null)
  
    useEffect(() => {
      let draggable = new Draggable(elRef.current, {
        eventData: function () {
          console.log(event)
          return { ...event, create: true }
        }
      })
      
      // a cleanup function
      return () => draggable.destroy()
    })
  
    return (
      <div
        ref={elRef}
        className={styles.draggableShift}
        title={event.title}
        style={{
          backgroundColor: event.color,
          borderColor: event.color,
          cursor: "pointer"
        }}
      >
          <div>
            <span>{event.title}</span>
          </div>
        </div>
    )
  })
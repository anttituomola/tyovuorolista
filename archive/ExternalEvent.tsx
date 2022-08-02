/* eslint-disable react/display-name */
import { useEffect, useRef, memo } from "react";
import { Draggable } from "@fullcalendar/interaction";


const ExternalEvent = memo(({ event }) => {
    let elRef = useRef(null);
  
    useEffect(() => {
      let draggable = new Draggable(elRef.current, {
        eventData: function () {
          return { ...event, create: true };
        }
      });
  
      // a cleanup function
      return () => draggable.destroy();
    });
  
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
    );
  });

  export default ExternalEvent;
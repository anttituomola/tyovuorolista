import FullCalendar, { EventClickArg } from "@fullcalendar/react"
import interactionPlugin, { Draggable, DateClickArg } from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"
import cuid from "cuid"
import Modal from "./Modal"
import { useEffect, useState } from "react"

const CalendarEl = () => {
    const [modalVisible, setModalVisible] = useState(false)
    useEffect(() => {
        const frontOfHouse = document.getElementById("front-of-house")
        const kitchen = document.getElementById("kitchen")
        new Draggable(frontOfHouse, {
            eventData: {
                id: cuid(),
                title: "Sali",
                duration: "07:50",
                eventDurationEditable: true,
                backgroundColor: "red",
            },
        })
        new Draggable(kitchen, {
            eventData: {
                id: cuid(),
                title: "Keittiö",
                duration: "07:50",
                eventDurationEditable: true,
                backgroundColor: "blue",
            },
        })
    }, [])

    const closeModal = () => {
        setModalVisible(false)
    }

    const dateClick = (info) => {
        const calendarAPI = info.view.calendar
        calendarAPI.addEvent({
            id: cuid(),
            title: "New Event",
            start: info.dateStr,
            end: info.dateStr,
        })
    }

    const eventClick = (info) => {
/*         let calendar = info.view.calendar
 */        /* calendar.getEventById(info.event.id).remove() */
        setModalVisible(true)
    }



    return (
        <>
            {modalVisible && <Modal closeModal={closeModal} modalVisible={modalVisible}/>}
            <FullCalendar
                locale={'fi'}
                firstDay={1}
                slotMinTime="08:00"
                slotMaxTime="27:00"
                plugins={[timeGridPlugin, interactionPlugin]}
                dateClick={(info) => dateClick(info)}
                eventClick={(info) => eventClick(info)}
                droppable={true}
                editable
                selectable

            />
            <h1 id="front-of-house">Front-of-house</h1>
            <h1 id="kitchen">Kitchen</h1>
        </>
    )
}

export default CalendarEl
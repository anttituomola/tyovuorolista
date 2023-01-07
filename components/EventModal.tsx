import { Modal, Box, Typography } from '@mui/material'
import { EventClickArg } from "@fullcalendar/react"
import dayjs from 'dayjs'

interface modalProps {
    open: boolean,
    toggleModal: () => void,
    event: EventClickArg
}

export const EventModal = ({ event, open, toggleModal }: modalProps) => {
    console.log(event.event.title)
    const startTime = dayjs(event.event.start)
    const endTime = dayjs(event.event.end)
    return <Modal
        open={open}
        onClose={toggleModal}
    >
        <Box sx={{
            width: 400, height: 400, bgcolor: 'background.paper', position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <h1>{event.event.title}</h1>
                <p>Start: {startTime.format("HH:mm")}</p>
                <p>End: {endTime.format("HH:mm")}</p>
                <p>Duration: {endTime.diff(startTime, "hour", true)} hours</p>
            </Box>
        </Box>
    </Modal>
}
import { Modal, Box, Typography } from '@mui/material'
import { EventClickArg } from "@fullcalendar/react"
import dayjs from 'dayjs'
import { Button } from '@mui/material'

interface modalProps {
    open: boolean,
    toggleModal: () => void,
    event: EventClickArg
}

export const EventModal = ({ event, open, toggleModal }: modalProps) => {
    const startTime = dayjs(event.event.start)
    const endTime = dayjs(event.event.end)

    const eventDeletion = () => {
        event.event.remove()
        toggleModal()
    }

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
                <Button variant="outlined" color="error" onClick={eventDeletion}>Delete</Button>
            </Box>
        </Box>
    </Modal>
}
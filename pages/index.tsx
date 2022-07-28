import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import FullCalendar from "@fullcalendar/react"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"
import CalendarEl from 'components/Calendar.jsx'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      Kalenteri
      <CalendarEl />
    </div>
  )
}

export default Home

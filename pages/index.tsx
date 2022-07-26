import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import WeekHolder from '../components/WeekHolder'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <WeekHolder />
    </div>
  )
}

export default Home

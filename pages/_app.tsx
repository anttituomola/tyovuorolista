import '../styles/globals.css'
import type { AppProps } from 'next/app'
import "@fullcalendar/common/main.css"
import "@fullcalendar/daygrid/main.css"
import "@fullcalendar/timegrid/main.css"
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp

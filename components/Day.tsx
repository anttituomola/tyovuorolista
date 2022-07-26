import Quarter from './Quarter'
import dayjs from 'dayjs'
import { useState } from 'react'

type Props = {}
const Day = (props: Props) => {
  const [shiftStarts, setShiftStarts] = useState<dayjs.Dayjs>(dayjs())
  const [shiftEnds, setShiftEnds] = useState<dayjs.Dayjs>(dayjs())
  const [staffMember, setStaffMember] = useState("")

  const startTime = dayjs().hour(12).minute(0)
  const endTime = dayjs().hour(17).minute(0)
  const quartersNeeded = dayjs(endTime).diff(dayjs(startTime), 'minute', true) / 15
  let time = startTime
  const quarters = Array.from({ length: quartersNeeded }, (_, i) => {
    time = dayjs(time).add(15, 'minute')
    return <Quarter
      time={time}
      key={i}
      shiftStarts={shiftStarts}
      setShiftStarts={setShiftStarts}
      shiftEnds={shiftEnds}
      setShiftEnds={setShiftEnds}
      staffMember={staffMember}
      setStaffMember={setStaffMember}
    />
  })

  return (
    <div>
      <div>
        {dayjs().format('dddd')}
      </div>
      {quarters}
    </div>
  )
}
export default Day
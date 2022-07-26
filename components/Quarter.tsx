import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import styles from "styles/Quarter.module.css"
import ShiftCreator from './ShiftCreator'
import { useState } from 'react'

type Props = {
  time: dayjs.Dayjs
  shiftStarts: dayjs.Dayjs
  setShiftStarts: (shiftStarts: dayjs.Dayjs) => void
  shiftEnds: dayjs.Dayjs
  setShiftEnds: (shiftEnds: dayjs.Dayjs) => void
  staffMember: string
  setStaffMember: (staffMember: string) => void
}

const Quarter = (props: Props) => {
  const [isCreatingShift, setIsCreatingShift] = useState(false)
  dayjs.extend(isBetween)

  let style = styles.quarter
  // If time is between shiftStarts and shiftEnds, style is "selected"
  if (dayjs(props.time).isBetween(dayjs(props.shiftStarts), dayjs(props.shiftEnds), 'minute', '[]')) {
    style = styles.selected
  }

  return (
    <>
      <div className={style} onClick={() => setIsCreatingShift(!isCreatingShift)}></div>
      {isCreatingShift && <ShiftCreator startTime={props.time}
        setShiftStarts={props.setShiftStarts}
        setShiftEnds={props.setShiftEnds}
        setStaffMember={props.setStaffMember}
      />}
    </>
  )
}
export default Quarter
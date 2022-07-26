import { useState } from 'react'
import dayjs from 'dayjs'

type Props = {
    startTime: dayjs.Dayjs
    setShiftStarts: (shiftStarts: dayjs.Dayjs) => void
    setShiftEnds: (shiftEnds: dayjs.Dayjs) => void
    setStaffMember: (staffMember: string) => void
  }

  
  const ShiftCreator = (props: Props) => {
      const [staffMember, setStaffMember] = useState("" || 'John' || 'Jane' || 'Bob')
      const [shiftLength, setShiftLength] = useState(0)
      
      const createShift = () => {
        console.log(`Creating shift for ${props.startTime}`)
        props.setStaffMember(staffMember)
        props.setShiftStarts(props.startTime)
        props.setShiftEnds(dayjs(props.startTime).add(shiftLength, "hour"))
      }
    
      return (
        <>
            <div>Select staff member</div>
            <select name="staffSelector" id="staffSelector" onChange={(event) => setStaffMember(event?.target.value)}>
                <option value="John">John</option>
                <option value="Jane">Jane</option>
                <option value="Bob">Bob</option>
            </select>
            <div>Set shift length</div>
            <input type="number" name="shiftLength" id="shiftLength" onChange={(event) => setShiftLength(parseInt(event.target.value))}/>
            <div>
                <button onClick={createShift}>Save shift</button>
            </div>
        </>
    )
}
export default ShiftCreator
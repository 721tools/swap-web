import { useEffect, useState } from 'react'
import formatDate from '../../utils/formatDate'
import Dropdown from '../Dropdown/Dropdown'
import './Expire.scss'

export default function Expire({ onChange }) {
  const daysList = [
    { label: '1 day', value: 1 },
    { label: '3 days', value: 3 },
    { label: '7 days', value: 7 },
    { label: '30 days', value: 30 }
  ]
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectDays, setSelectDays] = useState(daysList[1])

  useEffect(() => {
    onChange(new Date().getTime() + selectDays.value * 24 * 60 * 60 * 1000)
  }, [selectDays])

  return (
    <div className="expire">
      <div
        className="expire__days"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {selectDays.label} <span className="expire__arrow"></span>
        {showDropdown && (
          <Dropdown
            list={daysList}
            onChange={(select) => setSelectDays(select)}
          ></Dropdown>
        )}
      </div>
      <div className="expire__date">
        <span className="expire__calendar"></span>
        {/* 2021-09-01 12:00 */}
        {formatDate(
          'yyyy-MM-dd hh:mm',
          new Date().getTime() + selectDays.value * 24 * 60 * 60 * 1000
        )}
      </div>
    </div>
  )
}

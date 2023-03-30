import './Dropdown.scss'

export default function Dropdown({ list, onChange }) {
  return (
    <div className="dropdown">
      {list.map((item) => {
        return (
          <div
            key={item.value}
            className="dropdown__item"
            onClick={() => onChange(item)}
          >
            {item.label}
          </div>
        )
      })}
    </div>
  )
}

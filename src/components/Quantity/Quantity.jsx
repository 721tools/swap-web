import SlideSelect from '../SlideSelect/SlideSelect'
import './Quantity.scss'

export default function Quantity({
  value,
  availableQuantity,
  onAttributesClick,
  onChange
}) {
  return (
    <div className="quatantity">
      <div className="quantity__attributes">
        Any Attribuites
        <span className="quantity__setting" onClick={onAttributesClick}></span>
      </div>
      <div className="quantity__input">
        <input
          placeholder="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        ></input>
      </div>
      <div className="quantity__footer">
        <div className="quantity__balance">Available: {availableQuantity}</div>
        <div
          className="quantity__max"
          onClick={() => onChange(availableQuantity)}
        >
          MAX
        </div>
      </div>
      <SlideSelect
        key={availableQuantity}
        available={availableQuantity > 0}
        value={value / availableQuantity}
        onChange={(percent) =>
          onChange(Math.floor(percent * availableQuantity))
        }
      ></SlideSelect>
    </div>
  )
}

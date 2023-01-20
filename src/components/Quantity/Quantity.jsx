import SlideSelect from '../SlideSelect/SlideSelect'
import './Quantity.scss'

export default function Quantity({ onAttributesClick }) {
  return (
    <div className="quatantity">
      <div className="quantity__attributes">
        Any Attribuites
        <span className="quantity__setting" onClick={onAttributesClick}></span>
      </div>
      <div className="quantity__input">
        <input placeholder="0"></input>
      </div>
      <div className="quantity__footer">
        <div className="quantity__balance">Floor: 10</div>
        <div className="quantity__max">MAX</div>
      </div>
      <SlideSelect></SlideSelect>
    </div>
  )
}

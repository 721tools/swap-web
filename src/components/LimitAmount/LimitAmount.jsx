import './LimitAmount.scss'

export default function LimitAmount({ value, balance, onChange, floorPrice }) {
  return (
    <div className="limit-amount">
      <div className="limit-amount__input">
        <input
          placeholder="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        ></input>
        <div className="limit-amount__currency">
          <span className="limit-amount__eth"></span>
          WETH
          {/* <span className="limit-amount__arrow"></span> */}
        </div>
      </div>
      <div className="limit-amount__footer">
        <div className="limit-amount__balance">Floor: {floorPrice}</div>
        {/* <div className="limit-amount__max" onClick={() => onChange(balance)}>
          MAX
        </div> */}
      </div>
    </div>
  )
}

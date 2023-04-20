import './Amount.scss'

export default function Amount({ value, balance, onChange }) {
  return (
    <div className="amount">
      <div className="amount__input">
        <input
          placeholder="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        ></input>
        <div className="amount__currency">
          <span className="amount__eth"></span>
          ETH
          {/* <span className="amount__arrow"></span> */}
        </div>
      </div>
      <div className="amount__footer">
        <div className="amount__balance">Balance: {balance}</div>
        <div className="amount__max" onClick={() => onChange(balance)}>
          MAX
        </div>
      </div>
    </div>
  )
}

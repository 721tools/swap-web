import './Amount.scss'

export default function Amount() {
  return (
    <div className="amount">
      <div className="amount__input">
        <input placeholder="0"></input>
        <div className="amount__currency">
          <span className="amount__eth"></span>
          ETH
          <span className="amount__arrow"></span>
        </div>
      </div>
      <div className="amount__footer">
        <div className="amount__balance">Balance: 10</div>
        <div className="amount__max">MAX</div>
      </div>
    </div>
  )
}

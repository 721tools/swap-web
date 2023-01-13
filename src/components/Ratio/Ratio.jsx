import './Ratio.scss'

export default function Ratio() {
  return (
    <div className="ratio">
      <div className="ratio__rate">37.7%</div>
      <div className="ratio__bar">
        <div
          className="ratio__bar__inner"
          style={{
            width: '37.3%'
          }}
        ></div>
      </div>
      <div className="ratio__rate">62.3%</div>
    </div>
  )
}

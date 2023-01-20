import { useState } from 'react'
import './Attributes.scss'

export default function Attributes({ traits, onClose }) {
  const [selected, setSelected] = useState([])
  return (
    <div className="attributes">
      <div className="attributes__title">
        <span className="attributes__back" onClick={onClose}></span>
        ATTRIBUTES
      </div>
      <div className="attributes__traits">
        {Object.keys(traits).map((key) => (
          <div>
            <div className="attributes__key">
              {key}
              <span className="attributes__arrow"></span>
            </div>
            <div className="attributes__vals">
              {Object.keys(traits[key]).map((item) => (
                <div className="attributes__val">
                  <span className="attributes__check"></span>
                  {item}
                  <span className="attributes__count">20</span>
                </div>
              ))}
              <div className="attributes__val">
                <span className="attributes__check checked"></span>Yellow
                <span className="attributes__count">20</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="attributes__confirm">OK</div>
    </div>
  )
}

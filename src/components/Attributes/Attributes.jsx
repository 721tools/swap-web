import classNames from 'classnames'
import { useState } from 'react'
import './Attributes.scss'

export default function Attributes({
  traits,
  onClose,
  onConfirm,
  selectedAttributes
}) {
  const [selected, setSelected] = useState(selectedAttributes)
  const [showTrait, setShowTrait] = useState({})

  function handleSelect(trait, val) {
    // if (selected[`${trait}-${val}`]) {
    setSelected({
      ...selected,
      [`${trait}-${val}`]: !selected[`${trait}-${val}`]
    })
    // }
  }

  function handleShowTrait(trait) {
    setShowTrait({
      ...showTrait,
      [trait]: !showTrait[trait]
    })
  }

  function handleConfirm() {
    onConfirm(selected)
    onClose()
  }

  return (
    <div className="attributes">
      <div className="attributes__title">
        <span className="attributes__back" onClick={onClose}></span>
        ATTRIBUTES
      </div>
      <div className="attributes__traits">
        {Object.keys(traits).map((key) => (
          <div>
            <div
              onClick={handleShowTrait.bind(this, key)}
              className="attributes__key"
            >
              {key}
              <span className="attributes__arrow"></span>
            </div>
            {showTrait[key] && (
              <div className="attributes__vals">
                {Object.keys(traits[key]).map((item) => (
                  <div className="attributes__val">
                    <span
                      onClick={handleSelect.bind(this, key, item)}
                      className={classNames('attributes__check', {
                        checked: selected[`${key}-${item}`]
                      })}
                    ></span>
                    {item}
                    <span className="attributes__count">
                      {traits[key][item]}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div onClick={handleConfirm} className="attributes__confirm">
        OK
      </div>
    </div>
  )
}

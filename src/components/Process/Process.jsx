import './Process.scss'

export default function Process({ onClose }) {
  return (
    <div className="process">
      <div className="process__con">
        {true && (
          <div className="process__step hide">
            <div className="process__title">Give permission to use WETH</div>
            <div className="process__subtitle">
              This request requires gas fee
            </div>
            <div className="process__icon"></div>
            <div className="process__description">
              To continue, you need to allow KiwiSwap smart contracts to use
              your WETH. This has to be done only once.
            </div>
            <div className="process__button">Proceed</div>
            <div className="process__tip">On-Chain, require gas fee</div>
          </div>
        )}

        {false && (
          <div className="process__step">
            <div className="process__title">Review Limit order</div>
            <div className="process__subtitle">Confirm limit order again</div>
            <div className="process__icon book"></div>
            <div className="process__description">
              Waiting to buy 3 Moonbirds NFTs with 23.20 limit order. This order
              valid until March 23 at 12:30
            </div>
            <div className="process__attribute">
              <div className="process__attribute__title">Attribute</div>
              <ul className="process__attribute__list">
                <li>background: yellow</li>
                <li>background: yellow</li>
              </ul>
            </div>
            <div className="process__button">Verify limit order</div>
            <div className="process__tip">
              Off-Chain, verify signatures only
            </div>
          </div>
        )}
        <div className="process__step">
          <div className="process__title">Review Sweep order</div>
          <div className="process__subtitle">Confirm swap order again</div>
          <div className="process__collections">
            <div className="process__collection">
              <img src=""></img>
            </div>
          </div>
          <div className="process__description">
            There are 12 moonbirds NFTs that meet purchase requirements. The
            total price only 9.32 ETH
          </div>
          <div className="process__attribute">
            <div className="process__attribute__title">Attribute</div>
            <ul className="process__attribute__list">
              <li>background: yellow</li>
              <li>background: yellow</li>
            </ul>
          </div>
          <div className="process__button">Verify limit order</div>
          <div className="process__tip">Off-Chain, verify signatures only</div>
        </div>
      </div>
      <div className="process__close" onClick={onClose}></div>
    </div>
  )
}

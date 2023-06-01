import Loading from '../Loading/Loading'
import './SweepConfirm.scss'

export default function SweepConfirm({
  onClose,
  onConfirm,
  collectionName,
  collectionItems,
  quantity,
  amount,
  isSweepBuyLoading
}) {
  return (
    <div className="sweep-confirm">
      <div className="sweep-confirm__con">
        <div className="sweep-confirm__step">
          <div className="sweep-confirm__title">Review Sweep order</div>
          <div className="sweep-confirm__subtitle">
            Confirm swap order again
          </div>
          <div className="sweep-confirm__collections">
            {collectionItems.map((item) => (
              <div
                key={`${item.token_id}`}
                className="sweep-confirm__collection"
              >
                <img src={item.image || item.image_url}></img>
              </div>
            ))}
          </div>
          <div className="sweep-confirm__description">
            There are {quantity} {collectionName} NFTs that meet purchase
            requirements. The total price only {amount} ETH
          </div>
          <div
            className="sweep-confirm__button"
            onClick={() => !isSweepBuyLoading && onConfirm()}
          >
            {isSweepBuyLoading && <Loading color="white"></Loading>}
            Verify limit order
          </div>
        </div>
      </div>
      <div className="sweep-confirm__close" onClick={onClose}></div>
    </div>
  )
}

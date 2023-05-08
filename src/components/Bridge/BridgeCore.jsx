import './BridgeCore.scss'
export default function BridgeCore() {
  return (
    <div className="bridge-core">
      <div className="bridge-core__title">NFT Bridge</div>
      <div className="bridge-core__con">
        <div className="bridge-core__con__inner">
          <div className="bridge-core__con__title">
            From
            <span className="bridge-core__con__chain">Polygon</span>
          </div>
          <div className="bridge-core__con__label">Contract Address</div>
          <div className="bridge-core__con__input">
            <input></input>
          </div>
          <div className="bridge-core__con__label">Token ID</div>
          <div className="bridge-core__con__input">
            <input></input>
          </div>
        </div>
        <div className="bridge-core__con__inner">
          <div className="bridge-core__con__title">
            To
            <span className="bridge-core__con__chain">Ethereum</span>
          </div>
          <div className="bridge-core__con__collection">
            <div className="bridge-core__con__pic"></div>
            <div className="bridge-core__con__name empty"></div>
          </div>
        </div>
      </div>
      <div className="bridge-core__button">Transfer</div>
    </div>
  )
}

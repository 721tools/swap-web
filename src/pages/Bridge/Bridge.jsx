import BridgeCore from '../../components/BridgeCore/BridgeCore'
import Header from '../../components/Header/Header'

export default function Bridge() {
  return (
    <div className="bridge">
      <Header></Header>
      <div className="bridge__con">
        <BridgeCore></BridgeCore>
      </div>
    </div>
  )
}

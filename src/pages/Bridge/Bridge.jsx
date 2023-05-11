import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import BridgeCore from '../../components/BridgeCore/BridgeCore'
import Header from '../../components/Header/Header'
import SearchResult from '../../components/SearchResult/SearchResult'

export default function Bridge() {
  const { search } = useSelector((state) => state)
  const params = useParams()

  return (
    <div className="bridge">
      <Header></Header>
      <div className="bridge__con">
        <BridgeCore key={params.slug} slug={params.slug}></BridgeCore>
      </div>
      {search.active && <SearchResult from="bridge"></SearchResult>}
    </div>
  )
}

import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useMatch, useParams, useRoutes } from 'react-router-dom'
import Collection from '../../components/Collection/Collection'
import Header from '../../components/Header/Header'
import Process from '../../components/Process/Process'
import SearchResult from '../../components/SearchResult/SearchResult'
import Swap from '../../components/Swap/Swap'
import { hideProcess } from '../../reducers/processSlice'
import './Home.scss'

export default function Home() {
  const { search, process, collection } = useSelector((state) => state)
  const dispatch = useDispatch()

  const location = useLocation()
  const params = useParams()
  const isCollection = location.pathname.indexOf('/collection/') > -1
  return (
    <div
      className={classNames('home', {
        'disable-scroll': search.active
      })}
    >
      <Header></Header>
      <div className="home__con">
        {collection.more && <Collection></Collection>}
        <Swap key={params.slug} slug={params.slug}></Swap>
      </div>
      {search.active && <SearchResult></SearchResult>}
      {/* {process.show && (
        <Process onClose={() => dispatch(hideProcess())}></Process>
      )} */}
    </div>
  )
}

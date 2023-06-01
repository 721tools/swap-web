import classNames from 'classnames'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useMatch, useParams, useRoutes } from 'react-router-dom'
import Collection from '../../components/Collection/Collection'
import Header from '../../components/Header/Header'
import SearchResult from '../../components/SearchResult/SearchResult'
import Swap from '../../components/Swap/Swap'
import { clearCollection } from '../../reducers/collectionSlice'
import './Home.scss'

export default function Home() {
  const { search, process, collection } = useSelector((state) => state)
  const dispatch = useDispatch()

  const location = useLocation()
  const params = useParams()
  const isCollection = location.pathname.indexOf('/collection/') > -1
  useEffect(() => {
    if (!isCollection) {
      dispatch(clearCollection())
    }
  }, [isCollection])
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
    </div>
  )
}

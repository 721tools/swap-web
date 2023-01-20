import { useEffect, useState, useRef } from 'react'
import { useDebounce } from 'react-use'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Chart } from '@antv/g2'
import { request } from '../../common/request'
import './SearchResult.scss'
import Close from '../Close/Close'
import { toggleSearch } from '../../reducers/searchSlice'
import Loading from '../Loading/Loading'
import { setCollection } from '../../reducers/collectionSlice'
import Area from '../Area/Area'

// const POPULAR_LIST_STORAGE_KEY = 'POPULAR_LIST_STORAGE_KEY'

function Item({ info, onClick }) {
  const [detail, setDetail] = useState({})
  const chartRef = useRef()

  useEffect(() => {
    async function fetchCollectionInfo() {
      try {
        const res = await request({
          path: `/api/collections/${info.slug}`,
          uesSessionStorage: true
        })
        setDetail(res)
      } catch (e) {}
    }
    info.slug && fetchCollectionInfo()
  }, [])

  return (
    <div onClick={onClick} className="search-result__item">
      <div className="search-result__inner">
        <div className="search-result__picture">
          <img src={info.image}></img>
        </div>
        <div className="search-result__title">{info.name}</div>
        <div className="search-result__price">{info.floor_price}</div>
        <div className="search-result__trend">+43%</div>
        <div className="search-result__chart">
          <Area></Area>
        </div>
      </div>
    </div>
  )
}

export default function SearchResult() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [recentList, setRecentList] = useState([])
  const [popularList, setPopularList] = useState([])
  const [resultList, setResultList] = useState([])
  const search = useSelector((state) => state.search)
  async function getRecentList() {}

  async function fetchPopularList() {
    try {
      const params = {
        order_by: 'one_day_volume',
        page: 1,
        limit: 10
      }
      const res = await request({
        path: '/api/collections',
        data: params,
        uesSessionStorage: true
      })

      setPopularList(res.collections)
      return res.collections
    } catch (e) {}
  }

  // useEffect(() => {
  //   console.log(search.input)
  // }, [search])

  function handleClose() {
    dispatch(toggleSearch(false))
  }

  function handleSelectCollection(info) {
    // dispatch(setCollection(info))
    dispatch(toggleSearch(false))
    navigate(`/collection/${info.slug}`)
  }

  useDebounce(
    async () => {
      const { input } = search
      if (input !== '') {
        const params = {
          order_by: 'one_day_volume',
          page: 1,
          limit: 10
        }
        if (/^0x/.test(input) && input.length === 42) {
          params.contract = input
        } else {
          params.name = input
        }
        const res = await request({ path: '/api/collections', data: params })
        setResultList(res.collections)
      } else {
        setResultList([])
      }
    },
    500,
    [search]
  )

  useEffect(() => {
    fetchPopularList()
  }, [])

  return (
    <div className="search-result">
      <div className="search-result__list">
        <div></div>
        {search.input === '' && (
          <div>
            {recentList.length > 0 && (
              <div className="search-result__cate">
                <div className="search-result__inner">
                  <div className="search-result__cate">Recent searches</div>
                </div>
              </div>
            )}
          </div>
        )}

        {search.input === '' && (
          <div>
            {popularList.length > 0 && (
              <div className="search-result__cate">
                <div className="search-result__inner">
                  <div className="search-result__cate">Popular collections</div>
                </div>
              </div>
            )}
            {popularList.length > 0 &&
              popularList.map((item) => (
                <Item
                  key={item.slug}
                  onClick={handleSelectCollection.bind(this, item)}
                  info={item}
                ></Item>
              ))}
            {/* {popularList.length === 0 && (
              <div className="search-result__loading midlle">
                <Loading size="middle" color="gray"></Loading>
              </div>
            )} */}
          </div>
        )}

        {search.input !== '' && (
          <div>
            {resultList.length > 0 && (
              <div className="search-result__cate">
                <div className="search-result__inner">
                  <div className="search-result__cate">Suggest</div>
                </div>
              </div>
            )}
            {resultList.length > 0 &&
              resultList.map((item) => (
                <Item
                  key={item.slug}
                  onClick={handleSelectCollection.bind(this, item)}
                  info={item}
                ></Item>
              ))}
            {resultList.length === 0 && (
              <div className="search-result__loading midlle">
                <Loading size="middle" color="gray"></Loading>
              </div>
            )}
          </div>
        )}
      </div>

      <Close onClick={handleClose}></Close>
    </div>
  )
}

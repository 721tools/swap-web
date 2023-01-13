import classNames from 'classnames'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { request } from '../../common/request'
import { setMoreInfo } from '../../reducers/collectionSlice'
import Amount from '../Amount/Amount'
import CollectionItems from '../CollectionItems/CollectionItems'
import Quantity from '../Quantity/Quantity'
import './Swap.scss'

export default function Swap({ slug }) {
  const dispatch = useDispatch()
  const { more } = useSelector((state) => state.collection)

  useEffect(() => {
    async function fetchCollectionInfo() {
      const res = await request(`/api/collections/${slug}`)
      dispatch(setMoreInfo(res))
    }
    slug && fetchCollectionInfo()
  }, [slug])

  return (
    <div className="swap">
      <div className="swap__header">
        <div className="swap__cate active">Swap</div>
        <div className="swap__cate">Limit</div>
      </div>
      <div className="swap__collection">
        <div className="swap__pic">{more && <img src={more.image}></img>}</div>
        <div className="swap__info">
          <div
            className={classNames('swap__name', {
              empty: !more
            })}
          >
            {more && <span>{more.name}</span>}
          </div>
          <div
            className={classNames('swap__detail', {
              empty: !more
            })}
          ></div>
          {!more && (
            <div className="swap__select">
              <div className="swap__select__inner">Select collection</div>
            </div>
          )}
        </div>
        <div className="swap__change">
          <span className="swap__icon"></span>
        </div>
      </div>
      <div className="swap__actions">
        <div className="swap__action">Balance</div>
        <Amount></Amount>

        <div className="swap__action margin-top">Quantity</div>
        <Quantity></Quantity>

        <CollectionItems></CollectionItems>

        <div className="swap__button">Sweep Buy</div>
      </div>
    </div>
  )
}

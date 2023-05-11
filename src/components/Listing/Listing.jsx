import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getListTotalCost from '../../common/getListTotalCost'
import listener from '../../common/listener'
import { request } from '../../common/request'
import { addCartSelected, removeCartSelected } from '../../reducers/cartSlice'
import timeFromNow from '../../utils/timeFromNow'
import './Listing.scss'

function includeCollectionItem(arr, item) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].token_id === item.token_id) {
      return true
    }
  }
  return false
}

function ListingItem({ sale, info }) {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  function handleAdd() {
    if (includeCollectionItem(cart.selected, info)) {
      dispatch(removeCartSelected(info))
      listener.fire('swap', 'updateQuantity', cart.selected.length - 1)
      listener.fire(
        'swap',
        'updateBalance',
        getListTotalCost(cart.selected) - info.price
      )
      return
    }
    const res = addCartSelected(info)

    dispatch(addCartSelected(info))
    listener.fire('swap', 'updateQuantity', cart.selected.length + 1)
    listener.fire(
      'swap',
      'updateBalance',
      getListTotalCost(cart.selected.concat([info]))
    )
  }

  return (
    <div className="listing-item">
      <div className="listing-item__time">
        {timeFromNow(info.event_timestamp)}
      </div>
      <div className="listing-item__picture">
        <img src={info?.image_url || info?.image}></img>
      </div>
      <div
        className={classNames('listing-item__price', {
          sale
        })}
      >
        {info.price}
        <span className="listing-item__icon opensea"></span>
      </div>
      <div className="listing-item__seller">
        # {info.token_id}
        {!sale && (
          <div onClick={handleAdd} className="listing-item__add">
            {includeCollectionItem(cart.selected, info) ? 'Remove' : 'Add'}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Listing({ slug }) {
  const [listingList, setListingList] = useState([])
  const [salesList, setSalesList] = useState([])

  async function fetchList() {
    try {
      const res = await request({
        path: `/api/collections/${slug}/listings`,
        data: {
          event_types: ['AUCTION_CREATED'],
          // occurred_after: Date.now() - 24 * 60 * 60 * 1000
          occurred_after: 0,
          limit: 20
        },
        method: 'POST'
      })
      setListingList(res)
    } catch (e) {}
  }

  async function fetchSales() {
    try {
      const res = await request({
        path: `/api/collections/${slug}/sales`,
        data: {
          limit: 20,
          skip_flagged: false,
          occurred_after: 0
        },
        method: 'POST'
      })
      setSalesList(res)
    } catch (e) {}
  }

  useEffect(() => {
    fetchList()
    fetchSales()
  }, [])
  return (
    <div className="listing">
      <div className="listing__column">
        <div className="listing__title">Listings</div>
        <div className="listing__list">
          {listingList.map((item) => (
            <ListingItem
              key={`${item.token_id}${item.event_timestamp}`}
              info={item}
            ></ListingItem>
          ))}
        </div>
      </div>
      <div className="listing__column">
        <div className="listing__title">Sales</div>
        <div className="listing__list">
          {salesList.map((item) => (
            <ListingItem
              sale
              key={`${item.token_id}${item.event_timestamp}`}
              info={item}
            ></ListingItem>
          ))}
        </div>
      </div>
    </div>
  )
}

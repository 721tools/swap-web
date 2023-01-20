import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { request } from '../../common/request'
import timeFromNow from '../../utils/timeFromNow'
import './Listing.scss'

function ListingItem({ sale, info }) {
  return (
    <div className="listing-item">
      <div className="listing-item__time">
        {timeFromNow(info.event_timestamp)}
      </div>
      <div className="listing-item__picture">
        <img src={info?.image_url}></img>
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
        {!sale && <div className="listing-item__add">Add</div>}
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
        path: `/api/collections/${slug}/events`,
        data: {
          event_types: 'AUCTION_CREATED',
          occurred_after: 0
        },
        method: 'POST'
      })
      setListingList(res)
      console.log(res, 233)
    } catch (e) {}
  }

  async function fetchSales() {
    try {
      const res = await request({
        path: `/api/collections/${slug}/events`,
        data: {
          event_types: 'AUCTION_SUCCESSFUL',
          occurred_after: 0
        },
        method: 'POST'
      })
      setSalesList(res)
      console.log(res, 233)
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
            <ListingItem key={item.event_timestamp} info={item}></ListingItem>
          ))}
        </div>
      </div>
      <div className="listing__column">
        <div className="listing__title">Sales</div>
        <div className="listing__list">
          {salesList.map((item) => (
            <ListingItem key={item.event_timestamp} info={item}></ListingItem>
          ))}
        </div>
      </div>
    </div>
  )
}

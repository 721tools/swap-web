import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { request } from '../../common/request'
import './Listing.scss'

function ListingItem({ sale, info }) {
  return (
    <div className="listing-item">
      <div className="listing-item__time">6m</div>
      <div className="listing-item__picture">
        <img src={info?.image_url}></img>
      </div>
      <div
        className={classNames('listing-item__price', {
          sale
        })}
      >
        23.2<span className="listing-item__icon"></span>
      </div>
      <div className="listing-item__seller">
        4ED25A
        {!sale && <div className="listing-item__add">Add</div>}
      </div>
    </div>
  )
}

export default function Listing({ slug }) {
  const [listingList, setListingList] = useState([])
  async function fetchList() {
    try {
      const res = await request(
        `/api/collections/${slug}/events`,
        {
          event_types: 'AUCTION_CREATED',
          occurred_after: 0
        },
        'POST'
      )
      setListingList(res)
      console.log(res, 233)
    } catch (e) {}
  }

  useEffect(() => {
    fetchList()
  }, [])
  return (
    <div className="listing">
      <div className="listing__column">
        <div className="listing__title">Listings</div>
        <div className="listing__list">
          {listingList.map((item) => (
            <ListingItem key={item.tx_hash} info={item}></ListingItem>
          ))}
        </div>
      </div>
      <div className="listing__column">
        <div className="listing__title">Sales</div>
        <div className="listing__list">
          <ListingItem sale></ListingItem>
          <ListingItem sale></ListingItem>
          <ListingItem sale></ListingItem>
          <ListingItem sale></ListingItem>
          <ListingItem sale></ListingItem>
          <ListingItem sale></ListingItem>
        </div>
      </div>
    </div>
  )
}

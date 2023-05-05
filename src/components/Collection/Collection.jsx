import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { request } from '../../common/request'
import Listing from '../Listing/Listing'
import Orders from '../Orders/Orders'
import Ratio from '../Ratio/Ratio'
import Step from '../Step/Step'
import './Collection.scss'

export default function Collection() {
  const { info, more } = useSelector((state) => state.collection)

  return (
    <div className="collection">
      <div className="collection__info">
        <div className="collection__info__column collection__avatar">
          <img src={more.image}></img>
        </div>
        <div className="collection__info__column">
          <div className="collection__name">{more.name}</div>
          <div className="collection__markets">
            <a
              href={`https://opensea.io/collection/${more.slug}`}
              target="blank"
              className="collection__market"
            >
              <span className="collection__opensea"></span>
            </a>
            <a className="collection__market">
              <span className="collection__looksrare"></span>
            </a>
            <a className="collection__market">
              <span className="collection__x2y2"></span>
            </a>
            <a className="collection__market">
              <span className="collection__etherscan"></span>
            </a>
          </div>
        </div>
        <div className="collection__info__right">
          <div className="collection__info__item">
            <div className="collection__info__val">{more.floor_price}</div>
            <div className="collection__info__key">Floor</div>
          </div>
          <div className="collection__info__item">
            <div className="collection__info__val">
              {more.one_day_floor_price_change}
            </div>
            <div className="collection__info__key">Change</div>
          </div>
          <div className="collection__info__item">
            <div className="collection__info__val">{more.one_day_sales}</div>
            <div className="collection__info__key">Sal.24h</div>
          </div>
          <div className="collection__info__item">
            <div className="collection__info__val">
              {parseFloat(more.one_day_volume).toFixed(2)}
            </div>
            <div className="collection__info__key">Vol.24h</div>
          </div>
          <div className="collection__info__item">
            <div className="collection__info__val">
              {Math.floor((more.num_owners / more.total_supply) * 100)}% *{' '}
              {more.total_supply}
            </div>
            <div className="collection__info__key">Holder</div>
          </div>
        </div>
      </div>
      <Step slug={more.slug}></Step>
      <Listing key={more.slug} slug={more.slug}></Listing>
      <Ratio slug={more.slug}></Ratio>
      <Orders></Orders>
    </div>
  )
}

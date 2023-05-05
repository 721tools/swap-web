import { useEffect, useState } from 'react'
import listener from '../../common/listener'
import { request } from '../../common/request'
import formatDate from '../../utils/formatDate'
import './Orders.scss'

function OrdersItem({ info }) {
  return (
    <div className="orders-item">
      <div className="orders-item__success ">
        <div className="orders-item__success__icon"></div>
        <div className="orders-item__desc">{info.status}</div>
      </div>
      <div className="orders-item__type">Limit order</div>
      <div className="orders-item__picture">
        {/* <img src="https://cdn.x2y2.io/nfts/ezpvihz8v0jobkt.png/720.png"></img>
        <img src="https://cdn.x2y2.io/nfts/ezpvihz8v0jobkt.png/720.png"></img>
        <img src="https://cdn.x2y2.io/nfts/ezpvihz8v0jobkt.png/720.png"></img>
        <div className="orders-item__quantity">5</div> */}
        <div className="orders-item__info">
          <div className="orders-item__id">#333</div>
          <div className="orders-item__name">{info.slug}</div>
        </div>
      </div>
      <div className="orders-item__amount">
        {info.price}
        {/* <span className="orders-item__market"></span> */}
      </div>
      <div className="orders-item__count">x{info.amount}</div>
      <div className="orders-item__time">
        <div className="orders-item__hour">
          {formatDate('hh:mm', info.expiration_time)}
        </div>
        <div className="orders-item__date">
          {formatDate('yyyy-MM-dd', info.expiration_time)}
        </div>
      </div>
    </div>
  )
}

export default function Orders() {
  const [list, setList] = useState([])
  async function fetchOrders() {
    const res = await request({
      path: '/api/orders',
      data: {},
      method: 'GET'
    })
    setList(res.data)
  }
  useEffect(() => {
    fetchOrders()
  }, [])
  useEffect(() => {
    listener.register('swap', 'orders', fetchOrders)
    return () => {
      listener.remove('swap', 'orders', fetchOrders)
    }
  }, [])
  return (
    <div className="orders">
      <div className="orders__header">
        <div className="orders__title">Orders List</div>
        <div className="orders__column">
          <div className="orders__filter">Limit orders</div>
        </div>
        <div className="orders__current">Current Collection</div>
      </div>
      <div className="orders__list">
        {list.map((item) => (
          <OrdersItem key={item.id} info={item}></OrdersItem>
        ))}
      </div>
    </div>
  )
}

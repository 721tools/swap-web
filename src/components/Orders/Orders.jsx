import classNames from 'classnames'
import { useEffect, useState } from 'react'
import listener from '../../common/listener'
import { request } from '../../common/request'
import formatDate from '../../utils/formatDate'
import Dropdown from '../Dropdown/Dropdown'
import './Orders.scss'

function SweepOrdersItem({ info }) {
  return (
    <div className="orders-item">
      <div className="orders-item__success ">
        <div className="orders-item__success__icon"></div>
        <div className="orders-item__desc">{info.status}</div>
      </div>
      <div className="orders-item__type">Sweep order</div>
      <div className="orders-item__picture">
        <img src={info.image}></img>

        <div className="orders-item__info">
          <div className="orders-item__id">#{info.token_id}</div>
          <div className="orders-item__name">{info.slug}</div>
        </div>
      </div>
      <div className="orders-item__amount">
        {info.price}
        {/* <span className="orders-item__market"></span> */}
      </div>
      <div className="orders-item__count">x{info.quantity}</div>
      <div className="orders-item__time">
        <div className="orders-item__hour">
          {formatDate('hh:mm', info.event_timestamp)}
        </div>
        <div className="orders-item__date">
          {formatDate('yyyy-MM-dd', info.event_timestamp)}
        </div>
      </div>
    </div>
  )
}

function OrdersItem({ info }) {
  return (
    <div className="orders-item">
      <div className="orders-item__success ">
        <div className="orders-item__success__icon"></div>
        <div className="orders-item__desc">{info.status}</div>
      </div>
      <div className="orders-item__type">Limit order</div>
      <div className="orders-item__picture">
        <div className="orders-item__info">
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

export default function Orders({ slug }) {
  const [list, setList] = useState([])
  const [sweepList, setSweepList] = useState([])
  const [isCurrentSelected, setIsCurrentSelected] = useState(false)
  const orderTypes = [
    {
      label: 'Limit orders',
      value: 'limit'
    },
    {
      label: 'Sweep orders',
      value: 'sweep'
    }
  ]
  const [orderType, setOrderType] = useState(orderTypes[0])
  const [showDropdown, setShowDropdown] = useState(false)
  async function fetchOrders(orderType, isCurrentSelected) {
    try {
      const isLimit = orderType.value === 'limit'
      let fetchPath = isLimit ? `/api/orders` : `/api/orders/sweep`
      if (isCurrentSelected) {
        fetchPath += `?slug=${slug}`
      }
      const res = await request({
        path: fetchPath,
        data: {},
        method: 'GET'
      })
      if (isLimit) {
        setList(res.data)
      } else {
        setSweepList(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  function handleChange(select) {
    setOrderType(select)
    fetchOrders(select, isCurrentSelected)
  }

  function handleSelectCurrent() {
    const _isCurrentSelected = !isCurrentSelected
    setIsCurrentSelected(_isCurrentSelected)
    fetchOrders(orderType, _isCurrentSelected)
  }

  useEffect(() => {
    fetchOrders(orderType, isCurrentSelected)
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
          <div
            className="orders__filter"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {orderType.label}
            {showDropdown && (
              <Dropdown list={orderTypes} onChange={handleChange}></Dropdown>
            )}
          </div>
        </div>
        <div
          className={classNames('orders__current', {
            active: isCurrentSelected
          })}
          onClick={handleSelectCurrent}
        >
          Current Collection
        </div>
      </div>
      <div className="orders__list">
        {orderType.value === 'limit' &&
          list.map((item) => (
            <OrdersItem key={item.id} info={item}></OrdersItem>
          ))}
        {orderType.value === 'sweep' &&
          sweepList.map((item) => (
            <SweepOrdersItem
              key={item.tx_hash + item.token_id}
              info={item}
            ></SweepOrdersItem>
          ))}
      </div>
    </div>
  )
}

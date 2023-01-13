import './Orders.scss'

function OrdersItem() {
  return (
    <div className="orders-item">
      <div className="orders-item__success ">
        <div className="orders-item__success__icon"></div>
        <div className="orders-item__desc">Success</div>
      </div>
      <div className="orders-item__type">Buy</div>
      <div className="orders-item__picture">
        <img src="https://cdn.x2y2.io/nfts/ezpvihz8v0jobkt.png/720.png"></img>
        <img src="https://cdn.x2y2.io/nfts/ezpvihz8v0jobkt.png/720.png"></img>
        <img src="https://cdn.x2y2.io/nfts/ezpvihz8v0jobkt.png/720.png"></img>
        <div className="orders-item__quantity">5</div>
        <div className="orders-item__info">
          <div className="orders-item__id">#333</div>
          <div className="orders-item__name">Moonbirds</div>
        </div>
      </div>
      <div className="orders-item__amount">
        23.2 <span className="orders-item__market"></span>
      </div>
      <div className="orders-item__count">x5</div>
      <div className="orders-item__time">
        <div className="orders-item__hour">18:32</div>
        <div className="orders-item__date">2022.03.23</div>
      </div>
    </div>
  )
}

export default function Orders() {
  return (
    <div className="orders">
      <div className="orders__header">
        <div className="orders__title">Orders List</div>
        <div className="orders__column">
          <div className="orders__filter">Sweep</div>
        </div>
        <div className="orders__current">Current Collection</div>
      </div>
      <div className="orders__list">
        <OrdersItem></OrdersItem>
        <OrdersItem></OrdersItem>
        <OrdersItem></OrdersItem>
        <OrdersItem></OrdersItem>
        <OrdersItem></OrdersItem>
        <OrdersItem></OrdersItem>
      </div>
    </div>
  )
}

import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from 'react-use'
import { useAccount, useBalance } from 'wagmi'
import listener from '../../common/listener'
import { request } from '../../common/request'
import { setCartAvailable, setCartSelected } from '../../reducers/cartSlice'
import { setMoreInfo } from '../../reducers/collectionSlice'
import Amount from '../Amount/Amount'
import Attributes, { JOINT_MARK } from '../Attributes/Attributes'
import CollectionItems from '../CollectionItems/CollectionItems'
import Expire from '../Expire/Expire'
import LimitAmount from '../LimitAmount/LimitAmount'
import Quantity from '../Quantity/Quantity'
import Loading from '../Loading/Loading'
import './Swap.scss'
import { BigNumber, ethers } from 'ethers'
import { message } from '../Message/Message'

export default function Swap({ slug }) {
  const dispatch = useDispatch()
  const [showAttributes, setShowAttributes] = useState(false)
  const { more } = useSelector((state) => state.collection)
  const cart = useSelector((state) => state.cart)
  const [attributes, setAttributes] = useState({})
  const [amount, setAmount] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [cate, setCate] = useState('sweep')
  const [limitPrice, setLimitPrice] = useState(0)
  const [limitQuantity, setLimitQuantity] = useState(0)
  const [limitExpire, setLimitExpire] = useState(0)
  const [isSweepBuyLoading, setIsSweepBuyLoading] = useState(false)

  const { address } = useAccount()

  const {
    data: balance,
    isBalanceError,
    isBalanceLoading
  } = useBalance({
    address,
    watch: true
  })

  function parseTraits(attributes) {
    const res = {}
    Object.keys(attributes).forEach((item) => {
      if (attributes[item]) {
        const [key, val] = item.split(JOINT_MARK)
        if (res[key]) {
          res[key].push(val)
        } else {
          res[key] = [val]
        }
      }
    })
    return res
  }

  useEffect(() => {
    async function fetchCollectionInfo() {
      const res = await request({
        path: `/api/collections/${slug}`,
        uesSessionStorage: true
      })
      dispatch(setMoreInfo(res))
    }
    slug && fetchCollectionInfo()
  }, [slug])

  async function fetchTokens({ balance, attributes, setSelected = false }) {
    const params = {}
    if (balance) {
      params.balance = balance
    }
    if (attributes) {
      params.traits = parseTraits(attributes)
    }
    const res = await request({
      path: `/api/collections/${slug}/buy_estimate`,
      data: params,
      method: 'POST'
    })

    if (setSelected) {
      dispatch(setCartSelected(res.tokens))
    } else {
      dispatch(setCartAvailable(res.tokens))
      setQuantity(0)
    }
  }

  // balance change
  useDebounce(
    async () => {
      if (balance)
        fetchTokens({
          attributes,
          balance: amount || balance.formatted
        })
    },
    500,
    [balance?.formatted, attributes]
  )

  // amount change
  useDebounce(
    async () => {
      if (amount > 0)
        fetchTokens({
          attributes,
          balance: amount,
          setSelected: true
        })
    },
    500,
    [amount]
  )

  function handleQuantityChange(quantity) {
    setQuantity(quantity)
    if (quantity >= 0) {
      const selected = cart.available.slice(0, quantity)
      dispatch(setCartSelected(selected))
      let total = 0
      selected.forEach((item) => {
        total += parseFloat(item.price)
      })
      setAmount(total)
    }
  }

  function handleListChange(list) {
    setQuantity(list.length)
    let total = 0
    list.forEach((item) => {
      total += parseFloat(item.price)
    })
    setAmount(total)
  }
  function handleSetAttributes(selected) {
    setAttributes(selected)
  }

  function handleFocusSearch() {
    listener.fire('search', 'focus')
  }

  async function handleSweepBuy() {
    if (isSweepBuyLoading) return
    if (cart.selected.length === 0) {
      return
    }
    setIsSweepBuyLoading(true)
    try {
      const res = await request({
        path: `/api/orders/sweep`,
        data: {
          contract_address: more.contract,
          tokens: cart.selected.map((item) => {
            return {
              token_id: item.token_id,
              price: item.price,
              platform: item.from
            }
          })
        },
        method: 'POST'
      })
      if (BigNumber.from(res.value) > balance?.formatted) {
        setIsSweepBuyLoading(false)
        return message.warn('Insufficient balance')
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      const signer = provider.getSigner()
      const tx = await signer.sendTransaction({
        value: BigNumber.from(res.value),
        to: res.address,
        data: res.calldata
      })
      setIsSweepBuyLoading(true)
    } catch (error) {
      // setIsSweepBuyLoading(false)
      console.log(error)
      // message.warn(error.data.message)
    }
  }

  async function limitBuy() {
    try {
      const limitBuyParams = await request({
        path: `/api/orders/params`,
        data: {
          slug: slug,
          amount: limitQuantity,
          price: limitPrice,
          expiration: limitExpire,
          traits: parseTraits(attributes)
        },
        method: 'POST'
      })
    } catch (error) {}
  }

  return (
    <div className="swap">
      <div className="swap__inner">
        <div className="swap__header">
          <div
            className={classNames('swap__cate', {
              active: cate === 'sweep'
            })}
            onClick={() => setCate('sweep')}
          >
            Swap
          </div>
          <div
            className={classNames('swap__cate', {
              active: cate === 'limit'
            })}
            onClick={() => setCate('limit')}
          >
            Limit
          </div>
        </div>
        <div className="swap__collection">
          <div className="swap__pic">
            {more && <img src={more.image}></img>}
          </div>
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
                <div
                  onClick={handleFocusSearch}
                  className="swap__select__inner"
                >
                  Select collection
                </div>
              </div>
            )}
          </div>
          <div onClick={handleFocusSearch} className="swap__change">
            <span className="swap__icon"></span>
          </div>
        </div>
        {cate === 'sweep' && (
          <div className="swap__actions">
            <div className="swap__action">Balance</div>
            <Amount
              balance={balance ? parseFloat(balance?.formatted).toFixed(3) : 0}
              value={amount}
              onChange={setAmount}
            ></Amount>

            <div className="swap__action margin-top">Quantity</div>
            <Quantity
              availableQuantity={cart.available.length}
              value={quantity}
              onChange={handleQuantityChange}
              onAttributesClick={() => setShowAttributes(true)}
            ></Quantity>

            <CollectionItems
              onListChange={handleListChange}
              list={cart.selected}
            ></CollectionItems>

            <div
              className={classNames('swap__button', {
                disabled: cart.selected.length === 0
              })}
              onClick={handleSweepBuy}
            >
              {isSweepBuyLoading && <Loading color="white"></Loading>}
              Sweep Buy
            </div>
          </div>
        )}
        {cate === 'limit' && (
          <div className="swap__actions">
            <div className="swap__action">Limit price</div>
            <LimitAmount
              // balance={balance ? parseFloat(balance?.formatted).toFixed(3) : 0}
              value={limitPrice}
              onChange={setLimitPrice}
            ></LimitAmount>
            <div className="swap__action margin-top">Quantity</div>
            <Quantity
              availableQuantity={cart.available.length}
              value={limitQuantity}
              onChange={setLimitQuantity}
              onAttributesClick={() => setShowAttributes(true)}
            ></Quantity>
            <div className="swap__action margin-top">Expire</div>
            <Expire onChange={setLimitExpire}></Expire>

            <div
              className={classNames('swap__button', {
                disabled: cart.selected.length === 0
              })}
              onClick={limitBuy}
            >
              Limit Buy
            </div>
          </div>
        )}

        {showAttributes && (
          <Attributes
            onConfirm={handleSetAttributes}
            traits={more.traits}
            onClose={() => setShowAttributes(false)}
            selectedAttributes={attributes}
          ></Attributes>
        )}
      </div>
    </div>
  )
}

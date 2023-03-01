import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import listener from '../../common/listener'
import { request } from '../../common/request'
import { setMoreInfo } from '../../reducers/collectionSlice'
import Amount from '../Amount/Amount'
import Attributes, { JOINT_MARK } from '../Attributes/Attributes'
import CollectionItems from '../CollectionItems/CollectionItems'
import Quantity from '../Quantity/Quantity'
import './Swap.scss'

export default function Swap({ slug }) {
  const dispatch = useDispatch()
  const [showAttributes, setShowAttributes] = useState(false)
  const { more } = useSelector((state) => state.collection)
  const [attributes, setAttributes] = useState({})

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

  useEffect(() => {
    console.log(attributes, 2)
    async function fetchTokens() {
      const params = {
        slug,
        traits: parseTraits(attributes)
      }
      const res = await request({
        path: `/api/smart-buys/tokens`,
        data: params,
        method: 'POST'
      })
    }
    fetchTokens()
  }, [attributes])

  function handleSetAttributes(selected) {
    setAttributes(selected)
  }

  function handleFocusSearch() {
    listener.fire('search', 'focus')
  }

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
              <div onClick={handleFocusSearch} className="swap__select__inner">
                Select collection
              </div>
            </div>
          )}
        </div>
        <div onClick={handleFocusSearch} className="swap__change">
          <span className="swap__icon"></span>
        </div>
      </div>
      <div className="swap__actions">
        <div className="swap__action">Balance</div>
        <Amount></Amount>

        <div className="swap__action margin-top">Quantity</div>
        <Quantity onAttributesClick={() => setShowAttributes(true)}></Quantity>

        <CollectionItems></CollectionItems>

        <div className="swap__button">Sweep Buy</div>
      </div>

      {showAttributes && (
        <Attributes
          onConfirm={handleSetAttributes}
          traits={more.traits}
          onClose={() => setShowAttributes(false)}
          selectedAttributes={attributes}
        ></Attributes>
      )}
    </div>
  )
}

import { useDispatch } from 'react-redux'
import { removeCartSelected } from '../../reducers/cartSlice'
import './CollectionItems.scss'

export default function CollectionItems({ list, onListChange }) {
  const dispatch = useDispatch()
  function handleRemove(token_id) {
    onListChange(list.filter((item) => item.token_id !== token_id))
    dispatch(removeCartSelected({ token_id: token_id }))
  }
  return (
    <div className="collection-items">
      {list.slice(0, list.length > 16 ? 15 : 16).map((item, index) => (
        <div key={`${item.token_id}`} className="collection-items__item">
          <img
            title={`#${item.token_id}`}
            className="collection-items__img"
            src={item.image || item.image_url}
          ></img>
          <span
            onClick={handleRemove.bind(this, item.token_id)}
            className="collection-items__remove"
          ></span>
        </div>
      ))}

      {list.length > 16 && (
        <div className="collection-items__item">
          <span className="collection-items__more">+{list.length - 15}</span>
        </div>
      )}
    </div>
  )
}

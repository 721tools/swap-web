import './CollectionItems.scss'

export default function CollectionItems({list}) {
  return (
    <div className="collection-items">
      {list.slice(0, 16).map((item) => (
        <div key={item.token_id} className="collection-items__item">
          <img title={`#${item.token_id}`} className="collection-items__img" src={item.image}></img>
        </div>
      ))}
    </div>
  )
}

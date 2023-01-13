import './CollectionItems.scss'

export default function CollectionItems() {
  return (
    <div className="collection-items">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
        <div className="collection-items__item"></div>
      ))}
    </div>
  )
}

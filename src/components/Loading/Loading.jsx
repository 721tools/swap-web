import './Loading.scss'

export default function Loading({ color = 'blue', size = 'small' }) {
  return (
    <div className={`loading ${size} ${color}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

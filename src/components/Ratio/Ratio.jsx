import { useEffect, useState } from 'react'
import { request } from '../../common/request'
import './Ratio.scss'

export default function Ratio({slug}) {
  const [stats, setStats] = useState({
    listing: 50,
    sales: 50
  })
  async function fetchStats() {
    try {
      const res = await request({
        path: `/api/collections/${slug}/stats`,
        data: {},
        method: 'POST'
      })
      const { listings, sales } = res
      const total = listings + sales
      const listingPercent = Math.floor((listings / total) * 100)
      const salesPercent = 100 - listingPercent
      setStats({
        listing: listingPercent,
        sales: salesPercent
      })
    } catch (e) {console.log(e)}
  }
  useEffect(() => {
    fetchStats()
  }, [])
  return (
    <div className="ratio">
      <div className="ratio__rate">{stats.listing}%</div>
      <div className="ratio__bar">
        <div
          className="ratio__bar__inner"
          style={{
            width: `${stats.sales}%`
          }}
        ></div>
      </div>
      <div className="ratio__rate">{stats.sales}%</div>
    </div>
  )
}

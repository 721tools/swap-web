import { useEffect, useRef } from 'react'
import './Area.scss'

export default function Area() {
  const canvasRef = useRef()
  const width = 80
  const height = 30
  useEffect(() => {
    const data = [1, 3, 5, 2, 5, 6, 1, 2, 5, 4, 3]
    const widthRatio = Math.floor(80 / data.length)
    const heightRatio = Math.floor(30 / 5 / 2)

    const ctx = canvasRef.current.getContext('2d')

    ctx.strokeStyle = '#6447f2'
    ctx.lineWidth = 1
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(0, 30 - data[0] * heightRatio)
    for (let index = 1; index < data.length; index++) {
      var scale = 0.2
      var last1X = widthRatio * (index - 1),
        last1Y = Math.floor(height - heightRatio * (data[index - 1] - 0)),
        last2X = widthRatio * (index - 2),
        last2Y = Math.floor(height - heightRatio * (data[index - 2] - 0)),
        nowX = widthRatio * index,
        nowY = Math.floor(height - heightRatio * (data[index] - 0)),
        nextX = widthRatio * (index + 1),
        nextY = Math.floor(height - heightRatio * (data[index + 1] - 0)),
        cAx = last1X + (nowX - last2X) * scale,
        cAy = last1Y + (nowY - last2Y) * scale,
        cBx = nowX - (nextX - last1X) * scale,
        cBy = nowY - (nextY - last1Y) * scale
      if (index === 0) {
        ctx.lineTo(nowX, nowY)
        continue
      } else if (index === 1) {
        cAx = last1X + (nowX - 0) * scale
        cAy = last1Y + (nowY - height) * scale
      } else if (index === data.length - 1) {
        cBx = nowX - (nowX - last1X) * scale
        cBy = nowY - (nowY - last1Y) * scale
      }
      ctx.bezierCurveTo(cAx, cAy, cBx, cBy, nowX, nowY)
    }
    // ctx.closePath()

    ctx.stroke()
  }, [])
  return (
    <canvas
      width={width}
      height={height}
      className="area"
      ref={canvasRef}
    ></canvas>
  )
}

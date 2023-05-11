import { Chart } from 'chart.js'
import { useEffect, useRef } from 'react'
import './Area.scss'

export default function Area({ data }) {
  const canvasRef = useRef()
  const width = 80
  const height = 30

  async function init() {
    new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: 'Dataset 1',
            data: Object.keys(data).map((key) => data[key]),
            borderColor: 'rgb(255, 99, 132)',
            cubicInterpolationMode: 'monotone',
            tension: 0.9,
            fill: false
          }
        ]
      },
      options: {
        responsive: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        },
        interaction: {
          intersect: false
        },
        elements: {
          point: {
            radius: 0
          },
          line: {
            borderWidth: 1
          }
        },
        scales: {
          x: {
            display: false,
            border: {
              display: false
            },
            grid: {
              display: false
            }
          },
          y: {
            display: false,
            border: {
              display: false
            },
            grid: {
              display: false
            }
          }
        }
      }
    })
  }
  useEffect(() => {
    init()
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

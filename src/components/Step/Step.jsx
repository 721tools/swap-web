// import { Chart } from '@antv/g2'
import { useEffect } from 'react'
import { useRef } from 'react'
import Chart from 'chart.js/auto'
import { request } from '../../common/request'
import './Step.scss'

export default function Step({ slug }) {
  const stepRef = useRef()

  async function init() {
    try {
      const depthData = await request({
        path: `/api/collections/${slug}/depth`,
        data: {
          size: 0.05,
          count: 10
        },
        method: 'POST'
      })

      const chart = new Chart({
        container: stepRef.current,
        autoFit: true
      })

      //
      let totalCount = 0
      const depthDataParsed = depthData.map((item) => {
        totalCount += item.count
        return {
          ...item,
          condition: 'NOR',
          total: totalCount
        }
      })

      // chart
      //   .line()
      //   .data(depthDataParsed)
      //   .scale('y', { nice: true })
      //   .scale('color', {
      //     domain: ['SEL', 'NOR'],
      //     range: ['#AEFF02', '#42507E']
      //   })
      //   .encode('x', (d) => d.price)
      //   .encode('y', 'total')
      //   .encode('color', 'condition')
      //   .style('gradient', 'x')
      //   .style('lineWidth', 2)

      //   .axis('x', {
      //     line: false,
      //     labelFill: '#fff',
      //     labelFontSize: '16',
      //     labelFontFamily: 'PingFangSC-Regular'
      //   })
      //   .axis('y', {
      //     line: false,
      //     labelFill: '#fff',
      //     labelFontSize: '16'
      //   })
      //   .legend(false)

      // chart.interaction('tooltip')

      // chart.render()

      new Chart(stepRef.current, {
        type: 'line',
        data: {
          labels: depthDataParsed.map((item) => item.price),
          datasets: [
            {
              label: 'Count',
              data: depthDataParsed.map((item) => item.total),
              borderColor: '#42507E',
              fill: false,
              stepped: true
            }
          ]
        },
        options: {
          responsive: true,
          interaction: {
            intersect: false,
            axis: 'x'
          },
          elements: {
            point: {
              radius: 0
            },
            line: {
              borderWidth: 1
            }
          },
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              border: {
                display: false
              },
              grid: {
                display: false
              }
            },
            y: {
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
    } catch (e) {}
  }

  useEffect(() => {
    init()
  }, [])
  return (
    <div className="step">
      <canvas ref={stepRef}></canvas>
    </div>
  )
}

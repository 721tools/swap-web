import { Chart } from '@antv/g2'
import { useEffect } from 'react'
import { useRef } from 'react'
import './Step.scss'

export default function Step() {
  const stepRef = useRef()
  useEffect(() => {
    const chart = new Chart({
      container: stepRef.current,
      autoFit: true
    })

    chart

      .line()
      .data([
        { date: '0.0', value: 1, condition: 'SEL' },
        { date: '0.1', value: 2, condition: 'SEL' },
        { date: '0.1', value: 3, condition: 'SEL' },
        { date: '0.1', value: 6, condition: 'NOR' },
        { date: '0.2', value: 12, condition: 'NOR' },
        { date: '0.3', value: 24, condition: 'NOR' },
        { date: '0.4', value: 48, condition: 'NOR' },
        { date: '0.5', value: 96, condition: 'NOR' },
        { date: '0.5', value: 33.1, condition: 'NOR' },
        { date: '0.5', value: 33.1, condition: 'NOR' },
        { date: '0.6', value: 30.9, condition: 'NOR' },
        { date: '0.7', value: 32, condition: 'NOR' },
        { date: '0.8', value: 30.9, condition: 'NOR' },
        { date: '0.9', value: 30.9, condition: 'NOR' },
        { date: '1.0', value: 30.9, condition: 'NOR' }
      ])
      .scale('y', { nice: true })
      .scale('color', {
        domain: ['SEL', 'NOR'],
        range: ['#AEFF02', '#42507E']
      })
      .encode('x', (d) => d.date)
      .encode('y', 'value')
      .encode('color', 'condition')
      .style('gradient', 'x')
      .style('lineWidth', 2)

      .axis('x', {
        line: false,
        labelStroke: '#fff'
      })
      .axis('y', {
        line: false,
        labelStroke: '#fff'
      })
      .legend(false)
    // chart.interaction('tooltip')
    chart.interaction('tooltip', {
      item: (data) => {
        console.log(data)
        return {
          name: name
        }
      }
    })
    chart.render()
  }, [])
  return <div ref={stepRef} className="step"></div>
}

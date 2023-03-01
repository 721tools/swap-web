import { useRef } from 'react'
import { useEffect } from 'react'
import './SlideSelect.scss'

export default function SlideSelect() {
  const mouseStatusRef = useRef({
    drag: false,
    startX: 0,
    startY: 0,
    left: 0,
    currentLeft: 0
  })

  const dragDomRef = useRef()

  function getLeft(e) {
    const left =
      mouseStatusRef.current.left + e.screenX - mouseStatusRef.current.startX

    if (left < 0) {
      return 0
    }

    if (left > 361) {
      return 361
    }

    return left
  }

  function onMouseDown(e) {
    if (
      e.target.className === 'slide-select__drag' ||
      e.target.className === 'slide-select__drag__icon'
    ) {
      mouseStatusRef.current.drag = true
      mouseStatusRef.current.startX = e.screenX
    }
  }
  function onMouseMove(e) {
    if (mouseStatusRef.current.drag === true) {
      mouseStatusRef.current.currentLeft = getLeft(e)
      dragDomRef.current.style.left = mouseStatusRef.current.currentLeft + 'px'
    }
  }
  function onMouseUp(e) {
    mouseStatusRef.current.drag = false
    mouseStatusRef.current.left = mouseStatusRef.current.currentLeft
  }

  useEffect(() => {
    document.body.addEventListener('mousemove', onMouseMove)
    document.body.addEventListener('mousedown', onMouseDown)
    document.body.addEventListener('mouseup', onMouseUp)
    return () => {
      document.body.removeEventListener('onmousemove', onMouseMove)
      document.body.removeEventListener('mousedown', onMouseDown)
      document.body.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  return (
    <div className="slide-select">
      <div className="slide-select__block"></div>
      <div className="slide-select__line"></div>
      <div className="slide-select__block"></div>
      <div className="slide-select__line"></div>
      <div className="slide-select__block"></div>
      <div className="slide-select__line"></div>
      <div className="slide-select__block"></div>
      <div className="slide-select__line"></div>
      <div className="slide-select__block"></div>

      <div
        // onMouseDown={onMouseDown}
        // onMouseUp={onMouseUp}
        ref={dragDomRef}
        className="slide-select__drag"
      >
        <div className="slide-select__drag__icon"></div>
      </div>
    </div>
  )
}

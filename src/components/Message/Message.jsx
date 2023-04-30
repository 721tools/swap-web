import React from 'react'
import ReactDOM from 'react-dom/client'
import './Message.scss'

const now = Date.now()
let count = 0
function getUniqueKey() {
  return `${now}-${count++}`
}
function Message(props) {
  return (
    <div className="message">
      <div className="message__content" onAnimationEnd={props.onHide}>
        <span className={`message__icon ${props.type}`}></span>
        {props.content}
      </div>
    </div>
  )
}

function MessageWrapper({ list, onHide }) {
  return (
    <div className="message-wrapper">
      {list.map((item) => (
        <Message
          onHide={onHide.bind(this, item)}
          {...item}
          key={item.key}
        ></Message>
      ))}
    </div>
  )
}

export const message = (function () {
  let container = document.getElementById('message-container')
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', 'message-container')
    document.body.appendChild(container)
  }
  let list = []
  const messageWrapper = ReactDOM.createRoot(container)
  const add = (params = { content: '', type: 'info', key: '' }) => {
    list.push(params)
    messageWrapper.render(<MessageWrapper list={list} onHide={handleHide} />)
  }

  const handleHide = (msg) => {
    list = list.filter((item) => item != msg)
  }
  messageWrapper.render(<MessageWrapper list={list} onHide={handleHide} />)

  return {
    warn: (content) => {
      add({
        key: getUniqueKey(),
        content,
        type: 'warn'
      })
    },
    error: (content) => {
      add({
        key: getUniqueKey(),
        content,
        type: 'error'
      })
    },
    success: (content) => {
      add({
        key: getUniqueKey(),
        content,
        type: 'success'
      })
    }
  }
})()

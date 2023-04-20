import React from 'react'
import ReactDOM from 'react-dom'
import './Message.scss'
// import PropTypes from 'prop-types'

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

// Message.propTypes = {
//   onHide: PropTypes.func,
//   type: PropTypes.string,
//   content: PropTypes.string
// }
class MessageWrapper extends React.Component {
  state = {
    list: []
  }

  add = (params = { content: '', type: 'info', key: '' }) => {
    this.setState({
      list: this.state.list.concat([params])
    })
  }

  handleHide = msg => {
    this.setState({
      list: this.state.list.filter(item => item != msg)
    })
  }

  render() {
    return (
      <div className="message-wrapper">
        {this.state.list.map(item => (
          <Message
            onHide={this.handleHide.bind(this, item)}
            {...item}
            key={item.key}
          ></Message>
        ))}
      </div>
    )
  }
}

export const message = (function() {
  let container = document.getElementById('message-container')
  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', 'message-container')
    document.body.appendChild(container)
  }

  const messageWrapper = ReactDOM.render(<MessageWrapper />, container)
  return {
    warn: content => {
      messageWrapper.add({
        key: getUniqueKey(),
        content,
        type: 'warn'
      })
    },
    error: content => {
      messageWrapper.add({
        key: getUniqueKey(),
        content,
        type: 'error'
      })
    },
    success: content => {
      messageWrapper.add({
        key: getUniqueKey(),
        content,
        type: 'success'
      })
    }
  }
})()

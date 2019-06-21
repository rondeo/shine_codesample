import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
//import css from './style.scss'

class Message extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className={`
          message
          ${this.props.myMessage ? 'message--my' : 'message--others'}
        `}
      >
        <div className="message__text">{this.props.text}</div>
        {
          !this.props.hideImage
            ?
              <div
                className="message__image"
                style={{backgroundImage: `url(${this.props.imageUrl})`}}
              >
              </div>
            :
              ''
        }
      </div>
    )
  }
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  hideImage: PropTypes.bool,
  myMessage: PropTypes.bool,
}

export default Message


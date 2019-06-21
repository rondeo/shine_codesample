import React, {Component, Fragment} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Message from 'components/Message'
import imgMan1 from 'images/mini-man1'
import imgMan2 from 'images/mini-man2'
import imgDefault from 'images/default.png'
import axios from 'axios'
import dayjs from 'dayjs'
//import css from './style.scss'

class GroupMessages extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

    this.scrollToBottom = ::this.scrollToBottom
  }

  componentWillUpdate(nextProps) {
    this.historyChanged = (nextProps.messages.length !== this.props.messages.length)

    if (this.historyChanged) {
      const messageList = this.messageList
      const scrollPos = messageList.scrollTop;
      const scrollBottom = (messageList.scrollHeight - messageList.clientHeight);
      this.scrollAtBottom = (scrollBottom <= 0) || (scrollPos === scrollBottom);

      if (!this.scrollAtBottom) {
        const numMessages = messageList.childNodes.length;
        this.topMessage = numMessages === 0 ? null : messageList.childNodes[0];
      }
    }
  }
  componentDidUpdate() {
    if (this.historyChanged) {
      if (this.scrollAtBottom) {
        this.scrollToBottom();
      }
      if (this.topMessage) {
        ReactDOM.findDOMNode(this.topMessage).scrollIntoView();
      }
    }
  }

  scrollToBottom() {
    const containingPanel = $('#' + this.props.containingPanelId + " .panel__content")
    const messageList = this.messageList
    const height = messageList.clientHeight

    containingPanel.animate(
      {
        scrollTop: height,
      },
      1200,
    )
  }

  render() {
    let messagesByDate = this.props.messages.reduce((acc, m) => {
      const msgDate = dayjs(m.created_at).format('YYYY-MM-DD')
      acc[msgDate] = acc[msgDate] || []
      acc[msgDate] = acc[msgDate].concat(m)
      return acc
    }, {})

    return (
      <div
        className="group-messages"
        ref={node => this.messageList = node}
      >
        {
          Object.entries(messagesByDate).map(dateMessages => (
            <Fragment key={dateMessages[0]}>
              <div
                className="message__date"
              >
                <span>
                  {dayjs(dateMessages[0]).format('MMMM D')}
                </span>
              </div>
              {
                dateMessages[1].map((m, i) => (
                  <Message
                    key={m.id}
                    text={m.content}
                    imageUrl={m.user.image_url ? m.user.image_url : imgDefault}
                    hideImage={m.user.id === (dateMessages[1][i+1] && dateMessages[1][i+1].user.id)}
                    myMessage={parseInt(this.props.userId) == parseInt(m.user.id)}
                  />
                ))
              }
            </Fragment>
          ))
        }
      </div>
    )
  }
}

GroupMessages.defaultProps = {
  messages: [],
}

GroupMessages.propTypes = {
  messages: PropTypes.array.isRequired,
}

export default GroupMessages


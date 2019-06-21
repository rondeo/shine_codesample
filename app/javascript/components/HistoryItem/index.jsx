import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import Attachment from 'images/svg/attachment'
import {CSSTransition} from 'react-transition-group'
import dayjs from 'dayjs'
//import css from './style.scss'

class HistoryItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDetailed: this.props.detailed || false,
    }

    this.approveStatus = ::this.approveStatus
    this.rejectStatus = ::this.rejectStatus
    this.toggleDetailed = ::this.toggleDetailed
  }

  approveStatus() {
    this.props.updateStatus('approved', this.props.id)
  }

  rejectStatus() {
    this.props.updateStatus('rejected', this.props.id)
  }

  toggleDetailed() {
    this.setState({
      showDetailed: !this.state.showDetailed,
    })
  }

  render() {
    return (
      <div className={`
        history-item
      `}
      onClick={this.toggleDetailed}
      >
        <div className="history-item__top">
          <div className="history-item__wrapper">
            {
              /*
            <div
              className="history-item__image"
              style={{backgroundImage: `url(${this.props.image}`}}
            ></div>
            */
            }

            <div className="history-item__title">{dayjs(this.props.date).format('ddd, MMMM D')}</div>
            <div className="history-item__subtitle">
              <span>{this.props.subject}</span>
            </div>
            {
              this.props.text
                ?
                  <CSSTransition
                    in={!this.state.showDetailed}
                    timeout={10}
                    classNames="transition-opacity"
                    unmountOnExit
                  >
                    <div className="history-item__text">
                      {this.props.text}
                    </div>
                  </CSSTransition>
                :
                  ''
            }
            <div className="history-item__duration">
              <Button
                small={true}
                noHover={true}
              >
                {this.props.time}
              </Button>
            </div>
            <div
              className="history-item__approved"
            >
              {
                this.props.type == 'Learner' && this.props.status == 'pending'
                  ?
                    <div className="history-item__wrapper--buttons">
                      <div className="history-item__button">
                        <Button
                          small={true}
                          orange={true}
                          onClick={this.approveStatus}
                        >
                          Approve
                        </Button>
                      </div>

                      {
                        /*
                      <div className="history-item__button">
                        <Button
                          small={true}
                          hoverMango={true}
                          onClick={this.rejectStatus}
                        >
                          Reject
                        </Button>
                      </div>
                          */
                      }
                    </div>
                  :
                    ''
              }
              {
                this.props.type == 'Teacher' && this.props.status
                  ?
                    <Button
                      small={true}
                      orange={this.props.status === "approved"}
                      steel={this.props.status === "rejected"}
                      noHover={true}
                    >
                      {this.props.status === "approved" ? 'Paid' : ''}
                      {this.props.status === "pending" ? 'Pending' : ''}
                      {this.props.status === "rejected" ? 'Rejected' : ''}
                    </Button>
                  :
                    ''
              }
            </div>
          </div>

        </div>
        <div className="history-item__bottom">
          <CSSTransition
            in={this.state.showDetailed}
            timeout={10}
            classNames="transition-opacity"
            unmountOnExit
          >
            <div className="history-item__quote">
              Lesson Summary:
              <br />
              <br />
              {this.props.quote}
            </div>
          </CSSTransition>
        </div>
      </div>
    )
  }
}

HistoryItem.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  image: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
  text: PropTypes.string,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  attachmentImage: PropTypes.string.isRequired,
  button: PropTypes.bool,
  detailed: PropTypes.bool,
}

export default HistoryItem


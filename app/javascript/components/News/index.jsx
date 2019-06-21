import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
//import css from './style.scss'

class News extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

    // add relativeTime
    dayjs.extend(relativeTime)

    this.memberLength = ::this.memberLength
    // TODO: takes actual member data for 'Dates' and 'You've been with us for...'
  }

  memberLength() {
    if (this.props.currentUserJoinDate) {
      let memLength = dayjs().from(dayjs(this.props.currentUserJoinDate), true)
      return `You've been with us for ${memLength}.`
    }
    else {
      return ''
    }
  }

  render() {
    return (
      <div className={`
        news
        ${this.props.messagePage ? 'news--message-page' : ''}
      `}>
      {
        /*
          this.props.messagePage
            ?
            */
      }
              <div className="news__content">
                <div className="news__bottom">
                  <div className="news__bottom-title">
                    {this.memberLength()}
                    <div className="news__icon">
                    </div>
                  </div>
                  <div className="news__bottom-text">
                    Thanks for Being a Member!
                  </div>
                  {
                    /*
                  <div className="news-avatar__wrapper">
                    <div className="news-avatar">
                      <div
                        className="news-image"
                        style={{backgroundImage: `url(${this.props.image}`}}
                      >
                      </div>
                      <div
                        className="news-image-bg"
                      >
                      </div>
                    </div>
                    <div className="news-avatar__text">
                    </div>
                  </div>
                  */
                  }
                </div>
              </div>
          {
            /*
            :
              <div className="news__content">
                <div className="news__top">
                  <div className="news__top-left">
                    <div className="news-avatar">
                      <div
                        className="news-image"
                        style={{}}
                      >
                      </div>
                      {
                      <div
                        className="news-image-bg"
                        style={{backgroundColor: `${this.props.lessonPage ? '#384393' : '#00D8BB'}` }}
                      >
                      </div>
                      }
                    </div>
                    <div className="news__top-left-text">
                      Welcome!
                    </div>
                  </div>
                  <div className="news__top-right">
                  </div>
                </div>
                <div className="news__bottom">
                  <div className="news__bottom-title">
                    {this.memberLength()}
                    <div className="news__icon">
                    </div>
                  </div>
                  <div className="news__bottom-text">
                  </div>
                </div>
              </div>
              */
          }
      </div>
    )
  }
}

News.propTypes = {
  image: PropTypes.string.isRequired,
  lessonPage: PropTypes.bool,
  messagePage: PropTypes.bool,
  currentUserJoinDate: PropTypes.string,
}

export default News


import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
//import css from './style.scss'

class LessonItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="lesson-item">
        <div className="lesson-item__img">
          <div
            className="lesson-item__img-image"
            style={{backgroundImage: `url(${this.props.image})`}}
          >
            {
              this.props.count
                ?
                  <div className="lesson-item__img-image-count">
                    {this.props.count}
                  </div>
                :
                  ''
            }
          </div>
        </div>
        <div className="lesson-item__content">
          <div className="lesson-item__content-top">
            <div className="lesson-item__content-top-title">{this.props.title}</div>
            <div className="lesson-item__content-top-lesson">{this.props.subtitle}</div>
          </div>
          <div className="lesson-item__content-bottom">
            {this.props.text}
          </div>
        </div>
      </div>
    )
  }
}

LessonItem.propTypes = {
  image: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default LessonItem


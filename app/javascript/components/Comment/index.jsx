import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Quote from 'images/svg/quote.svg'
//import css from './style.scss'

class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <section className="comment">
        <div className="comment__quote">
          <Quote />
        </div>
        <div className="comment__content">
          <div className="comment__text">{this.props.text}</div>
          <div className="comment__signature">
            <div className="comment__line"></div>
            <div className="comment__author">{this.props.author}, {this.props.location}</div>
          </div>
        </div>
      </section>
    )
  }
}

Comment.propTypes = {
  text: PropTypes.string,
  author: PropTypes.string,
  location: PropTypes.string,
}

export default Comment


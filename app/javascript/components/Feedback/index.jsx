import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Stars from 'components/Stars'
//import css from './style.scss'

class Feedback extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: 0,
    }

    this.calculateStarRating = ::this.calculateStarRating
  }
  componentDidMount() {
    this.calculateStarRating()
  }

  calculateStarRating() {
    if (!this.props.reviews || this.props.reviews.length === 0) {
      this.setState({
        rating: 0,
      })
      return
    }

    let rating = this.props.reviews.reduce(
      (acc, review) => acc + parseFloat(review.value),
      0.0
    )
    rating = rating / this.props.reviews.length

    this.setState({
      rating: rating,
    })
  }

  render() {
    return (
      <div className="feedback">
        <div className="feedback__title">
          {this.props.title}
        </div>
        <div className="feedback__subtitle">
          <div className="feedback__subtitle-stars">
            <Stars
              reviews={this.props.reviews}
              disabled={this.props.starsDisabled}
            />
          </div>
          <div className="feedback__subtitle-number">
            {this.state.rating}
          </div>
          <div className="feedback__subtitle-date">
            {this.props.date}
          </div>
        </div>
        <div className="feedback__text">
          {this.props.text}
        </div>
      </div>
    )
  }
}

Feedback.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  reviews: PropTypes.array.isRequired,
  number: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
}

export default Feedback


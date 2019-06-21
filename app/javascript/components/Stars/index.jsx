import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
//import css from './style.scss'

const STAR_TOGGLES = () => (
  [
    { id: 'id-1-1', value: 5 },
    { id: 'id-1-2', value: 4.5, half: true },
    { id: 'id-1-3', value: 4 },
    { id: 'id-1-4', value: 3.5, half: true },
    { id: 'id-1-5', value: 3 },
    { id: 'id-1-6', value: 2.5, half: true },
    { id: 'id-1-7', value: 2 },
    { id: 'id-1-8', value: 1.5, half: true },
    { id: 'id-1-9', value: 1 },
    { id: 'id-1-10', value: 0.5, half: true }
  ]
)

class Stars extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: 0,
      stars: [...STAR_TOGGLES()],
    }

    this.calculateStarRating = ::this.calculateStarRating
  }
  componentDidMount() {
    this.calculateStarRating()
  }

  calculateStarRating(){
    if (!this.props.reviews || this.props.reviews.length === 0) {
      this.setState({
        rating: 0,
        stars: [...STAR_TOGGLES()],
      })
      return
    }

    let rating = this.props.reviews.reduce(
      (acc, review) => acc + parseFloat(review.value),
      0.0
    )
    rating = rating / this.props.reviews.length

    let stars = [...STAR_TOGGLES()]
    stars.forEach((s, i) => {
      if (rating >= s.value) {
        s.checked = true
      }
    })

    this.setState({
      rating: rating,
      stars: stars,
    })
  }

  render() {
    return (
      <div className={`
        stars
        ${this.props.disabled ? 'disabled' : ''}
      `}
      >
        {
          this.state.stars.map((s,i) => (
            <div className="star" key={s.id}>
              <input
                id={s.id}
                type="radio"
                value={s.value}
                checked={s.checked}
                readOnly={true}
              />
              <label
                className={`${s.half ? 'star-half' : ''}`}
                htmlFor={s.id}
              >
                {s.value}
              </label>
            </div>
          ))
        }
        {this.state.rating}
        {this.props.reviews.length}
      </div>
    )
  }
}

Stars.defaultProps = {
  reviews: [],
}

Stars.propTypes = {
  reviews: PropTypes.array.isRequired,
  name: PropTypes.string,
  disabled: PropTypes.bool,
}

export default Stars


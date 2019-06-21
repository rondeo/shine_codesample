import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Tutor from 'components/Tutor'
import Stars from 'components/Stars'
//import css from './style.scss'

class TutorCardPrice extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="tutor-card-price">
        <div className="tutor-card-price__tutor">
          <Tutor
            imageUrl={this.props.imageUrl}
            name={this.props.tutorName}
          />
        </div>
        {
          this.props.tagline
            ?
              <div className="tutor-card-price__tagline">
                {this.props.tagline}
              </div>
            :
              ''
        }
        <div className="tutor-card-price__content">
          <div className="tutor-card-price__title">
            <div className="tutor-card-price__stars">
              <Stars
                reviews={this.props.reviews}
                name="stars-5"
                disabled={true}
              />
            </div>
            {
              this.props.reviews && this.props.reviews.length > 0
                ?
                  <div className="tutor-card-price__reviews">
                    {this.props.numReviews} Reviews
                  </div>
                :
                  ''
            }
          </div>
          {
            this.props.yrsExp
              ?
                <div className="tutor-card-price__text">
                  {this.props.yrsExp} Years of Experience
                </div>
              :
                ''
          }
        </div>
        <div className="tutor-card-price__rate">
          <div className="tutor-card-price__rate-cost">
            ${(this.props.priceCents / 100).toFixed(2)}
          </div>
          <div className="tutor-card-price__rate-text">Hourly Rate</div>
        </div>
      </div>
    )
  }
}

TutorCardPrice.defaultProps = {
  priceCents: 0,
}

TutorCardPrice.propTypes = {
  tutorName: PropTypes.string.isRequired,
  yrsExp: PropTypes.number.isRequired,
  reviews: PropTypes.array.isRequired,
  priceCents: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
}

export default TutorCardPrice


import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Tutor from 'components/Tutor'
import Button from 'components/Button'
import Stars from 'components/Stars'
import Cap from 'images/svg/cap'
import Certificate from 'images/svg/certificate'
import imgEmma from 'images/man1.jpg'
//import css from './style.scss'

class TutorCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    let uriString = this.props.tutorName
    uriString = uriString.replace(/[\s-]/g, '')
    uriString = uriString + "-" + this.props.id
    uriString = encodeURI(uriString)

    return (
      <div className="tutor-card">
        <div className="tutor-card__content">
          <div className="tutor-card__tutor">
            <Link
              to={`/tutor/${uriString}`}
            >
              <Tutor
                name={this.props.tutorName}
                imageUrl={this.props.imageUrl || imgEmma}
              />
          </Link>
          </div>
          <div className="tutor-card__head">

            <div className="tutor-card__head-reviews">{this.props.reviewCount} reviews</div>
            <div className="tutor-card__head-expirience"><b>{this.props.yrsExp} Years of Exp.</b></div>
          </div>
          <div className="tutor-card__inner-content">
            <div className="tutor-card__education">
              <div className="tutor-card__education-items">
                {
                  this.props.educations.map(e => (
                    <div className="tutor-card__education-item" key={e.id}>
                      <div className="tutor-card__education-icon">
                        <Cap />
                        </div>
                        <b className="tutor-card__education-text">
                          { e.degree }, { e.course }, { e.institute }
                        </b>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="tutor-card__text">
              { this.props.bio }
            </div>
            {
              /*
              <a href="#" className="tutor-card__view-more">View More</a>
              */
            }
            <div className="tutor-card__price">
              <div className="tutor-card__price-dollar">$</div>
              <div className="tutor-card__price-number">{(this.props.priceCents / 100).toFixed(2)}</div>
              <div className="tutor-card__price-hour">/hour</div>
            </div>
            <div className="tutor-card__button inner-fw">
              <Button
                text={`Contact ${this.props.tutorName.split(' ')[0]}`}
                orange={true}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

TutorCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  tutorName: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  yrsExp: PropTypes.number.isRequired,
  priceCents: PropTypes.number.isRequired,
  educations: PropTypes.array.isRequired,
  reviews: PropTypes.array.isRequired,
  reviewCount: PropTypes.number.isRequired,
  starName: PropTypes.string.isRequired,
  starDisabled: PropTypes.bool,
  loadsProfile: PropTypes.bool,
}

export default TutorCard


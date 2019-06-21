import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Stars from 'components/Stars'
import Input from 'components/Input'
import Button from 'components/Button'
import Radio from 'components/Radio'
import ImgModal3 from 'images/modal3'
//import css from './style.scss'

class FormLessonReview extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <form className="form-review">
        <div className="form-review__left"
          style={{ backgroundImage: ImgModal3 }}
        ></div>
        <div className="form-review__right">
          <div className="form-review__right-title">
            <h2>Leave a Review</h2>
          </div>
          <div className="form-review__right-form">
            <div className="form-review__right-recomment">
              <div className="form-review__right-form-span">
                1. Would you recommend John to other parents?
              </div>
              <fieldset className="form-review-fieldset">
                <div className="form-review__radios">
                  <div className="form-review__radio">
                    <Radio
                      id="1"
                      name="radio-group-1"
                      label="Yes"
                      checked={true}
                      readOnly
                    />
                  </div>
                  <div className="form-review__radio">
                    <Radio
                      id="1"
                      name="radio-group-1"
                      label="No"
                    />
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="form-review__right-stars">
              <div className="form-review__right-form-span">
                2. How would you rate John's tutoring?
              </div>
              <fieldset className="form-review-stars">
                <Stars
                  reviews={[
                  ]}
                  name="stars-1"
                  disabled={false}
                />
              </fieldset>
            </div>
            <div className="form-review__right-text">
              <div className="form-review__right-form-span">
                3. What do other parents need to know about John? | This will be visible on his profile
              </div>
              <fieldset className="form-review-fieldset">
                <label htmlFor="yes">
                  <Input
                    textarea={true}
                  />
                </label>
              </fieldset>
            </div>
            <div className="form-review__right-button">
              <Button
                text="Submit Review"
                orange={true}
                submit={true}
              />
            </div>
          </div>
        </div>
      </form>
    )
  }
}

FormLessonReview.propTypes = {
}

export default FormLessonReview


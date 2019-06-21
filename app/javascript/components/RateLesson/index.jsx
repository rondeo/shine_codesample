import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import Dropzone from 'components/Dropzone'
import Field from 'components/Field'
import Input from 'components/Input'
import Select from 'components/Select'
import CircularImage from 'components/CircularImage'
import HappyFace from 'images/svg/face-happy'
import SadFace from 'images/svg/face-sad'

import modalBackground from 'images/modal4'


class RateLesson extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: '',
      message: '',
      privateFeedback: '',
      buttonDisable: true,
    }
    this.updateRating = ::this.updateRating
    this.rateLesson = ::this.rateLesson
    this.updateFormAttribute = ::this.updateFormAttribute
  }

  rateLesson() {
    if(this.state.rating) {
      let data = {
        rating: this.state.rating,
        message: this.state.message,
        privateFeedback: this.state.privateFeedback,
      }

      this.props.approveLesson(data)
    }
  }

  updateRating(val) {
    this.setState({ rating: val})
    this.setState({ buttonDisable: false})
  }

  updateFormAttribute(e) {
    let val = e.target.type === "checkbox" ? e.target.checked : e.target.value

    this.setState({
      [e.target.name]: val,
    })
  }

  render() {
    let firstName = this.props.name && this.props.name.split(' ')[0]

    return (
      <div className="form-lesson form-rate-lesson">
        <form className="form-container" style={{paddingTop: '25px'}}>
          <div className="form-lesson__field grid-1-2">
            <div className="form-rate-lesson__header">
              <h4>How Was Your Lesson with {firstName}?</h4>
            </div>
          </div>
          <div className="form-information__field form-rate-lesson__button-field">
            <span
              className={`
                form-rate-lesson__button
                form-rate-lesson__button--disapprove
                ${this.state.rating === 'down' ? 'form-rate-lesson__button--selected' : ''}
              `}
              onClick={() => this.updateRating('down') }
            >
              <span>
                <SadFace />
              </span>
            </span>
          </div>

          <div className="form-information__field form-rate-lesson__button-field">
            <span
              className={`
                form-rate-lesson__button
                form-rate-lesson__button--approve
                ${this.state.rating === 'up' ? 'form-rate-lesson__button--selected' : ''}
              `}
              onClick={() => this.updateRating('up') }
            >
              <span>
                <HappyFace />
              </span>
            </span>
          </div>

          <div className="form-information__field grid-1-2">
            <Field
            >
              <Input
                id="message"
                name="message"
                placeholder={`Add some feedback for ${firstName} (optional)`}
                textarea={true}
                textareaSmall={true}
                value={this.state.message}
                onChange={this.updateFormAttribute}
              />
            </Field>
          </div>

          {
            /*
          <div className="form-information__field grid-1-2">
            <Field
              label={`(Optional) Would you like to submit any private feedback about ${firstName}?`}
            >
              <Input
                id="privateFeedback"
                name="privateFeedback"
                value={this.state.privateFeedback}
                onChange={this.updateFormAttribute}
              />
            </Field>
          </div>
          */
          }

          <div className="form-lesson__button grid-1-2">
            <Button
              text={this.state.buttonDisable ? 'Select a Rating' : 'Approve Lesson'}
              orange={!this.state.buttonDisable}
              fullWidth={true}
              disabled={this.state.buttonDisable}
              onClick={this.rateLesson}
            />
          </div>
        </form>
      </div>

    )
  }
}

RateLesson.propTypes = {
}

export default RateLesson


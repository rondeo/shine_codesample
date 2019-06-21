import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Field from 'components/Field'
import Button from 'components/Button'
import Select from 'components/Select'
import Input from 'components/Input'
import {
  SUBJECT_OPTIONS,
} from 'utils/constants.js'
//import css from './style.scss'

class FormTutorWhy extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="form-tutor-why">
        <form className="form-container-col-2">
          <div className="form-information__field">
            <Field
              id="information-1"
              label="First Name * "
            >
              <Input
                id="first-name"
                name="first-name"
                placeholder="Your Name"
                onChange={this.props.updateFirstName}
                value={this.props.firstName}
                hasError={!!this.props.errors['firstName']}
              />
            </Field>
          </div>
          <div className="form-information__field">
            <Field
              id="information-2"
              label="Last Name *"
            >
              <Input
                id="information-2"
                name="last-name"
                placeholder="Your Last Name"
                onChange={this.props.updateLastName}
                value={this.props.lastName}
                hasError={!!this.props.errors['lastName']}
              />
            </Field>
          </div>
        </form>
        <form className="form-container">
          <div className="form-information__field">
            <Field
              id="information-3"
              label="Email Address *"
            >
              <Input
                id="information-3"
                name="email-address"
                placeholder="you@tutor.com"
                onChange={this.props.updateEmail}
                value={this.props.email}
                hasError={!!this.props.errors['email']}
              />
            </Field>
          </div>
          <div className="form-information__field">
            <Field
              id="why-4"
              label="Tell us about yourself! What do you love about tutoring and working with students? *"
            >
              <Input
                id="why-4"
                name="bio"
                textarea={true}
                charLimit={true}
                maxlength={600}
                placeholder="Hello, my name is Michael, and I am a currently licensed teacher with a California clear credential and over 8 years of classroom experience. I have experience tutoring almost every subject and grade level, although I specialize in teaching high school geometry, trigonometry, and pre-calculus."
                onChange={this.props.updateBio}
                value={this.props.bio}
                hasError={!!this.props.errors['bio']}
              />
            </Field>
          </div>
          <div className="form-information__field">
            <Field
              fieldFor="students-describe"
              label="Describe yourself to new students. What's your greatest strength or achievement as a tutor? *"
            >
              <Input
                name="students-describe"
                placeholder="Helping students with ADHD get motivated in Math!"
                onChange={this.props.updateTagline}
                value={this.props.tagline}
                hasError={!!this.props.errors['tagline']}
              />
            </Field>
          </div>
          <div className="form-information__field">
            <Field
              fieldFor="specialty"
              label="If you had to pick just 1 subject to teach, what would it be? *"
            >
              <Select
                name="specialty"
                options={SUBJECT_OPTIONS}
                onChange={this.props.updatePreferredSubject}
                value={this.props.preferredSubject}
                hasError={!!this.props.errors['subject']}
              />
            </Field>
          </div>
          {
            /*
          <div className="form-information__field">
            <Field
              id="why-1"
              label="What do you love about tutoring? Feel free to include a story."
            >
              <Input
                id="information-1"
                textarea={true}
                maxlength={300}
                name="why-i-tutor"
                placeholder="I love tutoring because..."
              />
            </Field>
          </div>
          */
          }

          <div className="form-information__field">
            <span style={{color: "red"}}>{this.props.submissionErr}</span>
          </div>
          <div className="form-information__field d-flex justify-end">
            <Button
              text="Save & Continue"
              orange={true}
              bigWidth={true}
              onClick={this.props.onSubmit}
            />
          </div>
        </form>
      </div>
    )
  }
}

FormTutorWhy.propTypes = {
  onSubmit: PropTypes.func,
}

export default FormTutorWhy



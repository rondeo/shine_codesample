import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Field from 'components/Field'
import Input from 'components/Input'
import Button from 'components/Button'
import imgColorfulPencils from 'images/colorful-pencils.jpg'
import { VALID_EMAIL_REGEX } from '../../../constants'
import axios from 'axios'

class StayInTouch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newsletterFname: '',
      newsletterEmail: '',
      errors: {},
      responseText: null,
    }

    this.updateAttribute = ::this.updateAttribute
    this.validateNewsletterSignup = ::this.validateNewsletterSignup
    this.submitNewsletterSignup = ::this.submitNewsletterSignup
  }

  updateAttribute(e) {
    let val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    this.setState({
      [e.target.name]: val,
    })
  }

  validateNewsletterSignup() {
    let errors = {}
    if (
      this.state.newsletterFname.length < 1
    ) {
      errors.newsletterFname = true
    }

    if (
      this.state.newsletterEmail.length < 1 ||
      !VALID_EMAIL_REGEX.test(this.state.newsletterEmail)
    ) {
      errors.newsletterEmail = true
    }

    this.setState({
      errors: {...errors}
    })

    // true if no errors
    return (Object.keys(errors).length === 0)
  }
  submitNewsletterSignup() {
    let newsletterValid = this.validateNewsletterSignup()
    if (!newsletterValid) {
      return false
    }

    let postData = {
      emailAddress: this.state.newsletterEmail,
      firstName: this.state.newsletterFname,
    }

    return axios.post(
      `/api/v1/mailchimp/signup_newsletter`,
      postData,
    ).then(
      res => {
        this.setState({
          responseText: res.data.message,
        })
      }
    )
  }

  render() {
    return (
      <section className="section-stay-in-touch shineLanding"
      >
        <div className="container-fluid">
          <div className="section-stay-in-touch__content">
            <div className="section-stay-in-touch__title">
              <div className="text-left">
                <h4>Just Window-Shopping?</h4>
                <h2>Stay In Touch!</h2>
              </div>
              <div className="section-stay-in-touch__text">
                Sign up to receive our weekly newsletter containing the latest student success strategies, test-prep tricks, and ed-psych research to help your student succeed.
              </div>
            </div>
            {
              !!this.state.responseText
                ?
                  <div className="section-stay-in-touch__form">
                    <h2 className="section-stay-in-touch__form--response">{this.state.responseText}</h2>
                  </div>
                :
                  <div className="section-stay-in-touch__form">
                    <Field
                      id="newsletterFname"
                      label="Your First Name"
                    >
                      <Input
                        name="newsletterFname"
                        placeholder="Your Name"
                        value={this.state.newsletterFname}
                        onChange={this.updateAttribute}
                        hasError={this.state.errors.newsletterFname}
                      />
                    </Field>
                    <Field
                      id="newsletterEmail"
                      label="Your Email"
                    >
                      <Input
                        name="newsletterEmail"
                        placeholder="Your Email"
                        value={this.state.newsletterEmail}
                        onChange={this.updateAttribute}
                        hasError={this.state.errors.newsletterEmail}
                      />
                    </Field>
                    <div className="section-stay-in-touch__form--submit">
                      <Button
                        orange={true}
                        bigWidth={true}
                        onClick={this.submitNewsletterSignup}
                      >
                        Yes! I Want Success Tips
                      </Button>
                    </div>
                  </div>
            }
          </div>
        </div>
      </section>
    )
  }
}

StayInTouch.propTypes = {
}

export default StayInTouch


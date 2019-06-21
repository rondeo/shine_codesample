import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import CircularImage from 'components/CircularImage'
import Field from 'components/Field'
import Input from 'components/Input'
import Panel from 'components/Panel'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {
  API_PREFIX,
  VALID_EMAIL_REGEX,
} from '../../constants'

const THANKS_MSG_DEFAULT = "Thanks! Your reference has been submitted."

class PageReference extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      refTitle: '',
      refText: '',
      refId: '',
      tutorName: '',
      tutor: {},
      thanksMsg: THANKS_MSG_DEFAULT,
      page: 0,
      newPassword: '',
      newPasswordConfirmation: '',
      passwordMatchError: false,
      emailError: false,
    }
    this.validateReferenceText = ::this.validateReferenceText
    this.updateFormAttribute = ::this.updateFormAttribute
    this.passwordsMatch = ::this.passwordsMatch

    this.updateReference = ::this.updateReference
    this.submitReferenceText = ::this.submitReferenceText
    this.submitReferenceAccount = ::this.submitReferenceAccount
    this.onComplete = ::this.onComplete
  }

  componentDidMount() {
    axios.get(`${API_PREFIX}/references/${this.props.match.params.id}`)
      .then(res => {
        let ref = res.data.ref;
        if(ref.confirmed) {
          this.props.history.push('/')
        } else {
          this.setState({refId: ref.id});
          this.setState({firstName: ref.first_name});
          this.setState({lastName: ref.last_name});
          this.setState({email: ref.email});
          this.setState({personalNote: ref.personal_note});
          this.setState({imageUrl: res.data.tutor_image_url});
          this.setState({tutorName: res.data.tutor_name});
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  updateFormAttribute(e) {
    let val = e.target.type === "checkbox" ? e.target.checked : e.target.value

    this.setState({
      [e.target.name]: val,
    })
  }

  submitReferenceAccount() {
    this.setState({
      passwordMatchError: false,
      emailError: false,
    })

    /*
    if (!this.passwordsMatch()) {
      this.setState({
        passwordMatchError: true,
      })
      return
    }
    */

    let hasError = false
    if (
      !this.state.newPassword ||
      this.state.newPassword.length < 6
    ) {
      hasError = true
      this.setState({
        passwordMatchError: true,
      })
    }
    if (
      !this.state.email ||
      !VALID_EMAIL_REGEX.test(this.state.email)
    ) {
      hasError = true
      this.setState({
        emailError: true,
      })
    }

    if (hasError) return

    let self = this
    this.updateReference(true)
      .then(() => {
        self.onComplete()
      })
  }

  onComplete() {
    this.props.history.push('/')
  }

  updateReference(createAccount) {
    let referenceParams = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      reference_title: this.state.refTitle,
      reference_text: this.state.refText,
    }

    return axios
      .put(`${API_PREFIX}/references/${this.state.refId}`,
        {
          reference: referenceParams,
          create_account: createAccount,
          password: this.state.newPassword,
        },
        {},
      )
  }

  passwordsMatch() {
    return (
      this.state.newPassword.length > 0 &&
      this.state.newPassword === this.state.newPasswordConfirmation
    )
  }

  submitReferenceText() {
    if(!this.validateReferenceText()) {
      return false;
    }

    // save reference
    this.updateReference(false)
      .then(() => {
        this.setState({page: 1});
      })
  }

  validateReferenceText() {
    let error = false;
    this.setState({
      firstNameError: false,
      emailError: false,
      titleError: false,
      textError: false,
    })

    if(!this.state.firstName) {
      error = true
      this.setState({firstNameError: true})
    }
    if(!this.state.email) {
      error = true
      this.setState({emailError: true})
    }
    if(!this.state.refTitle) {
      error = true
      this.setState({titleError: true})
    }
    if(!this.state.refText) {
      error = true
      this.setState({textError: true})
    }

    if (error) {
      return false
    } else {
      return true
    }
  }

  render() {
    return (
      <main
        className="page-reference"
      >
      {
        this.state.page === 0
          ?
            <article className="reference-panel">
              <Panel
                title="Leave a Reference"
                noTitleBorder={true}
                boldTitle={true}
                fullWidth={true}
                noMobileBorder={true}
                noOverflow={true}
                boxShadow={true}
                style={{opacity: .96}}
              >
                <section className="reference-text">
                  <div
                    className="reference-text__image"
                  >
                    {
                      this.state.imageUrl
                        ?
                          <CircularImage
                            imageUri={this.state.imageUrl}
                            width="100px"
                            height="100px"
                          />
                        :
                          ''
                    }
                  </div>

                  <blockquote>
                      <div
                        className="reference-text__button"
                      >
                        <div>Hi{this.state.firstName ? ` ${this.state.firstName}` : ''}!</div>
                        <br />
                        <div>
                          {
                            this.state.personalNote
                              ?
                                this.state.personalNote
                              :
                                <div>
                                  Would you mind giving a quick review of my work? I'd love for new students to know what it's like to work with me!
                                </div>
                          }
                        </div>
                      </div>
                  </blockquote>
                </section>

                <div className="form-tutor-reference">
                  <form className="form-container">
                    <div className="form-information__field grid-1-3">
                      <Field
                        label="Reference Headline *"
                      >
                        <Input
                          id="reference-title"
                          name="refTitle"
                          placeholder="My daughter loves math now!"
                          onChange={this.updateFormAttribute}
                          value={this.state.refTitle}
                          hasError={this.state.titleError}
                        />
                      </Field>
                    </div>

                    <div className="form-information__field grid-1-3">
                      <Field
                        label="Your Reference *"
                      >
                        <Input
                          textarea={true}
                          id="reference-text"
                          name="refText"
                          placeholder={`What should new students know about ${this.state.tutorName}'s tutoring?`}
                          onChange={this.updateFormAttribute}
                          value={this.state.refText}
                          hasError={this.state.textError}
                        />
                      </Field>
                    </div>
                  </form>
                  <div className="form-information__field grid-1-3">
                    <Button
                      orange={true}
                      bigWidth={true}
                      className="submit-reference"
                      onClick={this.submitReferenceText}
                    >
                      Submit Reference
                    </Button>
                  </div>
                </div>
              </Panel>
            </article>
          :
            ''
        }

        {
          this.state.page === 1
            ?
              <article className="panel--set-password">
                <Panel
                  title={`Thanks for your Reference!`}
                  boldTitle={true}
                  noTitleBorder={true}
                  fullWidth={true}
                  noMobileBorder={true}
                  noOverflow={true}
                  boxShadow={true}
                  style={{opacity: .96}}
                >
                <div className="form-set-password">
                  <form className="form-container">
                    <div className="form-information__field grid-1-2">
                      <div
                        className="form-set-password__subtitle"
                      >
                        <span>
                          Would you like to create an account for future use?
                        </span>
                      </div>
                    </div>

                    <div className="form-information__field grid-1-2">
                      <Field
                        label="Your Email"
                      >
                        <Input
                          id="set-password__password"
                          name="email"
                          type="text"
                          placeholder="Your Preferred Email"
                          onChange={this.updateFormAttribute}
                          value={this.state.email}
                          hasError={this.state.emailError}
                        />
                      </Field>
                    </div>

                    <div className="form-information__field grid-1-2">
                      <Field
                        label="Password *"
                      >
                        <Input
                          id="set-password__password"
                          name="newPassword"
                          type="password"
                          onChange={this.updateFormAttribute}
                          value={this.state.newPassword}
                          hasError={this.state.passwordMatchError}
                        />
                      </Field>
                    </div>

                    <div className="form-information__field">
                      <Button
                        orange={true}
                        bigWidth={true}
                        className={`
                          submit--set-password
                          ${!this.passwordsMatch() ? 'submit--set-password__disabled' : ''}
                        `}
                        onClick={this.submitReferenceAccount}
                      >
                        Create My Account
                      </Button>
                    </div>

                    <div
                      className="form-information__field"
                    >
                      <Button
                        steel={true}
                        bigWidth={true}
                        className={`submit--set-password`}
                        onClick={this.onComplete}
                      >
                        No Thanks
                      </Button>
                    </div>
                  </form>
                </div>
              </Panel>
            </article>
          :
            ''
          }
      </main>
    )
  }
}

PageReference.propTypes = {
  match: PropTypes.object, // react-router URL matchdata: https://reacttraining.com/react-router/web/example/url-params
}

export default withRouter(
  PageReference
)


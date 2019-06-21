import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import Button from 'components/Button'
import Field from 'components/Field'
import Input from 'components/Input'
import Panel from 'components/Panel'
import axios from 'axios'
import {
  API_PREFIX,
} from '../../constants'
import {
  signInUser,
} from '../../actions'

/* Auth Params */
const LOGIN_ROUTE = `${API_PREFIX}/auth/sign_in`

class PageSetPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newPassword: '',
      newPasswordConfirmation: '',
      passwordError: false,
    }

    this.updateFormAttribute = ::this.updateFormAttribute
    this.passwordsMatch = ::this.passwordsMatch
    this.submitPassword = ::this.submitPassword

    const query = new URLSearchParams(this.props.location.search)

    axios.defaults.headers.common['uid'] = query.get('uid');
    axios.defaults.headers.common['client'] = query.get('client');
    axios.defaults.headers.common['access-token'] =  query.get('access-token');
  }

  updateFormAttribute(e) {
    let val = e.target.type === "checkbox" ? e.target.checked : e.target.value
    this.setState({
      // use 'name' attr of form field to set attribute
      [e.target.name]: val,
    })
  }

  passwordsMatch() {
    return (
      this.state.newPassword.length > 0 &&
      this.state.newPasswordConfirmation.length > 0 &&
      this.state.newPassword === this.state.newPasswordConfirmation
    )
  }

  submitPassword() {
    this.setState({
      passwordError: false,
    })

    if (!this.passwordsMatch()) {
      return
    }

    let passwordData = {
      password: this.state.newPassword,
      password_confirmation: this.state.newPasswordConfirmation
    }

    let loginParams = {
      email: axios.defaults.headers.common['uid'],
      password: this.state.newPassword,
    }

    axios.put(`${API_PREFIX}/auth/password`,
      {password: this.state.newPassword, password_confirmation: this.state.newPasswordConfirmation}, {},
    )
      .then(res => {
        this.props.signInUser(loginParams)
          .then(resp => {
            axios.defaults.headers.common['uid'] = this.props.currentUser.email;
            axios.defaults.headers.common['client'] = this.props.currentUser.client;
            axios.defaults.headers.common['access-token'] =  this.props.currentUser.accessToken;
            if(this.props.currentUser.type == 'Teacher') {
              this.props.history.push('/account');
            } else {
              this.props.history.push('/account');
            }
          })
      })
      .catch(err => {
        this.setState({
          passwordError: err.response.data.errors.full_messages,
        })
      })
  }

  passwordMessage() {
    let msg = 'Please choose your password.'

    if (
      this.state.newPassword.length > 0 &&
      this.state.newPasswordConfirmation.length > 0
    ) {
      if (this.passwordsMatch()) {
        msg = 'Passwords match!'
      } else {
        msg = 'Passwords must match!'
      }
    }

    if (this.state.passwordError) {
      msg = this.state.passwordError
    }

    return msg
  }

  render() {
    return (
      <main
        className="page-set-password"
      >
        <article className="panel--set-password">
          <Panel
            title="Set Your Password"
            noTitleBorder={true}
            boldTitle={true}
            fullWidth={true}
            noMobileBorder={true}
            noOverflow={true}
            boxShadow={true}
            style={{opacity: .96}}
          >
            <div className="form-set-password">
              <form className="form-container">
                <div className="form-information__field grid-1-3">
                  <Button
                    steel={!this.passwordsMatch()}
                    orange={this.passwordsMatch()}
                    radius={true}
                    noHover={true}
                  >
                    {
                      this.passwordMessage()
                    }
                  </Button>
                </div>
                <div className="form-information__field grid-1-3">
                  <Field
                    label="New Password *"
                  >
                    <Input
                      id="set-password__password"
                      name="newPassword"
                      type="password"
                      placeholder="*********"
                      onChange={this.updateFormAttribute}
                      value={this.state.newPassword}
                    />
                  </Field>
                </div>

                <div className="form-information__field grid-1-3">
                  <Field
                    label="Confirm Password *"
                  >
                    <Input
                      id="set-password__password-confirmation"
                      name="newPasswordConfirmation"
                      type="password"
                      placeholder="*********"
                      onChange={this.updateFormAttribute}
                      value={this.state.newPasswordConfirmation}
                    />
                  </Field>
                </div>

                <div className="form-information__field grid-2-1">
                  <Button
                    orange={true}
                    bigWidth={true}
                    className={`
                      submit--set-password
                      ${!this.passwordsMatch() ? 'submit--set-password__disabled' : ''}
                    `}
                    onClick={this.submitPassword}
                  >
                    Confirm Password
                  </Button>
                </div>
              </form>

            </div>
          </Panel>
        </article>
      </main>
    )
  }
}

PageSetPassword.propTypes = {
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser.attributes,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signInUser: loginData => dispatch(signInUser(loginData)),
    registerUser: signupData => dispatch(registerUser(signupData)),
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PageSetPassword)
)



import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Link, Route, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import Checkbox from 'components/Checkbox'
import Field from 'components/Field'
import Input from 'components/Input'
import Modal2Header from 'images/modal2.jpg'
import axios from 'axios'

//import {Link, Route, Redirect, withRouter} from 'react-router-dom'

//import css from './style.scss'
import {
  registerUser,
  signInUser,
} from '../../actions'

import {
  API_PREFIX,
  VALID_EMAIL_REGEX
} from '../../constants'

/* Auth Params */
const LOGIN_ROUTE = `${API_PREFIX}/auth/sign_in`

class FormLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      acceptTos: false,
      email: '',
      password: '',
      forgotPassword: false,
      loginErrMsg: ''
    }

    this.setAttribute = ::this.setAttribute
    this.submitLoginForm = ::this.submitLoginForm
    this.validate = ::this.validate
    this.checkForSubmit = ::this.checkForSubmit
    this.ShowForgotPasswordModal = ::this.ShowForgotPasswordModal
  }

  setAttribute(e) {
    let val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    if (typeof(val) != "undefined") {
      this.setState({
        [e.target.name]: val,
      })
    }
  }

  checkForSubmit(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      this.submitLoginForm()
    }
  }

  submitLoginForm() {
    if(!this.validate()) {
      return false;
    }

    let loginParams = {
      email: this.state.email,
      password: this.state.password,
    }

    this.props.signInUser(loginParams)
      .then(res => {
        this.props.onSubmit();
        axios.defaults.headers.common['uid'] = this.props.currentUser.email;
        axios.defaults.headers.common['client'] = this.props.currentUser.client;
        axios.defaults.headers.common['access-token'] =  this.props.currentUser.accessToken;

        if(this.props.currentUser.type == 'Teacher') {
          this.props.history.push('/lessons');
        } else {
          this.props.history.push('/messages');
        }
      })
      .catch(err => {
        this.setState({loginErrMsg: err.response.data.errors.join('')})
        // alert(err.response.data.errors.join(''));
      })
  }

  ShowForgotPasswordModal() {
    this.props.switchModal('FORGOT_PASSWORD');
  }

  validate() {
    let error = false;
    this.setState({
      emailError: false,
      passwordError: false,
    })

    if(!this.state.email || !VALID_EMAIL_REGEX.test(this.state.email)) {
      error = true;
      this.setState({emailError: true});
    }
    if(!this.state.password) {
      error = true;
      this.setState({passwordError: true});
    }

    if (error) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    return (
      <form action="/" className="form-login">
        <div
          style={{
            backgroundImage: `url(${Modal2Header})`
          }}
          className="form-request__head"
        >
          <div className="form-request__head-text">
            <h2>Welcome Back!</h2>
          </div>
        </div>
        <div className="form-login__wrapper">
          <div className="form-login__title">
            Log In
          </div>
          <div className="form-login__subtitle">
            Log in to send messages, record lessons, and manage your settings.
          </div>

          <div className="form-login__subtitle">
            <span style={{color: 'red', fontSize: '15px'}}>{this.state.loginErrMsg}</span>
          </div>
          <div className="form-login__buttons">
            <div className="form-login__buttons--field">
              <Field
                id="login-email"
                label="Email"
              >
                <Input
                  title="Email"
                  name="email"
                  placeholder="Your Email"
                  className="form-login__buttons--field"
                  onChange={this.setAttribute}
                  value={this.state.email}
                  hasError={this.state.emailError}
                  onKeyDown={this.checkForSubmit}
                />
              </Field>
            </div>
            <div className="form-login__buttons--field">
              <Field
                id="login-password"
                label="Password"
              >
                <Input
                  title="Password"
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  onChange={this.setAttribute}
                  value={this.state.password}
                  hasError={this.state.passwordError}
                  onKeyDown={this.checkForSubmit}
                />
              </Field>
            </div>
            <Button
              className="form-login__submit"
              orange={true}
              onClick={this.submitLoginForm}
            >
              Log In
            </Button>
            {
              /*
                <div className="form-login__buttons-left">
                  <Button
                    text="Sign Up with Facebook"
                    icon="facebook"
                    blue={true}
                  />
                </div>
                <div className="form-login__buttons-right">
                  <Button
                    text="Sign up with Gmail"
                    icon="mail"
                    redGmail={true}
                  />
                </div>
              */
            }
          </div>
          <div className="form-login__other">
            {
              /*
               * TODO: for Register function
            <Checkbox
              name="acceptTos"
              checked={this.state.acceptTos}
              onChange={this.setAttribute}
            />
            <span>
              By signing up, I agree to the <Link to="/terms-of-service">Terms of Service</Link><span> and </span><Link to="/privacy-policy">Privacy Policy</Link><span>.</span>
            </span>
            */
            }
          </div>
          <div className="form-login__subtitle">
            <div>
              <b className="form-login__link" onClick={this.ShowForgotPasswordModal}>Forgot your password?</b>
            </div>
            {
              /*
            <div>
              Need an Account?
              <b className="form-login__link" onClick={this.props.onSubmit}> Submit a Request to Sign Up</b>
            </div>
            */
            }
          </div>
        </div>
      </form>
    )
  }
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
  )(FormLogin)
)

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

class FormForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      page: 0,
      forgotPwdErrMsg: ''
    }

    this.setAttribute = ::this.setAttribute
    this.submitForgotPasswordForm = ::this.submitForgotPasswordForm
    this.ShowLoginModal = ::this.ShowLoginModal
    this.validate = ::this.validate
  }

  setAttribute(e) {
    let val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    if (typeof(val) != "undefined") {
      this.setState({
        [e.target.name]: val,
      })
    }
  }
  submitForgotPasswordForm() {
    if(!this.validate()) {
      return false;
    }

    axios.post(`${API_PREFIX}/auth/password`,
      {email: this.state.email, redirect_url: 'set-password'}
    )
      .then(res => {
        this.setState({page: 1});
      })
      .catch(err => {
        this.setState({forgotPwdErrMsg: err.response.data.errors.join('')})
        this.setState({emailError: true});
        //alert(err.response.data.errors.join(''));
      })
  }

  validate() {
    let error = false;
    this.setState({
      emailError: false,
    })

    if(!this.state.email || !VALID_EMAIL_REGEX.test(this.state.email)) {
      error = true;
      this.setState({emailError: true});
    }

    if (error) {
      return false;
    } else {
      return true;
    }
  }

  ShowLoginModal() {
    this.props.switchModal('LOGIN');
  }

  render() {
    return (
      <div>
        {
          this.state.page === 0
            ?
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
                    Reset Password
                  </div>
                  <div className="form-login__subtitle">
                    Please enter your email to reset your password.
                  </div>
                  <div className="form-login__subtitle">
                    <span style={{color: 'red', fontSize: '15px'}}>{this.state.forgotPwdErrMsg}</span>
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
                        />
                      </Field>
                    </div>

                    <Button
                      className="form-login__submit"
                      orange={true}
                      bigWidth={true}
                      onClick={this.submitForgotPasswordForm}
                    >
                      Reset Password
                    </Button>
                  </div>

                  <div className="form-login__subtitle">
                    <div>
                      Log In?
                      <b className="form-login__link" onClick={this.ShowLoginModal}> Click Here</b>
                    </div>
                    <div>
                      Need an Account?
                      <b className="form-login__link" onClick={this.props.onSubmit}> Submit a Request to Sign Up</b>
                    </div>
                  </div>
                </div>
              </form>
            :
              <div className="section-thanks">
                <div className="container-fluid">
                  <div className="section-thanks__content">
                    <h5>Thanks! An email has been sent with instructions on how to reset your password.</h5>
                  </div>
                </div>
              </div>
         }
      </div>


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
  )(FormForgotPassword)
)

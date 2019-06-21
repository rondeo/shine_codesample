import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import AccountPanel from 'components/AccountPanel'
import axios from 'axios'
import {
  API_PREFIX
} from '../../constants'
//import css from './style.scss'

class FormPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      currentPasswordError: false,
      newPasswordError: false,
      confirmPasswordError: false,
      successMsg: false,
      errorMsg: false,
    }

    this.validatePassword = ::this.validatePassword
    this.setAttribute = ::this.setAttribute
    this.changePassword = ::this.changePassword
  }

  setAttribute(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  validatePassword() {
    let error = false;
    this.setState({
      currentPasswordError: false,
      newPasswordError: false,
      confirmPasswordError: false,
      successMsg: false,
      errorMsg: false,
    })

    if(!this.state.currentPassword) {
      error = true
      this.setState({currentPasswordError: true})
    }
    if(!this.state.newPassword || this.state.newPassword.length < 6) {
      error = true
      this.setState({newPasswordError: true})
    }
    if(!this.state.confirmPassword || this.state.newPassword !== this.state.confirmPassword) {
      error = true
      this.setState({confirmPasswordError: true})
    }

    if (error) {
      return false
    } else {
      let pwdParams = {
        current_password: this.state.currentPassword,
        password: this.state.newPassword,
        password_confirmation: this.state.confirmPassword,
      }

      this.changePassword(pwdParams);
    }
  }

  changePassword(pwdParams) {
    axios.put(
      `${API_PREFIX}/auth/password`, pwdParams
    )
      .then(res => {
        this.setState({
          successMsg: 'Your password has been updated.'
        })

        this.setState({
          currentPassword: null,
          newPassword: null,
          confirmPassword: null,
        })
      })
      .catch(err => {
        this.setState({
          errorMsg: 'Passwords must match. Please try again.',
        })
      })
  }



  render() {
    return (
      <form className="form-password d-grid grid-double">
        <div className="form-password__wrapper">
          <div className="form-password__wrapper-left">
            <div className="form-password__item-left">
              <AccountPanel
                label="Old Password"
                placeholder=""
                input={true}
                name="currentPassword"
                type="password"
                labelBold={true}
                hasError={this.state.currentPasswordError}
                onChange={this.setAttribute}
              />
            </div>
            <div className="form-password__item-left">
              <AccountPanel
                label="New Password"
                placeholder=""
                input={true}
                name="newPassword"
                type="password"
                labelBold={true}
                hasError={this.state.newPasswordError}
                onChange={this.setAttribute}
              />
            </div>
            <div className="form-password__item-left">
              <AccountPanel
                label="Confirm New Password"
                placeholder=""
                input={true}
                name="confirmPassword"
                type="password"
                labelBold={true}
                hasError={this.state.confirmPasswordError}
                onChange={this.setAttribute}
              />
            </div>
          </div>
          <div className="form-password__wrapper-right">
            <div className="form-password__item-right">
              <div className="form-password__feedback">
                {this.state.successMsg || this.state.errorMsg}
              </div>
            </div>
            <div className="form-password__item-right">
              <div className="form-password__wrapper_button">
                <AccountPanel
                  button="Set Password"
                  submit={true}
                  bigWidth={true}
                  onClick={this.validatePassword}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

FormPassword.propTypes = {
}

export default FormPassword


import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Field from 'components/Field'
import Input from 'components/Input'
import Radio from 'components/Radio'
import Select from 'components/Select'
import Button from 'components/Button'
import GroupAccountPanel from 'components/GroupAccountPanel'
import {
  SUBJECT_OPTIONS,
} from 'utils/constants.js'
//import css from './style.scss'

class FormContactInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: props.email,
      firstName: props.firstName,
      lastName: props.lastName,
      phone: props.phone,
      studentName: props.studentName,
    }

    this.setAttribute = ::this.setAttribute
    this.submit = ::this.submit

    this.renderNameFields = ::this.renderNameFields
    this.renderPhoneFields = ::this.renderPhoneFields
    this.renderEmailFields = ::this.renderEmailFields
    this.renderStudentNameFields = ::this.renderStudentNameFields
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      email: newProps.email,
      firstName: newProps.firstName,
      lastName: newProps.lastName,
      phone: newProps.phone,
      studentName: newProps.studentName,
    })
  }

  setAttribute(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  submit() {
    let userParams = {
      email: this.state.email,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      phone_number: this.state.phone,
      student_name: this.state.studentName,
    }

    this.props.onSubmit && this.props.onSubmit(userParams)
  }

  renderNameFields() {
    return (
      this.props.editing
        ?
          <div className="double-inline-field">
            <Input
              name="firstName"
              placeholder="First Name."
              value={this.state.firstName}
              onChange={this.setAttribute}
            />
            <Input
              name="lastName"
              placeholder="Last Name."
              value={this.state.lastName}
              onChange={this.setAttribute}
            />
          </div>
        :
          this.state.firstName + " " + this.state.lastName
    )
  }
  renderPhoneFields() {
    return (
      this.props.editing
        ?
          <Input
            name="phone"
            placeholder="Phone"
            value={this.state.phone}
            onChange={this.setAttribute}
          />
        :
          this.state.phone
    )
  }
  renderEmailFields() {
    return (
      this.state.email
    )
  }
  renderStudentNameFields() {
    if (this.props.accountType !== "Learner") {
      return
    }

    return (
      this.props.editing
        ?
          <Input
            name="studentName"
            placeholder="Student Name"
            value={this.state.studentName}
            onChange={this.setAttribute}
          />
        :
          this.state.studentName
    )
  }

  render() {
    let accountItems = [
      { title: 'Name', text: this.renderNameFields(), separator: true },
      { title: 'Phone', text: this.renderPhoneFields(), separator: true },
      { title: 'Email Address', text: this.renderEmailFields(), separator: true, },
    ]
    if (this.props.accountType == "Learner") {
      accountItems.splice(
        2,
        0,
        { title: 'Student Name', text: this.renderStudentNameFields(), separator: true, },
      )
    }
    accountItems[accountItems.length-1].separator = false
    accountItems[accountItems.length-1].separatorLast = true

    return (
      <form className="form-account-settings">
        <GroupAccountPanel
          account={true}
          perLine={1}
          items={accountItems}
        />

        {
          this.props.editing
            ?
              <div className="">
                <Button
                  orange={true}
                  bigWidth={true}
                  className="form-account-settings__submit"
                  onClick={this.submit}
                >
                  Save
                </Button>
              </div>
            :
              ''
        }
      </form>
    )
  }
}

FormContactInfo.propTypes = {
}

export default FormContactInfo


import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Field from 'components/Field'
import Input from 'components/Input'
import Radio from 'components/Radio'
import Select from 'components/Select'
import Button from 'components/Button'
import {
  SUBJECT_OPTIONS,
} from 'utils/constants.js'
//import css from './style.scss'

class FormAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: this.props.user.streetAddress,
      city: this.props.user.city,
      state: this.props.user.state,
      zip: this.props.user.zip
    }
    this.setAttribute = ::this.setAttribute
    this.submit = ::this.submit
  }

  setAttribute(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  submit() {
    let userParams = {
      street_address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
    }
    this.props.onSubmit(userParams)
  }

  render() {
    return (
      <form className="form-account-settings">
       <div className="">
          <Field
            id="form-account-settings__first-name"
            label="Street Address"
          >
            <Input
              name="address"
              placeholder="Street Address"
              value={this.state.address}
              onChange={this.setAttribute}
            />
          </Field>
        </div>

        <div className="">
          <Field
            id="form-account-settings__last-name"
            label="City"
          >
            <Input
              name="city"
              placeholder="City"
              value={this.state.city}
              onChange={this.setAttribute}
            />
          </Field>
        </div>

        <div className="">
          <Field
            id="form-account-settings__email"
            label="State"
          >
            <Input
              name="state"
              placeholder="State"
              value={this.state.state}
              onChange={this.setAttribute}
            />
          </Field>
        </div>

        <div className="">
          <Field
            id="form-account-settings__email"
            label="Zip"
          >
            <Input
              name="zip"
              placeholder="Zip"
              value={this.state.zip}
              onChange={this.setAttribute}
            />
          </Field>
        </div>

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
      </form>
    )
  }
}

FormAddress.propTypes = {
}

export default FormAddress


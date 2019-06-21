import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Modal2Header from 'images/modal2.jpg'
import Button from 'components/Button'
import FieldCheckbox from 'components/FieldCheckbox'
import {Elements, StripeProvider, injectStripe, CardElement} from 'react-stripe-elements';
import axios from 'axios'

import {
  FIELDS_TIMES
} from 'utils/constants.js'


class FormAvailability extends Component {
  constructor(props) {
    super(props)
    this.state = {
      availability: [],
      name: ''
    }

    this.updateAvailability = ::this.updateAvailability
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      availability: newProps.availability
    })
  }

  updateAvailability(available) {
    //this.props.updateAvailability(available)
  }

  render() {
    return (
      <div className="form-availability">
        <div className="times">
          <div className="times__header-top">
            {
              ['M', 'Tu', 'W', 'Th', 'F'].map(day => (
                <span className="times__header-top--item">
                  {day}
                </span>
              ))
            }
          </div>
          <div className="times__header-left">
            {
              FIELDS_TIMES.map(time => (
                <span className="times__header-left--item">{time.title}</span>
              ))
            }
          </div>

          <div className="times__content">
            {
              FIELDS_TIMES.map(time => (
                <div className="times__content--row" key={time.title}>
                  {
                    ['M', 'Tu', 'W', 'Th', 'F'].map(day => (
                      <div className="times__content--item" key={`${day}--${time.title}`}>
                        <FieldCheckbox
                          transparent={true}
                          checked={this.state.availability.includes(`${day}--${time.title}`)}
                          onChange={this.props.updateAvailability(`${day}--${time.title}`)}
                          name={`${day}--${time.title}`}
                        />
                      </div>
                    ))
                  }
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

FormAvailability.propTypes = {
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser.attributes,
  }
}

export default
  connect(
    mapStateToProps,
    null,
  )(FormAvailability)



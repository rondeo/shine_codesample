import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Input from 'components/Input'
import Select from 'components/Select'
import Button from 'components/Button'
import {
  SUBJECT_OPTIONS,
  PRICE_RANGE_OPTIONS,
} from 'utils/constants'

import {
  objToQueryString
} from 'utils/url'

//import css from './style.scss'

class FormConnect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subject: '',
      zip: '',
      priceRange: '',
    }

    this.submitSearch = ::this.submitSearch
    this.setAttribute = ::this.setAttribute
  }
  componentWillReceiveProps(newProps) {
    // set subject list and any selected subject
    if (newProps.priceRange && newProps.priceRange !== this.props.priceRange) {
      let priceRangeLow = newProps.priceRange.split('-')[0]
      let selectedRate = PRICE_RANGE_OPTIONS.filter(
        r => parseInt(r.value.split('-')[0]) === parseInt(priceRangeLow)
      )[0]

      this.setState({
        priceRange: selectedRate && selectedRate.value,
      })
    }
    if (newProps.zip && newProps.zip !== this.props.zip) {
      this.setState({
        zip: newProps.zip,
      })
    }
  }

  submitSearch() {
    // keys must be snake_cased to be read from query string in PageSearch
    // - NB: no longer require hourly_rate_* keys
    let searchParams = {
      subject: this.state.subject,
      zip: this.state.zip,
      priceRange: this.state.priceRange,
      //availability: this.state.availability.slice(0,3),  // take latest 3 items
    }

    // trigger read from URL
    this.props.loadResults(searchParams)

    // update URL for refresh
    let queryStr = objToQueryString(searchParams)
    this.props.history.push(`/search?${queryStr}`)
  }
  setAttribute(attrName) {
    return (e) => {
      this.setState({
        [attrName]: e.target.value,
      })
    }
  }

  render() {
    return (
      <form
        action="/"
        className="connect"
        style={this.props.style}
      >
        <div className="connect__select connect__select--1">
          <Select
            name="subject"
            placeholder="Subject"
            value={this.props.subject}
            options={SUBJECT_OPTIONS}
            onChange={this.setAttribute('subject')}
            isBig={true}
            isLeft={true}
          />
        </div>

        <div className="connect__select connect__select--2">
          <Select
            name="price_range"
            placeholder="Price Range"
            value={this.state.priceRange}
            options={PRICE_RANGE_OPTIONS}
            onChange={this.setAttribute('priceRange')}
            isBig={true}
          />
        </div>

        <div className="connect__select connect__select--3">
          <Input
            name="findtutor-zip"
            placeholder="ZIP or City, State"
            value={this.state.zip}
            onChange={this.setAttribute('zip')}
          />
        </div>

        <div className="connect__button">
          <Button
            submit={true}
            orange={true}
            isBig={true}
            text="Match"
            style={{borderTopRightRadius: '50px', borderBottomRightRadius: '50px'}}
            onClick={this.submitSearch}
          />
        </div>
      </form>
    )
  }
}

FormConnect.propTypes = {
  searchFunc: PropTypes.func,
  zip: PropTypes.string,
  subject: PropTypes.string,
  priceRange: PropTypes.string,
}

export default withRouter(
  FormConnect
)


import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import Panel from 'components/Panel'
//import css from './style.scss'

class ApplicationThanks extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="section-thanks">
        <div className="container-fluid">
          <div className="section-thanks__content">
            <h5>
              Your application has been submitted! Please look out for a response within 3-5 business days.
            </h5>
          </div>
        </div>
      </div>
    )
  }
}

ApplicationThanks.propTypes = {
}

export default ApplicationThanks


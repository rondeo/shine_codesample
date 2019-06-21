import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import GroupBenefits from 'components/GroupBenefits'
//import css from './style.scss'

class Benefits extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <section className="shineLanding section-benefits">
        <div className="container-fluid">
          <div className="text-center">
            <h4>We Take The Guesswork Out of Finding a Tutor</h4>
            <h2>Get Matched with a Great Tutor, Satisfaction Guaranteed</h2>
          </div>
          <div className="section-benefits__benefits">
            <GroupBenefits />
          </div>
        </div>
      </section>
    )
  }
}

Benefits.propTypes = {
}

export default Benefits


import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import FormConnect from 'components/FormConnect'
import Button from 'components/Button'
import goldenGate from 'images/ben-harrit.jpg'
import {scrollToEl} from 'utils/scroll.js'
//import css from './style.scss'

class City extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

    this.scrollToTop = ::this.scrollToTop
  }

  scrollToTop() {
    scrollToEl('.guided-search', '.header')
  }

  render() {
    return (
      <section
        className="shineLanding section-city"
      >
        <div className="section-city__title container-fluid">
          <h2 className="text-white">Now Live in San Francisco!</h2>
          <h3 className="text-white">Coming soon to Los Angeles and New York City!</h3>
          <div className="section-city__connect">
            <Button
              orange={true}
              bigWidth={true}
              onClick={this.scrollToTop}
            >
              Request a Tutor
            </Button>
          </div>
        </div>
      </section>
    )
  }
}

City.propTypes = {
}

export default City


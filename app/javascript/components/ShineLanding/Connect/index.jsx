import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import FormConnect from 'components/FormConnect'
//import css from './style.scss'

class Connect extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="shineLanding section-connect">
        <div className="container">
          <div className="section-connect__connect">
            <FormConnect
            />
          </div>
        </div>
      </div>
    )
  }
}

Connect.propTypes = {
}

export default Connect


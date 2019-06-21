import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
//import css from './style.scss'

class Action extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className={`
        action
        ${this.props.orange ? 'action--orange' : ''}
      `}>
        <span className="action__circle">
          {this.props.icon}
        </span>
        <span className="action__text">
          {this.props.text}
        </span>
      </div>
    )
  }
}

Action.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string,
  orange: PropTypes.bool,
}

export default Action


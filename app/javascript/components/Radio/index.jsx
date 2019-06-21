import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
//import css from './style.scss'

class Radio extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="radio">
        <input
          type="radio"
          id={this.props.id}
          name={this.props.name}
          value={this.props.value}
          checked={this.props.checked}
          onClick={this.props.onClick}
        />
        <label
          htmlFor={this.props.id}
        >
          {this.props.label}
        </label>
      </div>
    )
  }
}

Radio.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default Radio


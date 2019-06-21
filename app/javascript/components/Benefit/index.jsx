import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Benefit extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="benefit">
        <div className="benefit__icon">
          { this.props.icon }
        </div>
        <div className="benefit__text-wrapper">
          <div className="benefit__title">{this.props.title}</div>
          <div className="benefit__text">{this.props.text}</div>
        </div>
      </div>
    )
  }
}

Benefit.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
}

export default Benefit


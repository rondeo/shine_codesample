import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
//import css from './style.scss'

class Add extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="add">
        <div
          className="add__text"
          onClick={this.props.onClick}
        > + Add More</div>
      </div>
    )
  }
}

Add.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Add


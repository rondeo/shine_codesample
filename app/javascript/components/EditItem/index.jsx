import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Pen from 'images/svg/pen'
//import css from './style.scss'

class EditItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <a
        onClick={this.props.onClick}
        className={`
          edit-item
          ${this.props.active ? 'edit-item--active' : ''}
        `}
      >
        <div className="edit-item__text">
          {this.props.text}
        </div>
        {
          this.props.icon
            ?
              <div className="edit-item__icon">
                <Pen />
              </div>
            : ''
        }
      </a>
    )
  }
}

EditItem.propTypes = {
  onClick: PropTypes.func,
}

export default EditItem


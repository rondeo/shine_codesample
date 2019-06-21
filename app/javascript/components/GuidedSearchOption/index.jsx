import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class GuidedSearchOption extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div
        className={`
          guided-search-option
          ${this.props.grey ? 'guided-search-option--grey' : ''}
        `}
        onClick={this.props.onClick}
      >
        {
          this.props.label
            ?
              <div className="guided-search-option__label-wrapper">
                <span className="guided-search-option__label">{this.props.label}</span>
              </div>
            : ''
        }
        <div className="guided-search-option__title">
          {this.props.title}
        </div>
      </div>
    )
  }
}

GuidedSearchOption.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
  title: PropTypes.string.isRequired,
  grey: PropTypes.bool,
}

export default GuidedSearchOption


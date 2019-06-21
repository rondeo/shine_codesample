import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Checkbox from 'components/Checkbox'
//import css from './style.scss'

class FieldCheckbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: !!this.props.checked,
    }

    this.onChange = ::this.onChange
  }

  componentWillReceiveProps(newProps) {
    if (newProps.checked && newProps.checked !== this.props.checked) {
      this.setState({
        checked: newProps.checked,
      })
    }
  }

  onChange(e) {
    this.props.onChange(e)
  }

  render() {
    return (
      <div
        className={`
          field-checkbox
          ${this.props.className ? this.props.className : ''}
          ${this.props.reverse ? 'field-checkbox--reverse' : ''}
          ${this.props.transparent ? 'field-checkbox--transparent' : ''}
          ${this.props.noPadding ? 'field-checkbox--noPadding' : ''}
        `}
      >
        <label
          className="field-checkbox__label"
          htmlFor={this.props.name}
        >
          { this.props.title }
        </label>
        <Checkbox
          onChange={this.onChange}
          checked={this.state.checked}
          name={this.props.name}
          hasError={this.props.hasError}
          toggle={this.props.toggle}
        />
      </div>
    )
  }
}

FieldCheckbox.defaultProps = {
  checked: false,
  reverse: false,
  transparent: false,
  noPadding: false,
  hasError: false,
  toggle: false,
}

FieldCheckbox.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  checked: PropTypes.bool,
  reverse: PropTypes.bool,
  noPadding: PropTypes.bool,
  transparent: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  hasError: PropTypes.bool,
  toggle: PropTypes.bool,
}

export default FieldCheckbox


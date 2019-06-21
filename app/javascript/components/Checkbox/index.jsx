import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
//import css from './style.scss'

class Checkbox extends Component {
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
    this.setState({
      checked: !this.state.checked,
    }, () => {
      this.props.onChange({
        target: {
          type: 'checkbox',
          checked: this.state.checked,
          value: this.state.checked,
        },
      })
    })
  }

  render() {
    return (
      <>
        <input
          type="checkbox"
          className={`
            checkbox
            ${this.props.toggle ? 'custom-checkbox-slider' : ''}
            ${this.props.hasError ? 'checkbox--error' : ''}
          `}
          id={this.props.name}
          name={this.props.name}
          checked={this.state.checked}
          onChange={this.onChange}
          value={this.state.checked}
          hasError={this.props.hasError}
        />
        <span
          className={`
            replace-checkbox
            ${this.props.hasError ? 'replace-checkbox--error' : ''}
          `}
          onClick={this.onChange}
        ></span>
      </>
    )
  }
}

Checkbox.defaultProps = {
  checked: false,
  toggle: false,
  hasError: false,
}

Checkbox.propTypes = {
  name: PropTypes.bool, // will be used as attrName by some of our setAttribute methods -- pass attrName to set in state here, if applicable
  checked: PropTypes.bool,
  toggle: PropTypes.bool,
  onChange: PropTypes.func,
  hasError: PropTypes.bool,
}

export default Checkbox


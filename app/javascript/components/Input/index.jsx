import React, {Component, Fragment} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
//import css from './style.scss'

class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentWillReceiveProps(newProps) {
    // fire onChange handlers on mount and receive props
    if (newProps.value && newProps.value !== this.props.value) {
      if (this.props.onChange) {
        this.props.onChange({ target: { value: newProps.value }})
      }
    }
  }

  render() {
    return (
      <Fragment>
        {
          this.props.charLimit && this.props.maxLength
            ?
              <div className="field__length">
                <span
                  className={`
                    js-field-length
                    ${this.props.value.length < this.props.charCount ? '' : 'field--maxlength'}
                  `}
                >
                  {this.props.value.length}
                </span>
                <span> / {this.props.charCount} </span>
              </div>
            :
              ''
        }
        {
          this.props.textarea
            ?
              <textarea
                id={this.props.id}
                maxLength={this.props.maxLength}
                style={this.props.style}
                className={`
                  input
                  input--textarea
                  ${this.props.className ? this.props.className : ''}
                  ${this.props.noBorder ? 'input--no-border' : ''}
                  ${this.props.hasError ? 'input--error' : ''}
                  ${this.props.textareaSmall ? 'input--textarea-small' : ''}
                `}
                type={this.props.type}
                name={this.props.name}
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
                onKeyDown={this.props.onKeyDown}
                value={this.props.value}
              />
            :
              <input
                id={this.props.id}
                name={this.props.name}
                type={this.props.type}
                placeholder={this.props.placeholder}
                style={this.props.style}
                onChange={this.props.onChange}
                onKeyDown={this.props.onKeyDown}
                className={
                  `
                    input
                    input-underline
                    ${this.props.className ? this.props.className : ''}
                    ${this.props.search   ? 'input--search'     : '' }
                    ${this.props.checkbox ? 'input--checkbox'   : '' }
                    ${this.props.noBorder ? 'input--no-border'  : '' }
                    ${this.props.underline ? 'input--underline'  : '' }
                    ${this.props.hasError ? 'input--error' : ''}
                  `
                }
                value={this.props.value}
              />
        }
      </Fragment>
    )
  }
}

Input.propTypes = {
  // html attrs
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  // types
  search: PropTypes.bool,
  textarea: PropTypes.bool,
  textareaSmall: PropTypes.bool,
  checkbox: PropTypes.bool,
  // styles
  noBorder: PropTypes.bool,
  underline: PropTypes.bool,
  style: PropTypes.object,
  // input props
  value: PropTypes.string,
  hasError: PropTypes.bool,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
}

Input.defaultProps = {
  type: 'text',
  hasError: false,
}

export default Input


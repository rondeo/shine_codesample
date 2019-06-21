import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
//import css from './style.scss'

class Button extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clickable: true,
    }

    this.debounced = ::this.debounced

    this.onClick = this.props.onClick
    //? this.debounced(this.props.onClick)
      ? this.props.onClick
      : false
  }

  debounced(func) {
    // TODO: extend with access to this and setState so can update button visual state when disabled
    let clickable = true

    return function(e) {
      if (!clickable || !func) {
        return
      }
      clickable = false

      // promisify
      let p
      if (!func.hasOwnProperty('then')) {
        p = Promise.resolve(func(e))
      }
      else {
        p = func
      }

      p.then(
        () => {
          clickable = true
        },
        () => {
          clickable = true
        },
      )
    }
  }

  render() {
    return (
      <a
        onClick={this.onClick ? this.onClick : false}
        disabled={this.props.disabled}
        className={
          `
            button
            ${this.props.className ? this.props.className : ''}
            ${this.props.orange ? 'button--orange' : ''}
            ${this.props.steel ? 'button--steel' : ''}
            ${this.props.blue ? 'button--blue' : ''}
            ${this.props.red ? 'button--red' : ''}
            ${this.props.redGmail ? 'button--redGmail' : ''}
            ${this.props.green ? 'button--green' : ''}
            ${this.props.steel ? 'button--steel' : ''}
            ${this.props.grey ? 'button--grey' : ''}
            ${this.props.big ? 'button--big' : ''}
            ${this.props.dark ? 'button--dark' : ''}
            ${this.props.radius ? 'button--radius' : ''}
            ${this.props.small ? 'button--small' : ''}
            ${this.props.mod ? 'button--mod' : ''}
            ${this.props.square ? 'button--square' : ''}
            ${this.props.disabled ? 'button--disabled' : ''}
            ${this.props.textTransform ? 'button--text-transform' : ''}
            ${this.props.bigWidth ? 'button--big-width' : ''}
            ${this.props.fullWidth ? 'button--full-width' : ''}
            ${this.props.transparent ? 'button--transparent' : ''}
            ${this.props.noHover ? 'button--no-hover' : ''}
            ${this.props.noBorder ? 'button--no-border' : ''}
            ${this.props.hoverMango ? 'button--hover-mango' : ''}
          `
        }
        tabIndex={0}
        style={this.props.style}
      >
        {
          !!this.props.icon
            ?
              <div className="button__icon">
                {this.props.icon}
              </div>
            :
              ''
        }
        <span className="button__text">
          {this.props.text || this.props.children}
        </span>
      </a>
    )
  }
}

Button.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.object,
  orange: PropTypes.bool,
  steel: PropTypes.bool,
  blue: PropTypes.bool,
  red: PropTypes.bool,
  green: PropTypes.bool,
  big: PropTypes.bool,
  dark: PropTypes.bool,
  radius: PropTypes.bool,
  small: PropTypes.bool,
  mod: PropTypes.bool,
  square: PropTypes.bool,
  noHover: PropTypes.bool,
  noBorder: PropTypes.bool,
  hoverMango: PropTypes.bool,
  disabled: PropTypes.bool,
  textTransform: PropTypes.bool,
  bigWidth: PropTypes.bool,
  fullWidth: PropTypes.bool,
  transparent: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.object,
  style: PropTypes.object,
}

Button.defaultProps = {
}

export default Button


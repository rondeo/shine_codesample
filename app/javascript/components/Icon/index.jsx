import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import SvgSprite from 'images/svg/sprite.inline.svg'
//import css from './style.scss'

class Icon extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
      {/*
      <SvgSprite />
      */}

    return (
      <svg
        className={`a-icon ${this.props.className} `}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <use xlinkHref={`${SvgSprite}#icon-${this.props.icon}`}></use>
      </svg>
    )
  }
}

Icon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
}

export default Icon


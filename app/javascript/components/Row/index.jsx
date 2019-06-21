import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import css from './styles.scss'

const TYPES = [
  'centered',
  'flexStart',
  'flexEnd',
  'spaceEvenly',
]

class Row extends Component {
  constructor(props) {
    super(props)
  }

  activeTypes() {
    let active = TYPES.reduce((acc, type) => {
      if (this.props[type]) {
        acc.push(`row-${type}`)
      }
      return acc
    }, [])

    return active
  }

  render() {
    return (
      <div
        className={`row ${this.activeTypes()} ${this.props.className}`}
        style={{...this.props.style}}
      >
        {
          this.props.children
        }
      </div>
    )
  }
}

export default Row

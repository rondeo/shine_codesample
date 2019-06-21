import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
//import css from './style.scss'

class SectionHead extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div
        className={`
          section-head
          ${this.props.large ? 'section-head--large' : ''}
          ${this.props.relativeHeight ? 'section-head--relativeHeight' : ''}
        `}
        style={{ backgroundImage: `url(${this.props.imageUrl}` }}
      >
        <div className="container-fluid">
          <div className="section-head__title">
            <h1>{this.props.title}</h1>
            <h3>{this.props.text}</h3>
            {
              this.props.children
            }
          </div>
        </div>
      </div>
    )
  }
}

SectionHead.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  large: PropTypes.bool,
  imageUrl: PropTypes.string,
  relativeHeight: PropTypes.bool,
}

export default SectionHead


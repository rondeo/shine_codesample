import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class CircularImage extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <div
        {...this.props}
        className={`
          circular-image
          ${this.props.className ? this.props.className : ''}
        `}
        style={{
          minWidth: this.props.width,
          minHeight: this.props.height,
          maxWidth: this.props.width,
          maxHeight: this.props.height,
          backgroundImage: `url(${this.props.imageUri})`,
          ...this.props.style,
        }}
      >
      </div>
    )
  }
}

CircularImage.defaultProps = {
}

CircularImage.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  imageUri: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
}

export default CircularImage

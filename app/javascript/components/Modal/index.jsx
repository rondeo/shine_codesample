import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import Close from 'images/svg/close'
//import css from './style.scss'

class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
  }

  render() {
    return (
      <ReactModal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onClose}
        className={`
          section-modal__content
          ${this.props.small ? 'section-modal--small' : ''}
          ${this.props.dark ? 'section-modal--dark' : ''}
        `}
        overlayClassName="section-modal"
        shouldCloseOnOverlayClick={true}
        shouldFocusAfterRender={false}
        style={this.props.style}
      >
        <div
          className="section-modal__inner-content"
          tabIndex="-1"
        >
          <div
            className={`
              section-modal__content-close
              ${this.props.closeDark ? 'section-modal__content-close--dark' : ''}
            `}
          >
            <div
              onClick={this.props.onClose}
            >
              {
                this.props.hideCloseButton
                  ?
                    ''
                  :
                    this.props.closeIcon || <Close />
              }
            </div>
          </div>
          {this.props.children}
        </div>
      </ReactModal>
    )
  }
}

Modal.defaultProps = {
  closeIcon: null,
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  small: PropTypes.bool,
  dark: PropTypes.bool,
  closeIcon: PropTypes.func,
  closeDark: PropTypes.bool,
  style: PropTypes.object,
}

export default Modal


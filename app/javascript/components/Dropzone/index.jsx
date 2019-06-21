import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import IconAttachment from 'images/svg/attachment'
// TODO: see if this works or if need to manually load DZjs to autodetect dropzones
// - https://www.dropzonejs.com/#usage
import dropzone from 'dropzone'
//import css from './style.scss'

class Dropzone extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div id="dropzone">
        <div className="dropzone needsclick" id="dropzone-upload">
          <div className="dropzone__title">
            <span>
              To attach files
              | drag & drop here
            </span>
            <span>
              or
              | select files from your computer
            </span>
          </div>
          <div className="dropzone-add">
            <IconAttachment />
            <span>Some Dropzone Lorem</span>
          </div>
        </div>
      </div>
    )
  }
}

Dropzone.propTypes = {
}

export default Dropzone


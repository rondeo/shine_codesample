import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import axios from 'axios'
//import css from './style.scss'
import {
  API_PREFIX
} from '../../constants'

class Tutor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: '',
      imageUrl: false,
    }

    this.fileChange = ::this.fileChange
    this.openUploader = ::this.openUploader
    this.previewWithoutUpload = ::this.previewWithoutUpload
  }

  componentWillMount() {
    if (this.props.avatarData && !this.state.imageUrl) {
      // read raw data as image URL
      this.previewWithoutUpload(this.props.avatarData, false)
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.avatarData && !this.state.imageUrl) {
      // read raw data as image URL
      this.previewWithoutUpload(newProps.avatarData, false)
    }

    if (newProps.imageUrl && newProps.imageUrl !== this.props.imageUrl) {
      this.setState({
        imageUrl: newProps.imageUrl,
      })
    }
  }

  openUploader() {
    $('#fileUploader').trigger('click');
  }

  previewWithoutUpload(rawFile, updateParent=false) {
    // read file for immediate display
    let reader = new FileReader()
    reader.onload = (e) => {
      let imgDataUrl = e.target.result
      this.setState(
        {
          imageUrl: e.target.result,
        },
        () => {
          // save raw file for later upload
          if (updateParent) {
            this.props.onChangeWithoutUpload && this.props.onChangeWithoutUpload(rawFile)
          }
        }
      )
    }

    reader.readAsDataURL(rawFile)
  }

  fileChange(e) {
    // get raw image file
    let rawFile = e.target.files[0]
    this.setState({
      file: rawFile,
    })

    // if only preview is desired
    if (this.props.onChangeWithoutUpload) {
      this.previewWithoutUpload(rawFile, true)
      return
    }

    // upload image as avatar
    let fileData = new FormData();
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    fileData.append('avatar', rawFile)

    return axios.post(`${API_PREFIX}/user_profiles/upload`, fileData, config)
      .then(res => {
        const avatarUrl = res.data.avatar_url
        this.setState({imageUrl: avatarUrl})

        if (this.props.onChange) {
          this.props.onChange(avatarUrl)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    let imageUrl = this.state.imageUrl || this.props.imageUrl

    return (
      <div className="tutor">
        <div className={`
          tutor__image-wrapper
          ${this.props.clickable ? 'tutor__image-wrapper--clickable' : ''}
          ${this.props.hasError ? 'tutor__image-wrapper--hasError' : ''}
        `}>
          <div
            className="tutor__image"
            style={{backgroundImage: `url(${imageUrl})`}}
            onClick={this.openUploader}
          >
          </div>
        </div>
        <div className="tutor__name">
          {this.props.name}
          {
            this.props.icon
              ? <div className="tutor__icon">{this.props.icon}</div>
              : ''
          }
        </div>
        {
          this.props.subtitle
            ? <div className="tutor__text">
                {this.props.subtitle}
                {
                  this.props.subtitleIcon
                    ? <div className="tutor__icon">{this.props.subtitleIcon}</div>
                    : ''
                }
              </div>
            : ''
        }

        <input
          className="input"
          style={{display: 'none'}}
          id="fileUploader"
          type="file"
          name="file"
          value={this.file}
          accept="image/*"
          onChange={this.fileChange} />
      </div>
    )
  }
}

Tutor.defaultProps = {
  clickable: false,
}

Tutor.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.object, // this is a component, passed through
  clickable: PropTypes.bool,
  onChange: PropTypes.func,
  hasError: PropTypes.bool,
}

export default Tutor


import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import Input from 'components/Input'
import Attachment from 'images/svg/attachment'
import Send from 'images/svg/send'
//import css from './style.scss'

class FormMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: ""
    }

    this.setAttribute = ::this.setAttribute
    this.submitMsg = ::this.submitMsg
  }

  setAttribute(e) {
    let val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    if (typeof(val) != "undefined") {
      this.setState({
        [e.target.name]: val,
      })
    }
  }

  submitMsg() {
    if(this.state.msg) {
      this.props.submitMessage(this.state.msg)
      this.setState({msg: ''})
    }
  }

  render() {
    return (
      <form className="form-message">
        <div className="form-message__write-left">
          <Input
            name="msg"
            textarea={true}
            noBorder={true}
            value={this.state.msg}
            onChange={this.setAttribute}
            placeholder="Write a message..."
          />
        </div>
        <div className="form-message__write-right">
          <div className="form-message__write-icon" style={{display: 'none'}}>
            <Attachment />
          </div>
          <div className="form-message__write-icon">
            <Send onClick={this.submitMsg}/>
          </div>
        </div>
      </form>
    )
  }
}

FormMessage.propTypes = {
}

export default FormMessage


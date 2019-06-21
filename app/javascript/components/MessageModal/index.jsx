import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import Dropzone from 'components/Dropzone'
import Field from 'components/Field'
import Input from 'components/Input'
import Select from 'components/Select'
import {connect} from 'react-redux'
import axios from 'axios'
import modalBackground from 'images/modal4'

import {
  API_PREFIX,
  VALID_EMAIL_REGEX
} from '../../constants'

import {
  registerUser
} from '../../actions'

class MessageModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      firstName: '',
      lastName: '',
      email: '',
      submissionErr: '',
      successMsg: '',
      page: 0,
    }
    this.postMessage = ::this.postMessage
    this.updateFormAttribute = ::this.updateFormAttribute
    this.validate = ::this.validate
    this.next = ::this.next
    this.sendMessage = ::this.sendMessage
    this.createAccount = ::this.createAccount

    if(!axios.defaults.headers.common['uid'] && this.props.currentUser.email) {
      axios.defaults.headers.common['uid'] = this.props.currentUser.email;
      axios.defaults.headers.common['client'] = this.props.currentUser.client;
      axios.defaults.headers.common['access-token'] =  this.props.currentUser.accessToken;
    }
  }

  next() {
    if(this.validate()) {
      this.setState({page: 1})
    }
  }

  sendMessage() {
    let messageData = {
      message: { content: this.state.message },
      recipient_id: this.props.tutorId
    }

    this.setState({submissionErr: ''});

    axios
      .post(`${API_PREFIX}/messages`,
        messageData,
        {},
      )
      .then(res => {
        this.setState(
          { 
            successMsg: this.props.currentUser.email ? 'Message Send' : 'Welcome to Shine! When   you\'re ready to start lessons, just click "Hire TUTOR" at the top of your Messages page'
          },
          () => {
            setTimeout(
              () => {
                this.props.toggleMessageModal()
              },
              2000)
            }
        )
      })
      .catch((err) => {
        this.setState({
          submissionErr: err.response.data.join(','),
        })
      })
  }

  createAccount() {
    this.setState({ submissionErr: '' });

    let learnerParams = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      type: 'Learner',
      approved: true 
    }

    this.props.registerUser(learnerParams)
      .then(res => {
        if(!axios.defaults.headers.common['uid']) {
          axios.defaults.headers.common['uid'] = this.props.currentUser.email;
          axios.defaults.headers.common['client'] = this.props.currentUser.client;
          axios.defaults.headers.common['access-token'] =  this.props.currentUser.accessToken;
        }  
        this.sendMessage()
      })
      .catch(err => {
        this.setState({ submissionErr: err.response.data.errors.full_messages });
      })
  }

  postMessage() {
    if(!this.validate()) {
      return false;
    }
    if(this.props.isSignedIn) {
      this.sendMessage();
    } else {
      this.createAccount();
    }

    let messageData = {
      message: { content: this.state.message },
      user: { 
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email
      },
      recipient_id: this.props.tutorId
    }
  }

  validate() {
    let error = false;
    this.setState({
      msgError: false,
      firstNameError: false,
      lastNameError: false,
      emailError: false,
    })

    if(!this.state.message) {
      error = true
      this.setState({msgError: true})
    }
    if(!this.props.isSignedIn && this.state.page == 1) {
      if(!this.state.firstName) {
        error = true
        this.setState({firstNameError: true})
      }
      if(!this.state.lastName) {
        error = true
        this.setState({lastNameError: true})
      }
      if(!this.state.email || !VALID_EMAIL_REGEX.test(this.state.email)) {
        error = true
        this.setState({emailError: true})
      }
    }  

    if (error) {
      return false
    } else {
      return true
    }
  }

  updateFormAttribute(e) {
    let val = e.target.type === "checkbox" ? e.target.checked : e.target.value

    this.setState({
      [e.target.name]: val,
    })
  }

  render() {
    return (
      <div className="form-lesson">
        <form className="form-container" style={{paddingTop: '25px'}}>
          <div className="form-lesson__field grid-1-2">
              <h4>Send a Message for {this.props.tutorName}</h4>
          </div>
          { 
            this.state.page == 0
            ?
              <div className="form-information__field grid-1-2">
                <div className="form-information__field grid-1-2">
                  <Field
                    label= "Message"
                  >
                    <Input
                      id="message"
                      name="message"
                      value={this.state.message}
                      textarea={true}
                      onChange={this.updateFormAttribute}
                      hasError={this.state.msgError}
                    />
                  </Field>
                </div>

                {
                  this.props.isSignedIn
                  ?
                    <div className="form-lesson__button grid-1-2">
                      <Button
                        text="Send Message"
                        orange={true}
                        fullWidth={true}
                        onClick={this.sendMessage}
                      />
                    </div>
                  :
                    <div className="form-lesson__button grid-1-2">
                      <Button
                        text="Next"
                        orange={true}
                        fullWidth={true}
                        onClick={this.next}
                      />
                    </div>
                } 
              </div>  
            :
              ''
          }    

            

            {
              !this.props.isSignedIn && this.state.page == 1
               ?
                <div className="form-information__field grid-1-2">
                  <div className="form-information__field grid-1-2">
                    <Field
                      label="First Name *"
                    >
                      <Input
                        id="first-name"
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.updateFormAttribute}
                        hasError={this.state.firstNameError}
                      />
                    </Field>
                  </div>

                  <div className="form-information__field grid-1-2">
                    <Field
                      label="Last Name *"
                    >
                      <Input
                        id="last-name"
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.updateFormAttribute}
                        hasError={this.state.lastNameError}
                      />
                    </Field>
                  </div>

                  <div className="form-information__field grid-1-2">
                    <Field
                      label="Email *"
                    >
                      <Input
                        id="last-name"
                        name="email"
                        value={this.state.email}
                        onChange={this.updateFormAttribute}
                        hasError={this.state.emailError}
                      />
                    </Field>
                  </div>
                

                  <div className="form-lesson__button grid-1-2">
                    <Button
                      text="Send Message"
                      orange={true}
                      fullWidth={true}
                      onClick={this.postMessage}
                    />
                  </div>
                </div>   
              :
                ''
            } 

          <div className="form-information__field grid-1-2">
            <span style={{color: "red"}}>{this.state.submissionErr}</span>
          </div>

          <div className="form-information__field grid-1-2">
            <span style={{color: "green"}}>{this.state.successMsg}</span>
          </div>     
        </form>
      </div>

    )
  }
}

MessageModal.propTypes = {
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: signUpData => dispatch(registerUser(signUpData)),
    toggleSignupSuccessModal: open => dispatch(toggleSignupSuccessModal(open)),
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser.attributes,
    isSignedIn: state.auth.currentUser.isSignedIn
  }
}

export default
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MessageModal)


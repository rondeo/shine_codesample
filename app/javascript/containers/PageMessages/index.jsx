import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import SectionLessons from 'components/SectionLessons'
import {Link, Route, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Elements, StripeProvider, injectStripe, CardElement} from 'react-stripe-elements';
import axios from 'axios'
import Button from 'components/Button'
import {
  API_PREFIX
} from '../../constants'
//import css from './style.scss'

class _CardForm extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = ::this.handleSubmit
    this.saveStripeToken = ::this.saveStripeToken
  }

  handleSubmit(ev) {
    ev.preventDefault();
    if (this.props.stripe) {
      this.props.stripe
        .createToken()
        .then((payload) => this.saveStripeToken(payload));
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  }

  saveStripeToken(payload) {
    if(payload.token){
      axios.put(
        `${API_PREFIX}/user_profiles/update_stripe_token`,
        { user: { stripe_token_id: payload.token.id}, recipientId: this.props.recipientId },
        {},
      )
        .then(res => {
          this.props.toggleIsHired();
          this.props.togglePaymentModal();
          this.props.setStripeAccount();
        })
    }
  }

  render() {
    return (
      <form>
        <label>
          <CardElement/>
        </label>

        <div style={{ 'marginTop': '50px' }}>
          <div style={{width: '50%', float: 'left'}}>
            <Button
              orange={true}
              mod={true}
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </div>
          <div style={{width: '50%', float: 'right', marginTop: '15px', textAlign: 'center'}}>
            <b className="form-login__link" onClick={this.props.togglePaymentModal}>
              CLOSE
            </b>
          </div>
        </div>

      </form>
    );
  }
}
const CardForm = injectStripe(_CardForm);

class PageMessages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      conversations: [],
      messages: [],
      recipientId: '',
      conversationId: 0,
      otherUserName: '',
      isHired: false,
      showPaymentModal: false,
      hasStripeAccount: this.props.currentUser.hasStripeAccount
    }

    this.fetchConversations = ::this.fetchConversations
    this.fetchMessages = ::this.fetchMessages
    this.sendMsg = ::this.sendMsg
    this.updateConversations = ::this.updateConversations
    this.updateMessages = ::this.updateMessages
    this.createHiringRequest = ::this.createHiringRequest
    this.toggleIsHired = ::this.toggleIsHired
    this.togglePaymentModal = ::this.togglePaymentModal
    this.setStripeAccount = ::this.setStripeAccount

    if(!axios.defaults.headers.common['uid']) {
      axios.defaults.headers.common['uid'] = this.props.currentUser.email;
      axios.defaults.headers.common['client'] = this.props.currentUser.client;
      axios.defaults.headers.common['access-token'] =  this.props.currentUser.accessToken;
    }
  }

  createHiringRequest() {

    if(this.state.hasStripeAccount) {
      axios.post(`${API_PREFIX}/hiring_requests`,
        { hiring_request: { tutor_id: this.state.recipientId}}, {}
      )
      .then(res => {
        this.setState({isHired: true});
      })
    } else {
      this.setState({showPaymentModal: true})
    }
  }

  setStripeAccount() {
    this.setState({hasStripeAccount: true});
  }

  toggleIsHired() {
    this.setState({isHired: !this.state.isHired});
  }

  togglePaymentModal() {
    this.setState({showPaymentModal: !this.state.showPaymentModal});
  }

  componentWillMount() {
    this.fetchConversations();
    setInterval(async () => {
      this.updateConversations();
    }, 200000)
    setInterval(async () => {
      this.updateMessages();
    }, 200000)
  }

  updateConversations() {
    axios.get(
      `${API_PREFIX}/messages`, {}, {}
    )
      .then(res => {
        this.setState({conversations: res.data});
      })
      .catch(err => {
        console.log(err)
      })
  }

  updateMessages() {
    if(this.state.conversationId) {
      axios.get(
      `${API_PREFIX}/messages/${this.state.conversationId}/conv_messages`
      )
      .then(res => {
        this.setState({messages: res.data.coversations});
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  fetchMessages(convId, recipientId) {
    if(!convId) {
      this.setState({messages: []});
      this.setState({conversationId: 0 });
      this.setState({recipientId: recipientId});
      return
    }
    this.setState({conversationId: convId});
    this.setState({recipientId: recipientId});

    return axios.get(
      `${API_PREFIX}/messages/${convId}/conv_messages`
    )
      .then(res => {
        this.setState({messages: res.data.coversations});
        this.setState({isHired: res.data.is_hired});
        this.setState({otherUserName: res.data.other_user.name});
      })
      .catch(err => {
        console.log(err)
      })
  }

  fetchConversations() {
    axios.get(
      `${API_PREFIX}/messages`, {}, {}
    )
      .then(res => {
        this.setState({conversations: res.data});
        if(res.data[0]) {
          this.setState({messages: res.data[0].messages});
          this.setState({recipientId: res.data[0].other_user.id});
          this.setState({otherUserName: res.data[0].other_user.name});
          this.setState({isHired: res.data[0].is_hired});
          this.setState({conversationId: res.data[0].id});
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  sendMsg(msg) {
    if(msg) {
      axios.post(`${API_PREFIX}/messages`,
        {message: {content: msg}, recipient_id: this.state.recipientId}, {}
      )
        .then(res => {
          this.setState({conversations: res.data.conversations});
          this.fetchMessages(res.data.message.conversation_id, this.state.recipientId)
        })
    }
  }

  render() {
    return (
      <div className="page-messages">
        {
          this.state.showPaymentModal
            ?
              <StripeProvider apiKey={this.props.currentUser.stripePublishId}>
                <div className="modal-login">

                    <div className="form-login__wrapper">
                      <div className="form-login__title"  style={{ 'paddingBottom': '50px', fontSize: '22px' }}>
                       Please Add Payment Information to Finish Hiring {this.state.otherUserName || '...'}
                      </div>
                      <div className="form-login__buttons">
                        <div className="form-login__buttons--field">
                          <Elements>
                            <CardForm
                              toggleIsHired= {this.toggleIsHired}
                              recipientId={this.state.recipientId}
                              togglePaymentModal={this.togglePaymentModal}
                              setStripeAccount={this.setStripeAccount}
                            />
                          </Elements>
                        </div>
                      </div>
                    </div>

                </div>
              </StripeProvider>
            :
              ''
        }
        <SectionLessons
          border={true}
          lessonPage={false}
          messagePage={true}
          title={this.state.otherUserName}
          conversations={this.state.conversations}
          currentConversation={this.state.conversations.filter(c => c.id === this.state.conversationId)[0]}
          messages={this.state.messages}
          fetchMessages={this.fetchMessages}
          submitMessage={this.sendMsg}
          userId={this.props.currentUser.id}
          type={this.props.currentUser.type}
          currentUserJoinDate={this.props.currentUser.createdAt}
          isHired={this.state.isHired}
          createHiringRequest={this.createHiringRequest}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser.attributes,
    isSignedIn: state.auth.currentUser.isSignedIn
  }
}

export default withRouter(
  connect(
    mapStateToProps,
  )(PageMessages)
)


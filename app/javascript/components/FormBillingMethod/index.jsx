import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import AccountPanel from 'components/AccountPanel'
import {connect} from 'react-redux'
import Modal2Header from 'images/modal2.jpg'
import Button from 'components/Button'
import {Elements, StripeProvider, injectStripe, CardElement} from 'react-stripe-elements';
import axios from 'axios'
import {
  API_PREFIX
} from '../../constants'

//import css from './style.scss'

class _CardForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonText: 'Update',
    }

    this.handleSubmit = ::this.handleSubmit
    this.saveStripeToken = ::this.saveStripeToken
    this.toggleBillingInfo = ::this.toggleBillingInfo
  }

  handleSubmit(ev) {
    ev.preventDefault();
    if (this.props.stripe) {

    this.setState({buttonText: 'Processing..'});
      this.props.stripe
        .createToken()
        .then((payload) => this.saveStripeToken(payload));
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  }

  saveStripeToken(payload) {
    this.setState({buttonText: 'Update'});
    if(payload.token) {
      this.setState({buttonText: 'Processing..'});
      axios.put(
        `${API_PREFIX}/user_profiles/update_stripe_token`,
        { user: { stripe_token_id: payload.token.id} },
        {},
      )
        .then(res => {
          this.setState({buttonText: 'Update'});
          this.props.updateCardData(res.data.user);
          this.toggleBillingInfo();
        })
    }
  }

  toggleBillingInfo() {
    this.props.toggleBillingInfo();
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
              {this.state.buttonText ? this.state.buttonText : 'Update'}
            </Button>
          </div>
          <div style={{width: '50%', float: 'right', marginTop: '15px', textAlign: 'center'}}>
            <b className="form-login__link" onClick={this.toggleBillingInfo}>
              CLOSE
            </b>
          </div>
        </div>
      </form>
    );
  }
}
const CardForm = injectStripe(_CardForm);

class FormBillingMethod extends Component {
  constructor(props) {
    super(props)
    this.state = {
      billingInfoEdit: false,
      brand: '',
      last4: '',
      buttonText: this.props.brand ? 'Update Payment Info' : 'Add Payment Info'
    }
    this.toggleBillingInfo = ::this.toggleBillingInfo
    this.updateCardData = ::this.updateCardData
  }

  componentDidUpdate(prevProps) {
    if (this.props.brand !== prevProps.brand) {
      this.setState({
        buttonText: this.props.brand ? 'Update Payment Info' : 'Add Payment Info',
      })
    }
  }

  toggleBillingInfo() {
    this.setState({billingInfoEdit: !this.state.billingInfoEdit});
  }

  updateCardData(profile) {
    this.setState({brand: profile.brand});
    this.setState({last4: profile.last4});
    this.setState({buttonText: 'Update Payment Info'});
  }

  render() {
    return (
      <div>
        {
          this.state.billingInfoEdit
            ?
              <StripeProvider apiKey={this.props.currentUser.stripePublishId}>
                <div className="modal-login">

                    <div className="form-login__wrapper">
                      <div className="form-login__title"  style={{ 'paddingBottom': '50px', fontSize: '22px' }}>
                       { this.props.brand ? 'Update Payment Info' : 'Add Payment Info' }
                      </div>
                      <div className="form-login__buttons">
                        <div className="form-login__buttons--field">
                          <Elements>
                            <CardForm
                              toggleBillingInfo= {this.toggleBillingInfo}
                              updateCardData={this.updateCardData}
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
        <form className="form-billing-method d-grid grid-double">
          {
            this.props.brand || this.state.brand
              ?
                <div className="form-billing-method__wrapper">
                  <AccountPanel
                    title={this.state.brand ? this.state.brand : this.props.brand}
                    text={`**** **** **** ${this.state.last4 || this.props.last4 || '****'}`}
                  />
                </div>
              :
                ''
          }
          <div className="form-billing-method__wrapper">
            <AccountPanel
              button={this.state.buttonText}
              onClick={this.toggleBillingInfo}
            />
          </div>
        </form>
      </div>
    )
  }
}

FormBillingMethod.propTypes = {
  brand: PropTypes.string,
  last4: PropTypes.string,
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser.attributes,
  }
}

export default
  connect(
    mapStateToProps,
    null,
  )(FormBillingMethod)



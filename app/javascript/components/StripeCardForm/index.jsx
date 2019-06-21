import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Row from 'components/Row'
import Dialog, {DialogTitle,DialogContent,DialogActions} from 'material-ui/Dialog'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import css from './styles.scss'
import {
  CardElement,
  Elements,
  injectStripe,
  FormWithInjectStripe,
} from 'react-stripe-elements';



class StripeCardForm extends Component  {
  constructor(props) {
    super(props)
    this.state = {
      submitDisabled: false,
      paymentError: null,
      paymentComplete: false,
      token: null
    }

    this.submitCreditCardInfo = ::this.submitCreditCardInfo;
    if (Stripe) {
      Stripe.setPublishableKey('pk_test_tEwtuO1w0AFlO4aNpNvUNkdo');
    }
  }

  submitCreditCardInfo(event) {
    var self = this;
    event.preventDefault();
    this.setState({ submitDisabled: true, paymentError: null });
    // send form here
    Stripe.createToken(event.target, function(status, response) {
      if (response.error) {
        self.setState({ paymentError: response.error.message, submitDisabled: false });
      }
      else {
        self.setState({ paymentComplete: true, submitDisabled: false, token: response.id });
        // make request to your server here!
      }
    });
  }

  render() {
    return (
      <div className={css.root}>
        <div className="checkout">
          <Dialog
            open={true}
            ignoreBackdropClick
          >
            <DialogTitle>

            </DialogTitle>

            <DialogContent>
              <Row>
              </Row>
            </DialogContent>
            <DialogActions>
              <Row>
                <Button
                  raised
                  color="secondary"
                  // onClick={() => this.toggleMessageModal(false)}
                  style={{
                    margin: '0 6px',
                  }}
                >
                  Close
                </Button>

              </Row>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default injectStripe(StripeCardForm);

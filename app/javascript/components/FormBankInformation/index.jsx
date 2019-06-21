import React, {Component} from 'react'
import {connect} from 'react-redux'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import AccountPanel from 'components/AccountPanel'
import axios from 'axios'
import {
  API_PREFIX
} from '../../constants'

class FormBankInformation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dashboardUrl: '',
    }

    this.redirectToStripeExpress = ::this.redirectToStripeExpress
    this.fetchStripeDashboardUrl == ::this.fetchStripeDashboardUrl
  }

  componentWillMount() {
    this.fetchStripeDashboardUrl();
  }

  fetchStripeDashboardUrl() {
    axios.get(
      `${API_PREFIX}/user_profiles/stripe_dashboard_url`, {}, {}
    )
      .then(res => {
        this.setState({dashboardUrl: res.data.dashboard_url});
      })
      .catch(err => {
        console.log(err)
      })
  }

  redirectToStripeExpress() {
    if(this.props.user.hasStripeAccount) {
      //window.location = this.state.dashboardUrl;
      window.open(this.state.dashboardUrl,'_blank');
    } else {
      var randomNumber = Math.floor(new Date().valueOf() * Math.random());
      let tutorParams = { express_state: randomNumber }

      axios.put(
        `${API_PREFIX}/user_profiles/${this.props.user.id}`, { user: tutorParams }
      )
      .then(res => {
        window.location = `${this.props.currentUser.stripeExpressOauthUrl}?redirect_uri=${this.props.currentUser.stripeExpressOauthRedirectUrl}&client_id=${this.props.currentUser.stripeClientId}&state=${randomNumber}&suggested_capabilities[]=platform_payments`
      })
    }
  }

  render() {
    return (
      <form className="form-bank-information d-grid grid-double">
        <div className="form-bank-information__wrapper">
          <div className="form-bank-information__title">
            {this.props.user.hasStripeAccount ? 'Your bank account is confirmed.' : 'Add your bank account to receive payments.' }
          </div>

          <AccountPanel
            button={this.props.user.hasStripeAccount ? 'View Stripe Dashboard' : 'Set Bank Account'}
            bigWidth={true}
            textTransform={true}
            onClick={this.redirectToStripeExpress}
          />
        </div>
      </form>
    )
  }
}

FormBankInformation.propTypes = {
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
  )(FormBankInformation)




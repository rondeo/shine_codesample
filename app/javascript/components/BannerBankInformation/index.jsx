import React, {Component} from 'react'
import {connect} from 'react-redux'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {Link, withRouter} from 'react-router-dom'
import Notification from 'images/svg/notification'
import Close from 'images/svg/close'
import axios from 'axios'
import {
  API_PREFIX
} from '../../constants'

class BannerBankInformation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hidden: false,
    }

    if(!axios.defaults.headers.common['uid']) {
      axios.defaults.headers.common['uid'] = this.props.currentUser.email;
      axios.defaults.headers.common['client'] = this.props.currentUser.client;
      axios.defaults.headers.common['access-token'] =  this.props.currentUser.accessToken;
    }

    this.redirectToStripeExpress = ::this.redirectToStripeExpress
    this.hideBanner = ::this.hideBanner
    this.shouldHideBanner = ::this.shouldHideBanner
    this.isHiddenBannerPage = ::this.isHiddenBannerPage
    this.redirectToAccountPage = ::this.redirectToAccountPage
    this.hasCompletedProfile = ::this.hasCompletedProfile
    this.hasValidHourlyRate = ::this.hasValidHourlyRate
  }

  hideBanner(e) {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    this.setState({
      hidden: true,
    })
  }

  isHiddenBannerPage() {
    // currently, hide on set-password page so banner does not derail onboarding Tutor from setting password
    return window.location.pathname.includes("/set-password")
  }

  shouldHideBanner() {
    // hide if
    // - hidden
    // - has all required attributes
    return (
      this.state.hidden ||
      (
        this.props.currentUser.hasStripeAccount &&
        this.hasCompletedProfile() ||
        this.isHiddenBannerPage()
      )
    )
  }

  hasCompletedProfile() {
    return (
      this.props.currentUser.imageUrl &&
      this.hasValidHourlyRate()
    )
  }

  hasValidHourlyRate() {
    return (
      !!this.props.currentUser.hourlyRateCents &&
      parseInt(this.props.currentUser.hourlyRateCents) > 0    // hourlyRateCents integer column returns 0 when nil
    )
  }

  redirectToAccountPage() {
    this.props.history.push('/account')
  }

   redirectToStripeExpress() {
    if(this.props.currentUser.hasStripeAccount) {
      window.location = 'https://dashboard.stripe.com/';
    } else {
      var randomNumber = Math.floor(new Date().valueOf() * Math.random());
      let tutorParams = { express_state: randomNumber }

      axios.put(
        `${API_PREFIX}/user_profiles/${this.props.currentUser.id}`, { user: tutorParams }
      )
      .then(res => {
        window.location = `${this.props.currentUser.stripeExpressOauthUrl}?redirect_uri=${this.props.currentUser.stripeExpressOauthRedirectUrl}&client_id=${this.props.currentUser.stripeClientId}&state=${randomNumber}`
      })
    }
  }

  render() {
    return (
      <div
        className={`
          bannerBankInformation
          ${this.shouldHideBanner() ? 'bannerBankInformation--hidden' : ''}
        `}
        onClick={this.props.currentUser.hasStripeAccount ? this.redirectToAccountPage : this.redirectToStripeExpress}
      >
        <Notification className="bannerBankInformation__notification" />
        {
          // does not have Stripe account
          !this.props.currentUser.hasStripeAccount
            ?
              'Your account is almost ready. Click here to complete your payment info and start receiving inquiries from parents!'
            :
              ''
        }
        {
          // has stripe account but not completed profile
          this.props.currentUser.hasStripeAccount && !this.hasCompletedProfile()
            ?
              `Complete your ${!this.props.currentUser.imageUrl ? 'Profile Picture' : ''} ${(!this.props.currentUser.imageUrl && !this.hasValidHourlyRate()) ? ' and ' : ''} ${!this.hasValidHourlyRate() ? 'Hourly Rate' : ''} to start getting tutoring requests from parents!`
            :
              ''
        }
        <Close className="bannerBankInformation__close" onClick={this.hideBanner} />
      </div>
    )
  }
}

BannerBankInformation.propTypes = {
  hidden: false,
}

BannerBankInformation.propTypes = {
  hidden: PropTypes.bool,
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser.attributes,
  }
}

export default
  withRouter(
    connect(
      mapStateToProps,
      null,
    )(BannerBankInformation)
  )


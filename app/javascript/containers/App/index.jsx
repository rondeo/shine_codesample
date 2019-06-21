import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {Link, Route, Redirect, withRouter} from 'react-router-dom'

import baseLoadable from '@loadable/component'
const Loading = () => (
  <div style={{width: '100%', display: 'flex', height: '100vh', justifyContent: 'center', backgroundColor: 'yellow'}}>
    ... Loading ...
  </div>
)
// custom `loadable` function with default fallback component
function loadable(importFunc) {
  return baseLoadable(
    importFunc,
    { fallback: Loading, }
  )
}
// loadable components
const PageLanding = loadable(() => import('components/ShineLanding'))
const PageAboutUs = loadable(() => import('containers/AboutUs'))
const PageApplication = loadable(() => import('containers/PageApplication'))
const PageSearch = loadable(() => import('containers/PageSearch'))
const PageProfile = loadable(() => import('containers/PageProfile'))
const PageAccountTutor = loadable(() => import('containers/PageAccountTutor'))
const PageAccountParent = loadable(() => import('containers/PageAccountParent'))
const PageMessages = loadable(() => import('containers/PageMessages'))
const PageLessons = loadable(() => import('containers/PageLessons'))
const PageLessonTutors = loadable(() => import('containers/PageLessonTutors'))
const PageReference = loadable(() => import('containers/PageReference'))
const PageSetPassword = loadable(() => import('containers/PageSetPassword'))
const PageTermsOfService = loadable(() => import('containers/PageTermsOfService'))
const PagePrivacyPolicy = loadable(() => import('containers/PagePrivacyPolicy'))
const StripeExpressOauthCallback = loadable(() => import('containers/StripeExpressOauthCallback'))
const BannerBankInformation = loadable(() => import('components/BannerBankInformation'))

// permanent components
import Header from 'components/Header'
import Footer from 'components/Footer'

// set up react-dates at top of app... :/
// - TODO: can be moved to indiv components since we now have code splitting
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidUpdate(prevProps) {
    // global route change hook
    if (this.props.location.pathname !== prevProps.location.pathname) {
      // update intercom state if this is an intercom page
      window.Intercom && window.Intercom("update");

      // render at top of new page
      window.scrollTo(0,0)
    }
  }

  render() {
    return (
      <div id="app-root">
        <Header />
        {
          this.props.isSignedIn &&
            this.props.currentUser.type == 'Teacher'
            ?
              <BannerBankInformation />
            :
              ''
        }

        <div className={`
          main-content
          main-content--no-margin
        `}>

          <Route exact path="/" component={PageLanding} />
          <Route exact path="/about-us" component={PageAboutUs} />
          <Route exact path="/set-password" component={PageSetPassword} />
          <Route exact path="/terms-of-service" component={PageTermsOfService} />
          <Route exact path="/privacy-policy" component={PagePrivacyPolicy} />
          <Route exact path="/tutor-with-us" render={() => (
            /*
            this.props.isSignedIn
              ?
                <Redirect to={"/tutor/" + this.props.currentUser.id} />
              :
              */
                <PageApplication />
          )} />
          <Route path="/search" component={PageSearch} />
          <Route path="/messages" render={() => (
            !this.props.isSignedIn
              ?
                <Route path="/" component={PageLanding} />
              :
                <PageMessages />
          )} />
          <Route exact path="/public-profile" render={() => (
            !this.props.isSignedIn || !this.props.currentUser.type === "Teacher"
              ?
                <Redirect to="/tutor-with-us" />
              :
                <PageProfile />
          )} />
          <Route exact path="/tutor/:id" component={PageProfile} />
          <Route exact path="/tutor/:id/new-reference" component={PageReference} />
          <Route path="/stripe_express_oauth" component={StripeExpressOauthCallback} />
          <Route exact path="/account" render={() => (
            this.props.isSignedIn
              ?
                this.props.currentUser.type === 'Teacher'
                  ? <PageAccountTutor />
                  : <PageAccountParent />
              :
                <Route path="/" component={PageLanding} />
          )} />
          <Route path="/lessons" render={() => (
            this.props.isSignedIn
              ?
                this.props.currentUser.type === 'Teacher'
                  ? <PageLessonTutors />
                  : <PageLessons />
              :
                <Route path="/" component={PageLanding} />
          )} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser.attributes,
    //currentUser: {type: 'Teacher'},
    isSignedIn: state.auth.currentUser.isSignedIn,
  }
}


export default withRouter(
  connect(
    mapStateToProps,
    null,
  )(App)
)

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, Route, Redirect, withRouter} from 'react-router-dom'
import ArrowDown from 'images/svg/arrow-down'

//import css from './style.module.scss'

import {
  togglePostingModal,
  signOutUser,
} from '../../actions'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

    this.toggleProfileMenu = ::this.toggleProfileMenu
    this.closeProfileMenu = ::this.closeProfileMenu
    this.logOut = ::this.logOut
  }

  logOut() {
    console.log("logging out!")
    this.props.signOutUser()
      .then(res => {
        this.props.history.push('/');
      })
  }

  componentDidMount() {
    this.DOM = {
      $profile: document.querySelector('.js-profile'),
      $body: document.querySelector('body'),
    }

    this.DOM.$body.addEventListener('click', (e) => {
      if (e.target.closest('.js-profile')) {
        this.toggleProfileMenu()
      }
      else {
        this.closeProfileMenu()
      }
    })
  }

  toggleProfileMenu() {
    this.DOM.$profile.classList.toggle('opened')
  }
  closeProfileMenu() {
    this.DOM.$profile.classList.remove('opened')
  }

  render() {
    return (
      <div className={`
        profile
        js-profile
        ${this.props.opened ? 'profile--opened' : ''}
      `}
      >
        <div className="profile__trigger">
          <span className="profile__text">
            {this.props.currentUser.firstName}
          </span>
          <div className="profile__icon">
            <ArrowDown />
          </div>
        </div>
        <div className="profile__content">
          <a onClick={this.logOut}>Log Out</a>
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  opened: PropTypes.bool,
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser.attributes,
    isSignedIn: state.auth.currentUser.isSignedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOutUser: () => dispatch(signOutUser()),
    openPostingModal: () => dispatch(togglePostingModal(true)),
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Profile)
)

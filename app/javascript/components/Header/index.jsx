import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Button from 'components/Button'
import FormLogin from 'components/FormLogin'
import FormForgotPassword from 'components/FormForgotPassword'
import Modal from 'components/Modal'
import Navbar from 'components/Navbar'
import NavbarLogged from 'components/NavbarLogged'
import Profile from 'components/Profile'
import Hamburger from 'images/svg/hamburger'
import Close from 'images/svg/close'
import logo from 'images/logo.png'

const MODAL_SIGNUP = 'SIGNUP'
const MODAL_LOGIN  = 'LOGIN'
const MODAL_FORGOT_PASSWORD  = 'FORGOT_PASSWORD'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fakeLogin: false,
      modalId: null,
    }

    this.DOM = {}

    this.toggleLogin = ::this.toggleLogin
    this.triggerSignupModal = ::this.triggerSignupModal
    this.triggerLoginModal = ::this.triggerLoginModal
    this.closeModal = ::this.closeModal

    this.changeModal = ::this.changeModal

    this.closeMenu = ::this.closeMenu
    this.openMenu = ::this.openMenu
  }
  toggleLogin() {
    this.setState({
      fakeLogin: !this.state.fakeLogin
    })
  }
  // UI state
  triggerSignupModal() {
    this.setState({
      modalId: MODAL_SIGNUP,
    })
  }
  triggerLoginModal() {
    this.setState({
      modalId: MODAL_LOGIN,
    })
  }
  closeModal() {
    this.setState({
      modalId: null,
    })
  }

  changeModal(modal) {
    this.setState({
      modalId: modal,
    })
  }

  componentDidMount() {
    // DOM
    this.DOM = {
      $header: document.querySelector('.js-header'),
      $hamburger: document.querySelector('.js-menu-hamburger'),
      $menu: document.querySelector('.js-menu'),
      $closeMenu: document.querySelector('.js-menu-close')
    }

    /*
    window.addEventListener('scroll', (e) => {
      window.scrollY > 0
        ? this.DOM.$header.classList.add('header--scrolled')
        : this.DOM.$header.classList.remove('header--scrolled')
    })
    */

    this.DOM.$hamburger.addEventListener('click', () => { this.openMenu() })
    this.DOM.$closeMenu.addEventListener('click', () => { this.closeMenu() })
  }

  openMenu() {
    this.DOM.$menu.classList.add('opened')
  }
  closeMenu () {
    this.DOM.$menu.classList.remove('opened')
  }

  render() {
    return (
      <div className={`
        header
        js-header
        header--scrolled
        ${this.props.loggedIn || this.state.fakeLogin ? 'header--logged' : ''}
        ${this.props.border ? 'header--border' : ''}
      `}>
        <div>
          <div className={`
            header__container
            ${this.props.loggedIn || this.state.fakeLogin ? 'container-fluid' : ''}
          `}>
            <Link to="/" className="header__logo">
              <img src={logo} />
            </Link>
            <div className="header__hamburger js-menu-hamburger">
              <Hamburger />
            </div>

            {
              this.props.loggedIn || this.state.fakeLogin
                ?
                <div className="header__menu js-menu"
                  onClick={this.closeMenu}
                >
                    <NavbarLogged
                      items={[
                        {text: 'Find a Tutor', notification: false, href: '/',},
                        {text: 'Messages', notification: false, href: '/messages'},
                        {text: 'Lessons', notification: false, href: '/lessons'},
                        {text: 'Account', notification: false, href: '/account'},
                      ]}
                    />

                    <div className="header__menu-close js-menu-close">
                      <Close />
                    </div>
                  </div>
                :
                  <div className="header__menu js-menu"
                    onClick={this.closeMenu}
                  >
                    <div className="header__navbar">
                      <Navbar
                      />
                    </div>
                    <div className="header__button">
                      <a
                        className="button button--dark"
                        onClick={this.triggerLoginModal}
                      >
                        <span>LOG IN</span>
                      </a>
                    </div>
                    <div className="header__menu-close js-menu-close">
                      <Close />
                    </div>
                  </div>
            }
          </div>
          {
            this.props.loggedIn || this.state.fakeLogin
              ?
                <div className="header__profile">
                  <Profile />
                </div>
              :
                ''
          }
        </div>
        <div className="header-spacer">
        </div>

        {
          /*
           * For testing!
            <div style={{
              position: 'absolute',
              top: 100,
              left: 10,
              zIndex: 10000,
            }}>
              <button onClick={this.toggleLogin}>
                Click!
              </button>
            </div>
          */
        }

        <Modal
          id={MODAL_LOGIN}
          isOpen={this.state.modalId == MODAL_LOGIN}
          onClose={this.closeModal}
        >
          <div className="modal-login">
            <FormLogin
              style={{ 'zIndex': 200 }}
              mode={this.state.modalId}
              onSubmit={this.closeModal}
              switchModal={this.changeModal}
            />
          </div>
        </Modal>

        <Modal
          id={MODAL_FORGOT_PASSWORD}
          isOpen={this.state.modalId == MODAL_FORGOT_PASSWORD}
          onClose={this.closeModal}
        >
          <div className="modal-login">
            <FormForgotPassword
              style={{ 'zIndex': 200 }}
              mode={this.state.modalId}
              onSubmit={this.closeModal}
              switchModal={this.changeModal}
            />
          </div>
        </Modal>
      </div>
    )
  }
}

Header.defaultProps = {
}

Header.propTypes = {
  loggedIn: PropTypes.bool,
  border: PropTypes.bool,
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.currentUser.attributes.accessToken,
    currentUserId: state.auth.currentUser.id,
  }
}

export default connect(
  mapStateToProps,
  null,
)(Header)

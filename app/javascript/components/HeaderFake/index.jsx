import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Button from 'components/Button'
import CircularImage from 'components/CircularImage'
import logo from 'images/logo.png'

class HeaderFake extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fakeLogin: false,
      modalId: null,
    }

    this.DOM = {}
    this.openMenu = ::this.openMenu
    this.closeMenu = ::this.closeMenu
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
        header--logged
        header--fake
      `}>
        <div>
          <div className={`
            header__container
            container-fluid
          `}>
            <Link to="/" className="header__logo">
              <img src={logo} />
            </Link>
            <div className="image-header">
              <CircularImage
                imageUri="/images/mini-tutor-guide.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

HeaderFake.defaultProps = {
}

HeaderFake.propTypes = {
  border: PropTypes.bool,
}

export default HeaderFake

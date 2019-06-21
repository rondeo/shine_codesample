import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import logoWhite from 'images/logo-white.png'
import {Link} from 'react-router-dom'
//import css from './style.scss'

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="footer">
        <div className="container-fluid">
          <div className="footer__content">
            <Link to="/" className="footer__logo">
              <img src={logoWhite} />
            </Link>
            <div className="footer__text">We created Shine to help the best tutors find the best students, because people learn better from someone who cares. Join us.</div>
            <div className="footer__navbar footer__navbar--1">
              <div className="footer-navbar">
                <div className="footer-navbar__title">For Parents</div>
                <nav className="footer-navbar__navbar">
                  <Link to="/" className="footer-navbar__item">Find a Great Tutor</Link>
                  <Link to="/blog" className="footer-navbar__item">Our Blog</Link>
                </nav>
              </div>
            </div>
            <div className="footer__navbar footer__navbar--2">
              <div className="footer-navbar">
                <div className="footer-navbar__title">For Tutors</div>
                <nav className="footer-navbar__navbar">
                  <Link to="/tutor-with-us" className="footer-navbar__item">Tutor with Us</Link>
                  <Link to="/" className="footer-navbar__item">About Us</Link>
                </nav>
              </div>
            </div>
            <div className="footer__navbar footer__navbar--3">
              <div className="footer-navbar">
                <div className="footer-navbar__title">Shine</div>
                <nav className="footer-navbar__navbar">
                  <Link to="/about-us" className="footer-navbar__item">Our Story</Link>
                  <Link to="/terms-of-service" className="footer-navbar__item">Terms & Conditions</Link>
                  <Link to="/privacy-policy" className="footer-navbar__item">Privacy Policy</Link>
                </nav>
              </div>
            </div>
            <div className="footer__copyright">
              <span>Copyright &copy; 2018 Shine Tutors. All Rights Reserved.</span>
              <a href="https://heapanalytics.com/?utm_source=badge" rel="nofollow"><img style={{width:'108px',height:'41px'}} src="//heapanalytics.com/img/badge.png" alt="Heap | Mobile and Web Analytics" /></a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Footer.propTypes = {
}

export default Footer


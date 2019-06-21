import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
//import css from './style.scss'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <nav>
        <ul className="navbar">
          <li className="navbar__item">
            <Link to="/about-us" className="navbar__link">Who We Are</Link>
          </li>
          <li className="navbar__item">
            <Link to="/" className="navbar__link">Find A Tutor</Link>
          </li>
          <li className="navbar__item">
            <Link to="/tutor-with-us" className="navbar__link">Become a Tutor</Link>
          </li>
        </ul>
      </nav>
    )
  }
}

Navbar.propTypes = {
}

export default Navbar


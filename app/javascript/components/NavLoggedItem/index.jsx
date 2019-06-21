import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import IconTooltip from 'components/IconTooltip'
//import css from './style.scss'

class NavLoggedItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <li className="navbar-logged-item">
        <Link to={this.props.href} className="navbar-logged-item__link">{this.props.text}</Link>
        {
          !!this.props.notification
            ?
              <div className="navbar-logged-item__notification">
                <IconTooltip
                  notification={true}
                  text="Set your rate!"
                />
              </div>
            :
              ''
        }
      </li>
    )
  }
}

NavLoggedItem.propTypes = {
  notification: PropTypes.bool,
  text: PropTypes.string,
  href: PropTypes.string,
}

export default NavLoggedItem


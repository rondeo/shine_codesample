import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import NavLoggedItem from 'components/NavLoggedItem'
//import css from './style.scss'

class NavbarLogged extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <ul className="navbar-logged">
        {
          this.props.items.map(item => (
            <NavLoggedItem
              key={item.text}
              text={item.text}
              href={item.href}
              notification={item.notification}
            />
          ))
        }
      </ul>
    )
  }
}

NavbarLogged.propTypes = {
  items: PropTypes.array,
}

export default NavbarLogged


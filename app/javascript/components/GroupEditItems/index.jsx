import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import EditItem from 'components/EditItem'
//import css from './style.scss'

class GroupEditItems extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIdx: 0,
      navItems: [],
    }

    this.defaultItems = ::this.defaultItems
  }

  componentDidMount() {
    let navItems = this.defaultItems()
    this.setState({
      navItems: navItems,
    })
  }

  scrollToId(id, itemIdx) {
    // get el offset position
    let el = document.getElementById(id)
    let offset = 100;
    let bodyRect = document.body.getBoundingClientRect().top;
    let elementRect = el.getBoundingClientRect().top;
    let elementPosition = elementRect - bodyRect;
    let offsetPosition = elementPosition - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })

    this.setState({
      activeIdx: itemIdx,
    })
  }

  defaultItems() {
    return [
      {
        text: 'Account',
        icon: true,
        scrollId: this.props.accountSectionId,
      },
      {
        text: 'Payments',
        icon: true,
        scrollId: this.props.billingSectionId,
      },
      {
        text: 'Password',
        icon: true,
        scrollId: this.props.passwordSectionId,
      },
      {
        text: 'Neighborhood',
        icon: true,
        scrollId: this.props.locationSectionId,
      },
    ]
  }

  render() {
    return (
      <nav className="group-edit-items">
        <div className="group-edit-items__item">
          {
            this.state.navItems.map((i, idx) => (
              <EditItem
                key={idx}
                text={i.text}
                icon={i.icon}
                active={idx === this.state.activeIdx}
                onClick={this.scrollToId.bind(this, i.scrollId, idx)}
              />
            ))
          }
        </div>
      </nav>
    )
  }
}

GroupEditItems.propTypes = {
}

export default GroupEditItems


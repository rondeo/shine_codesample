import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import AccountPanel from 'components/AccountPanel'
//import css from './style.scss'

class GroupAccountPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className={`
        group-account-panel
        ${this.props.bordered ? 'group-account-panel--bordered' : ''}
        ${this.props.account ? 'd-grid grid-double' : ''}
        ${this.props.mod ? 'group-account-panel--mod' : ''}
        ${this.props.perLine === 2 ? 'group-account-panel--perLineTwo' : ''}
        ${this.props.perLine === 3 ? 'group-account-panel--perLineThree' : ''}
        ${this.props.perLine === 4 ? 'group-account-panel--perLineFour' : ''}
      `}>
        {
          this.props.items.map((item, itemIdx) => (
            <div
              className="group-account-panel--item"
              key={item.title}
            >
              <AccountPanel
                title={item.title}
                text={item.text}
                uppercase={item.uppercase}
                separator={item.separator}
                separatorLast={item.separatorLast}
              />
            </div>
          ))
        }
      </div>
    )
  }
}

GroupAccountPanel.defaultProps = {
  perLine: 1,
}

GroupAccountPanel.propTypes = {
  items: PropTypes.array.isRequired,
  bordered: PropTypes.bool,
  account: PropTypes.bool,
  mod: PropTypes.bool,
  perLine: PropTypes.number,
}

export default GroupAccountPanel


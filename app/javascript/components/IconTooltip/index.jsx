import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Notification from 'images/svg/notification'
//import css from './style.scss'

class IconTooltip extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    this.DOM = {
      $tooltip: Array.from(document.querySelectorAll('.js-tooltip'))
    }

    this.DOM.$tooltip.forEach((item, i) => {
      item.addEventListener('click', (e) => {
        e.stopPropagation()
        this.hideTooltips()
        this.toggleTooltip(i)
      })
    })

    window.addEventListener('click', () => { this.hideTooltips() })
  }

  hideTooltips () {
    this.DOM.$tooltip.forEach(item => item.classList.remove('opened'))
  }
  toggleTooltip (index) {
    this.DOM.$tooltip[index].classList.toggle('opened')
  }

  render() {
    return (
      <div className="icon-tooltip js-tooltip">
        <div className="icon-tooltip__icon js-tooltip-trigger">
          {
            !!this.props.notification
              ?
                <Notification />
              :
                ''
          }
        </div>
        <div className="icon-tooltip__tooltip js-tooltip-content opened">
          { this.props.text }
        </div>
      </div>
    )
  }
}

IconTooltip.propTypes = {
  text: PropTypes.string,
  notification: PropTypes.bool,
}

export default IconTooltip


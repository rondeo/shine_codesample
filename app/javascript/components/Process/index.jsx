import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Process1 from 'images/svg/process-1'
import Process2 from 'images/svg/process-2'
import Process3 from 'images/svg/process-3'
import Process4 from 'images/svg/process-4'
//import css from './style.scss'

class Process extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

    switch (this.props.icon) {
      case 'process-1':
        this.icon = <Process1 />
        return
      case 'process-2':
        this.icon = <Process2 />
        return
      case 'process-3':
        this.icon = <Process3 />
        return
      case 'process-4':
        this.icon = <Process4 />
        return
    }
  }

  render() {
    return (
      <div className="process">
        <div className="process__icon">
          {
            this.icon
          }
        </div>
        <div className="process__content">
          <div className="process__title">{this.props.title || "Title!"}</div>
          <div className="process__text">{this.props.text || "Lorem!"}</div>
        </div>
      </div>
    )
  }
}

Process.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default Process


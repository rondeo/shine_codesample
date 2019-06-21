import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
//import css from './style.scss'

class Subpanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="subpanel">
        {
          this.props.title
            ?
              <div className="subpanel__title">
                {this.props.title}
                {
                  this.props.count
                    ?
                      <div className="subpanel__title-count">
                        {this.props.count}
                      </div>
                    :
                      ''
                }
              </div>
            :
              ''
        }
        <div className="subpanel__content">
          { this.props.children }
        </div>
      </div>
    )
  }
}

Subpanel.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number,
}

export default Subpanel


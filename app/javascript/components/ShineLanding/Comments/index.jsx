import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import GroupComment from 'components/GroupComment'
//import css from './style.scss'

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <section className="shineLanding section-comments">
        <div className="container-fluid">
          <div className="section-comments__title">
            <h4>Folks Love Our Work</h4>
            <h2>What Parents Say</h2>
          </div>
        </div>
        <div className="section-comments__comments">
          <GroupComment
          />
        </div>
      </section>
    )
  }
}

Comments.propTypes = {
}

export default Comments


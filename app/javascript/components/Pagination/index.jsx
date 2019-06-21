import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import LeftArrow from 'images/svg/left-arrow'
import RightArrow from 'images/svg/right-arrow'
//import css from './style.scss'

class Pagination extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="pagination">
        <div className="pagination__button">
          <LeftArrow />
        </div>
        <div className="pagination__button">
          <RightArrow />
        </div>
      </div>
    )
  }
}

Pagination.propTypes = {
}

export default Pagination


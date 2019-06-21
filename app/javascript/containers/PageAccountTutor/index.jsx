import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import SectionAccount from 'components/SectionAccount'
import {connect} from 'react-redux'
import axios from 'axios'

class PageAccountTutor extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

    console.log("AXIOS HEADERS")
    console.log(axios.defaults.headers.common)
  }

  render() {
    return (
      <div className="page-account">
        <SectionAccount
          accountTutor={true}
        />
      </div>
    )
  }
}

PageAccountTutor.propTypes = {
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser.attributes
  }
}

export default connect(
  mapStateToProps,
  null,
)(PageAccountTutor)




import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import SectionAccount from 'components/SectionAccount'
import {connect} from 'react-redux'
import axios from 'axios'

//import css from './style.scss'

class PageAccountParent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }

    if(!axios.defaults.headers.common['uid']) {
      axios.defaults.headers.common['uid'] = this.props.currentUser.email;
      axios.defaults.headers.common['client'] = this.props.currentUser.client;
      axios.defaults.headers.common['access-token'] =  this.props.currentUser.accessToken;
    }
  }

  render() {
    return (
      <div className="page-account">
        <SectionAccount
          accountParent={true}
        />
      </div>
    )
  }
}

PageAccountParent.propTypes = {
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser.attributes
  }
}

export default connect(
  mapStateToProps,
  null,
)(PageAccountParent)




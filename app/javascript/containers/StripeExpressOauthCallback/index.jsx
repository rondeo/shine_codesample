import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'

import {
  VALID_EMAIL_REGEX,
  API_PREFIX,
} from '../../constants'

const convertToObject = (url) => {
  const arr = url.slice(1).split(/&|=/); // remove the "?", "&" and "="
  let params = {};

  for(let i = 0; i < arr.length; i += 2){
    const key = arr[i], value = arr[i + 1];
    params[key] = value ; // build the object = { limit: "10", page:"1", status:"APPROVED" }
  }
  return params;
};

class StripeExpressOauthCallback extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tutor: ''
    }

    if(!axios.defaults.headers.common['uid']) {
      axios.defaults.headers.common['uid'] = this.props.currentUser.email;
      axios.defaults.headers.common['client'] = this.props.currentUser.client;
      axios.defaults.headers.common['access-token'] =  this.props.currentUser.accessToken;
    }
  }

  componentWillMount() {
    const uri = this.props.location.search;
    const parsed = convertToObject(uri);

    axios.put(
      `${API_PREFIX}/user_profiles/${parsed.state}/update_express_account`,
      { code: parsed.code },
      {},
    )
    .then(res => {
       console.log(res)
       window.location = '/account'
    })
    .catch(err => {
       console.log(err)
    })
  }

  render() {
    return (
      <div className="stripe-oauth-redirect content-paper">
        <section className="paper" name="tutor-matches">
          <div className="redirect-callback"><h5>Redirecting.... Please don't refresh or use the browser Back button.</h5></div>
        </section>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser.attributes
  }
}

export default
  connect(
    mapStateToProps,
    null,
  )(StripeExpressOauthCallback)

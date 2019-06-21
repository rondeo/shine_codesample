import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Header from 'components/Header'
import Footer from 'components/Footer'
import FormLogin from 'components/FormLogin'
import FormRequestTutor from 'components/FormRequestTutor'
import SectionAccount from 'components/SectionAccount'
import Modal from 'components/Modal'
import axios from 'axios'
//import css from './style.scss'

class PageProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalId: null,
      user: {},
    }

    this.openModal = ::this.openModal
    this.closeModal = ::this.closeModal
    this.loadProfile = ::this.loadProfile
  }
  componentDidMount() {
    this.loadProfile()
  }
  loadProfile() {
    let profileId = window.location.pathname
      .split('/')[2]
      .split('-')[1]
    axios.get(
      `/api/v1/user_profiles/${profileId}`
    ).then(res => {
      console.log("LOADED PROFILE")
      console.log(res)
      this.setState({
        user: res.data.user,
      })
    })
  }

  openModal(id) {
    let self = this
    return () => {
      self.setState({
        modalId: id,
      })
    }
  }
  closeModal() {
    this.setState({
      modalId: null,
    })
  }

  render() {
    return (
      <div className="page-account">
        <SectionAccount
          user={this.state.user}
          openLoginModal={this.openModal(1)}
          openContactModal={this.openModal(2)}
        />

        <Modal
          isOpen={this.state.modalId === 1}
          onClose={this.closeModal}
          small={true}
        >
          <FormLogin />
        </Modal>

        <Modal
          isOpen={this.state.modalId === 2}
          onClose={this.closeModal}
        >
          <FormRequestTutor
            onSubmit={this.closeModal}
            user={this.state.user}
          />
        </Modal>
      </div>
    )
  }
}

PageProfile.propTypes = {
}

export default PageProfile


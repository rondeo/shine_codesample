import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import SectionHead from 'components/SectionHead'
import SectionTutor from 'components/SectionTutor'
import imgHeadSmall from 'images/head-small-bg.jpg'
import FormConnect from 'components/FormConnect'
import axios from 'axios'
import MessageModal from 'components/MessageModal'
import Modal from 'components/Modal'

import {
  objToQueryString,
  toSnakeCase,
} from 'utils/url'
import {
  API_PREFIX
} from '../../constants'
//import css from './style.scss'

class PageSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subject: '',
      zip: '',
      priceRange: '-',
      availability: '',

      tutors: [],
      page: 1,
      totalAvailablePages: 1,
      selectedTutorId: '',
      selectedTutorName: '',
      messageModal: false,
      queryString: ''
    }

    this.loadResults = ::this.loadResults
    this.loadNextPage = ::this.loadNextPage
    this.toggleMessageModal = ::this.toggleMessageModal
    this.setSelectedTutor = ::this.setSelectedTutor
  }

  setSelectedTutor(tutorId, name) {
    this.setState({
      selectedTutorId: tutorId,
      selectedTutorName: name
    })
    this.toggleMessageModal();
  }

  componentDidMount() {
    // fetch tutors
    let searchParams = this.readQueryParamsToState()
    this.loadResults(searchParams)
  }

  toggleMessageModal() {
    this.setState({
      messageModal: !this.state.messageModal
    })
  }

  readQueryParamsToState() {
    let queryStr = toSnakeCase(window.location.search)
    let params = new URLSearchParams(queryStr)
    let zip = params.get('zip')
    let subject = params.get('subject')
    let priceRange = params.get('price_range')
    //let availability = parseInt(params.get('availability'))

    let searchParams = {
      zip: zip,
      subject: subject,
      priceRange: priceRange,
    }

    this.setState({
      ...searchParams,
    })

    return searchParams
  }

  loadResults(searchParams) {
    // transform price_range into hourly_rate_* keys desired by backend
    // - if desired, leave part of price_range blank to search for just hourly_rate_low

    let priceRange = searchParams.priceRange
    let [ priceRangeLow, priceRangeHigh ] = (priceRange || "-").split('-')

    if (priceRangeLow && parseInt(priceRangeLow) >= 0) {
      searchParams.hourly_rate_low = priceRangeLow
    }
    if (priceRangeHigh && parseInt(priceRangeHigh) >= 0) {
      searchParams.hourly_rate_high = priceRangeHigh
    }

    // submit search
    let queryStr = objToQueryString(searchParams)
    this.setState({ queryString: queryStr })
    axios.get(`${API_PREFIX}/search?${queryStr}`)
      .then(res => {
      // add new results to existing
      let combinedTutors = [
        ...this.state.tutors,
        ...res.data.users,
      ]
      this.setState({
        tutors: res.data.users,
        totalAvailablePages: res.data.pages,
      })
    })
  }
  loadNextPage() {
    let self = this
    if (this.state.page < this.state.totalAvailablePages) {
      this.setState({
        page: this.state.page + 1,
      }, () => {
        self.loadResults()
      })
    }
  }

  render() {
    return (
      <div className="page-search">
        <div className="container-fluid">
          <div className="page-search__title">
            <FormConnect
              zip={this.state.zip}
              subject={this.state.subject}
              priceRange={this.state.priceRange}
              loadResults={this.loadResults}
            />
          </div>
          <SectionTutor
            tutors={this.state.tutors}
            loadNextPage={this.loadNextPage}
            totalAvailablePages={this.state.totalAvailablePages}
            setSelectedTutor={this.setSelectedTutor}
            page={this.state.page}
          />

          <Modal
            id="modal--message-modal"
            isOpen={this.state.messageModal}
            onClose={this.toggleMessageModal}
          >
          <MessageModal
            tutorName={this.state.selectedTutorName}
            tutorId={this.state.selectedTutorId}
            postMessage={this.state.postMessage}
            toggleMessageModal={this.toggleMessageModal}
            queryString={this.state.queryString}
          />
        </Modal>
        </div>
      </div>
    )
  }
}

PageSearch.propTypes = {
}

export default PageSearch


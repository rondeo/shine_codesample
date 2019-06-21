import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import Input from 'components/Input'
import FieldCheckbox from 'components/FieldCheckbox'
import Select from 'components/Select'
import GuidedSearchOption from 'components/GuidedSearchOption'
import LeftArrow from 'images/svg/left-arrow'
import RightArrow from 'images/svg/right-arrow'
import { objToQueryString } from 'utils/url.js'
import { withRouter } from 'react-router-dom'
import {
  SUBJECT_OPTIONS,
  SUBJECT_OPTIONS_HASH,
  PRICE_RANGE_OPTIONS,
  USER_OPTIONS,
  GRADE_OPTIONS,
  FIELDS_TIMES,
  LEARNER_TYPES,
} from 'utils/constants.js'

import {
  API_PREFIX,
  VALID_EMAIL_REGEX
} from '../../constants'


import axios from 'axios'
//import css from './style.scss'

const PARENT_CONTACT_INFO = [
  { title: 'Name', attrName: 'parentName', },
  //{ title: "Student Name: ", attrName: 'studentName' },
  { title: 'Email', attrName: 'parentEmail', },
  { title: 'Phone', attrName: 'phone', placeholder: 'XXX-XXX-XXXX', },
  //{ title: 'ZIP Code: ', attrName: 'zip' },
]
const HELP_OPTIONS = [
  { name: 'homework help', value: 'hwHelp', selected: true },
  { name: 'extra enrichment', value: 'enrichment', },
]

const DAYS_OF_WEEK = [
  'Mon', 'Tue', 'Wed', 'Thur', 'Fri',
]

class GuidedSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.getInitialState()
    }

    this.finalSearchPage = 5

    this.backPage = ::this.backPage
    this.nextPage = ::this.nextPage
    this.submitRequest = ::this.submitRequest
    this.setAttribute = ::this.setAttribute
    this.selectAvailabilityItem = ::this.selectAvailabilityItem
    this.deselectAvailabilityItem = ::this.deselectAvailabilityItem
    this.updateAvailability = ::this.updateAvailability
    this.validatePage = ::this.validatePage

    this.nextIfEnter = ::this.nextIfEnter
  }

  componentDidMount() {
    document.addEventListener('keydown', this.nextIfEnter)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.nextIfEnter)
  }

  getInitialState() {
    return {
      page: 0,
      tutoringType: '',
      studentName: '',
      subject: '',
      priceRange: '',
      availability: [],
      zip: '',
      parentName: '',
      studentName: '',
      parentEmail: '',
      phone: '',

      userType: '',
      grade: '',
      city: '',
      school: '',
      motivated: false,
      shy: false,
      outgoing: false,
      focusesTrouble: false,
      focusesWell: false,

      error: '',
      buttonText: false,
    }
  }

  nextIfEnter(e) {
    if (e.keyCode === 13) {
      this.nextPage()
    }
  }

  backPage() {
    this.setState({ error: '' });

    if (this.state.page <= 0) return

    this.setState({
      page: this.state.page - 1,
    })
  }

  nextPage() {
    this.setState({ error: '' });

    if(!this.validatePage()) {
      return false;
    }

    /*
     * Perform Search
    if (this.state.page === this.finalSearchPage) {
      let tutorSearchData = {
        subject: this.state.subject,
        price_range: this.state.priceRange,
        zip: this.state.zip,
      }

      let queryStr = objToQueryString(tutorSearchData)
      this.props.history.push(`/search?${queryStr}`)
    }
    */

    if (this.state.page === this.finalSearchPage) {
      setTimeout(() => {
        this.setState({
          buttonText: 'MATCHING YOU',
        })
      }, 200)

      setTimeout(
        () => this.setState({
          page: this.state.page + 1,
          buttonText: false,
        }),
        3400,
      )
    }
    else if (this.state.page === this.finalSearchPage+1) {
      // save SearchRequest
      this.submitRequest()
      this.setState({
        page: this.state.page + 1,
      })
    }
    else if (this.state.page >= this.finalSearchPage+2) {
      //this.props.history.push('/blog')
      // reset GuidedSearch
      this.setState({
        page: 0,
        tutoringType: '',
        studentName: '',
        subject: '',
        priceRange: '',
        availability: [],
        zip: '',
        parentName: '',
        studentName: '',
        parentEmail: '',
        phone: '',
      })
    }
    else {
      // move pages
      this.setState({
        buttonText: false,
        page: this.state.page + 1,
      })
    }

  }

  validatePage() {
    let error = false;
    this.setState({
      studentNameError: false,
      availabilityError: false,
      zipError: false,
      parentNameError: false,
      parentEmailError: false,
      phoneError: false,

      /*
       * currently unused
       *
      cityError: false,
      schoolError: false,
      studentOptionsError: false,
      */
    })

    if (this.state.page === 0 && !this.state.tutoringType) {
      error = true
    }
    if (this.state.page === 1 && (
      !this.state.studentName ||
      this.state.studentName.length < 1
    )) {
      this.setState({
        studentNameError: true
      })
      error = true
    }
    if (this.state.page === 2 && !this.state.subject) {
      error = true
    }
    if (this.state.page === 3 && !this.state.priceRange) {
      error = true
    }
    if(this.state.page == 4 && this.state.availability.length < 1) {
      this.setState({availabilityError: true})
      error = true
    }
    if (this.state.page === 5 && (
      !this.state.zip ||
      this.state.zip.length < 5
    )) {
      this.setState({
        zipError: true
      })
      error = true
    }
    else if(this.state.page == 6) {
      if (
        !this.state.parentName ||
        this.state.parentName.length < 1
      ) {
        this.setState({parentNameError: true})
        error = true
      }
      if(
        !this.state.parentEmail ||
        this.state.parentEmail.length < 1 ||
        !VALID_EMAIL_REGEX.test(this.state.parentEmail)
      ) {
        this.setState({parentEmailError: true})
        error = true
      }
      // TOOD: consider https://www.npmjs.com/package/libphonenumber-js
      // - autoformatter
      // - nice api
      if(
        !this.state.phone ||
        this.state.phone.replace(/\D/g,'').length < 7
      ) {
        this.setState({phoneError: true})
        error = true
      }
    }
    /*
     * OLD ERRORS
     *
    if(this.state.page == 1 && !(this.state.city && this.state.city.length > 0)) {
      this.setState({cityError: true})
      error = true
    }
    if(this.state.page == 1 && !(this.state.school && this.state.school.length > 0)) {
      this.setState({schoolError: true})
      error = true
    }
    else if(this.state.page == 2 && !(this.state.motivated || this.state.shy || this.state.outgoing || this.state.focusesTrouble || this.state.focusesWell)) {
      this.setState({studentOptionsError: true})
      error = true
    }
    if(this.state.page == 4 && !(
      this.state.motivated || this.state.shy || this.state.outgoing || this.state.focusesTrouble || this.state.focusesWell)
    ) {
      this.setState({studentOptionsError: true})
      error = true
    }
    */

    if (error) {
      return false
    } else {
      return true
    }
  }

  submitRequest() {
    let search_request = {
      tutoring_type: this.state.tutoringType,
      student_name: this.state.studentName,
      subject: this.state.subject,
      price_range: this.state.priceRange,
      availability: this.state.availability,
      zip: this.state.zip,
      email: this.state.parentEmail,
      name: this.state.parentName,
      phone: this.state.phone,

      /*
       * currently unused
       *
        motivated: this.state.motivated,
        shy: this.state.shy,
        outgoing: this.state.outgoing,
        focuses_trouble: this.state.focusesTrouble,
        focuses_well: this.state.focusesWell,
        grade: this.state.grade,
        school: this.state.school,
        user_type: this.state.userType,
      */
    }

    axios.post(`${API_PREFIX}/search_requests`, { search_request: search_request },{},)
  }

  setAttribute(attrName) {
    return (e) => {
      console.log("SETTING ATTR" + attrName)
      let val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      console.log(val)
      if (typeof(val) != "undefined") {
        this.setState({
          [attrName]: val,
        })
      }
    }
  }
  selectAttribute(attrName, val) {
    return () => {
      this.setState({
        [attrName]: val,
      }, () => {
        this.nextPage()
      })
    }
  }

  selectAvailabilityItem(time) {
    this.setState({
      availability: [time, ...this.state.availability],
    })
  }
  deselectAvailabilityItem(time) {
    let remainingAvailability = [...this.state.availability]
      .filter(i => i !== time)
    this.setState({
      availability: remainingAvailability,
    })
  }
  updateAvailability(time) {
    return (e) => {
      if (e.target.checked) {
        this.selectAvailabilityItem(time)
      }
      else {
        this.deselectAvailabilityItem(time)
      }
    }
  }

  render() {
    return (
      <div
        className="guided-search"
        tabIndex="-1"
      >
        <div className="content">
          <div className="subheading">
          </div>
          <div className="title">
            {
              this.state.page === 0
                ?
                  <>
                    <span className=""></span>
                    <span className="title--primary">Hi! I'm Jess, your personal Learning Specialist. I'm here to help you find the right tutor for you.</span>
                    <div className="title--secondary">What can I help you with today?</div>
                  </>
                : ''
            }
            {
              this.state.page === 1
                ?
                  <>
                    <span className="title--primary">All right! We can definitely help you with that.</span>
                    <div className="title--secondary">Who is this tutoring for?</div>
                  </>
                : ''
            }
            {
              this.state.page === 2
                ? "What subject are you looking for help in?"
                : ''
            }
            {
              this.state.page === 3
                ? "And what's your budget for a session?"
                : ''
            }
            {
              this.state.page === 4
                ? "When are some good times for you?"
                : ''
            }
            {
              this.state.page === 5
                ? "Finally, what's your ZIP code?"
                : ''
            }
            {
              this.state.page === 6
                ?
                  <span>
                    We've found some great tutors in your area. How should we get in touch with your matches?
                  </span>
                : ''
            }
            {
              this.state.page === 7
                ?
                <>
                  <span className="title--primary">
                    Great!
                    We'll give you a call in the next 48 hours with your tutor matches.
                  </span>
                </>
                : ''
            }
          </div>

          <div className="questions">
            <div className="guided-search__options-wrapper">
              {
                this.state.page === 0
                  ?
                    HELP_OPTIONS.map((o, i) => (
                      <GuidedSearchOption
                        onClick={this.selectAttribute('tutoringType', o.value)}
                        title={o.name}
                        label={String.fromCharCode(65 + i)}
                      />
                    ))
                  : ''
              }
              {
                this.state.page === 1
                  ?
                    <Input
                      className="guided-search__input"
                      onChange={this.setAttribute('studentName')}
                      value={this.state.studentName}
                      placeholder="Student's First Name"
                      hasError={this.state.studentNameError}
                    />
                  : ''
              }
              {
                this.state.page === 2
                  ?
                    <div className="subjectAttrs">
                      <div className="subjectAttrs__selected">
                        { SUBJECT_OPTIONS_HASH[this.state.subject] || "Select your subject" }
                      </div>
                      <div className="subjectAttrs__options">
                        {
                          SUBJECT_OPTIONS
                            .sort((a,b) => a.name > b.name ? 1 : -1)
                            .map((o, i) => (
                            <GuidedSearchOption
                              onClick={this.selectAttribute('subject', o.value)}
                              title={o.name}
                              grey={this.state.subject !== o.value}
                            />
                          ))
                        }
                      </div>
                    </div>
                  : ''
              }
              {
                this.state.page === 3
                  ?
                    PRICE_RANGE_OPTIONS.map((o, i) => (
                      <GuidedSearchOption
                        onClick={this.selectAttribute('priceRange', o.value)}
                        title={o.name}
                        label={String.fromCharCode(65 + i)}
                      />
                    ))
                  : ''
              }
              {
                /*
                this.state.page === 4
                  ?
                    <div className="studentAttrs">
                      {
                        LEARNER_TYPES.map(o => (
                          <span style={{width: '50%'}}>
                            <FieldCheckbox
                              reverse={true}
                              transparent={true}
                              noPadding={true}
                              name={o.attrName}
                              title={o.title}
                              checked={this.state[o.attrName]}
                              onChange={this.setAttribute(o.attrName)}
                              hasError={this.state.studentOptionsError}
                            />
                          </span>
                        ))
                      }
                    </div>
                  : ''
                  */
              }
              {
                // availability
                this.state.page === 4
                  ?
                    <div className="times">
                      <div className="times__header-top">
                        {
                          DAYS_OF_WEEK.map(day => (
                            <span className="times__header-top--item">
                              {day}
                            </span>
                          ))
                        }
                      </div>
                      <div className="times__header-left">
                        {
                          FIELDS_TIMES.map(time => (
                            <span className="times__header-left--item">{time.title}</span>
                          ))
                        }
                      </div>
                      <div className="times__content">
                        {
                          FIELDS_TIMES.map(time => (
                            <div className="times__content--row" key={time.title}>
                              {
                                DAYS_OF_WEEK.map(day => (
                                  <div className="times__content--item" key={`${day}--${time.title}`}>
                                    <FieldCheckbox
                                      transparent={true}
                                      checked={!!this.state.availability.includes(`${day}--${time.title}`)}
                                      onChange={this.updateAvailability(`${day}--${time.title}`)}
                                      name={`${day}--${time.title}`}
                                      hasError={this.state.availabilityError}
                                    />
                                  </div>
                                ))
                              }
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  : ''
              }
              {
                this.state.page === 5
                  ?
                    <Input
                      className="guided-search__input"
                      onChange={this.setAttribute('zip')}
                      value={this.state.zip}
                      placeholder="Your ZIP"
                      hasError={this.state.zipError}
                    />
                  : ''
              }
              {
                this.state.page === 6
                  ?
                      <div className="contact-info">
                        {
                          PARENT_CONTACT_INFO.map(o => (
                            <div
                              className="contact-info--fields"
                            >
                              <label>{o.title}</label>
                              <Input
                                className="guided-search__input"
                                name={o.attrName}
                                value={this.state[o.attrName]}
                                placeholder={o.placeholder}
                                onChange={this.setAttribute(o.attrName)}
                                style={{}}
                                hasError={this.state[o.attrName + "Error"]}
                              />
                            </div>
                          ))
                        }
                      </div>
                  :
                    ''
              }
              {
                this.state.page === 7
                  ?
                      <div className="contact-info">
                      </div>
                  :
                    ''
              }

              {
                /*
                this.state.page > this.finalSearchPage
                  ?
                    <div className="content">
                      Thanks! We'll be reaching out as soon as possible to set up lessons with your new tutor. In the meantime, please check out our Mission or learn more about the brain on our Blog.
                    </div>
                  : ''
                  */
              }
            </div>
          </div>
        </div>


        { /* ACTIONS */ }
        <div className="action-box">
          {
            this.state.page >= 0
              ?
                <Button
                  grey={true}
                  onClick={this.backPage}
                  fullWidth={true}
                  square={true}
                  className="action-box__button"
                >
                  BACK
                </Button>
              : ''
          }
          <Button
            orange={true}
            onClick={this.nextPage}
            fullWidth={true}
            square={true}
            className={`
              action-box__button
              ${this.state.buttonText ? 'loading' : ''}
            `}
          >
            {
              this.state.page >= 0 && this.state.page <= this.finalSearchPage-1
                ? "CONTINUE / press ENTER"
                : ''
            }
            {
              this.state.page === this.finalSearchPage
                ?
                  <span className="loading__text">{ this.state.buttonText || 'DONE!' }</span>
                : ''
            }
            {
              this.state.page == this.finalSearchPage+1
                ? "OK!"
                : ''
            }
            {
              this.state.page >= this.finalSearchPage+2
                ? "FIND ANOTHER TUTOR"
                : ''
            }
          </Button>
        </div>
      </div>
    )
  }
}

GuidedSearch.propTypes = {
}

export default withRouter(GuidedSearch)


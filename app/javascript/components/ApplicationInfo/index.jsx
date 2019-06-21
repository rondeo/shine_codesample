import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import FormTutorWhy from 'components/FormTutorWhy'
import FormTutorInformation from 'components/FormTutorInformation'
import FormTutorEducation from 'components/FormTutorEducation'
import FormTutorReferences from 'components/FormTutorReferences'
import Panel from 'components/Panel'
import Tutor from 'components/Tutor'
import CircularImage from 'components/CircularImage'
import Button from 'components/Button'
import Field from 'components/Field'
import Input from 'components/Input'
import Select from 'components/Select'
import FieldCheckbox from 'components/FieldCheckbox'
import {
  SUBJECT_OPTIONS,
  SUBJECT_OPTIONS_HASH,
} from 'utils/constants.js'
import {
  API_PREFIX,
  VALID_EMAIL_REGEX,
} from '../../constants'
import {scrollToEl} from 'utils/scroll.js'
import axios from 'axios'
import camelize from 'camelize'

import {
  registerUser,
  toggleSignupSuccessModal,
} from '../../actions'

const BLANK_EDU = {
  institute: '',
  degree: '',
  course: '',
}
const BLANK_REFERENCE = {
  fName: '',
  //lastI: '',
  //honorific: '',
  email: '',
  personalNote: '',
}
const DEFAULT_REFERENCE_REQUEST_TEXT = "It's been a while since we worked together! I hope you are doing well. I am writing because I am applying to work with Shine Tutors as a professional tutor, and would love your recommendation for my work. Your reference will help me find more wonderful students and contribute to their academic success. If you can, please take two minutes and leave me a short note at the link below. I greatly appreciate it!"

const SIGNUP_REDIRECT_URL = '/tutor-with-us'
const LAST_FORM_PAGE = 4

class ApplicationInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      zip: '',
      avatarData: '',
      preferredSubject: '',
      yearsExp: '',
      subjectQualifications: '',
      educations: [{...BLANK_EDU}],
      references: [{...BLANK_REFERENCE}],
      referenceRequestText: DEFAULT_REFERENCE_REQUEST_TEXT,
      acceptTos: false,

      errors: {},
      submissionErr: '',
      page: 0,

      // unsued
      bio: '',
      tagline: '',
      ableToTravel: '',
      phoneNumber: '',
    }

    // refs
    this.elScrollTopAnchor = null

    // function context bindings
    this.saveTutorProfile = ::this.saveTutorProfile
    this.updateTutorProfile = ::this.updateTutorProfile
    this.signUpTutor = ::this.signUpTutor

    this.updateAttribute = ::this.updateAttribute
    this.saveAvatarData = ::this.saveAvatarData

    this.saveApplication = ::this.saveApplication
    this.loadApplication = ::this.loadApplication

    this.setEducations = ::this.setEducations
    this.setReferences = ::this.setReferences

    this.nextPage = ::this.nextPage
    this.prevPage = ::this.prevPage

    this.validatePage = ::this.validatePage
    this.validateTutorPersonal = ::this.validateTutorPersonal
    this.validateTutorAvatarData = ::this.validateTutorAvatarData
    this.validateTutorSubject = ::this.validateTutorSubject
    this.validateTutorEducation = ::this.validateTutorEducation
    this.validateTutorReferences = ::this.validateTutorReferences

    this.renderActionButtons = ::this.renderActionButtons
    this.nextIfEnter = ::this.nextIfEnter
  }

  componentDidMount() {
    this.loadApplication()
    document.addEventListener('keydown', this.nextIfEnter)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.nextIfEnter)
  }

  updateAttribute(attrName, cb) {
    let self = this
    return (e) => {
      let val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      self.setState(
        {
          [attrName]: val,
        },
        () => cb && cb()
      )
    }
  }

  saveAvatarData(fileData) {
    this.setState({
      avatarData: fileData,
    })
  }

  setEducations(e) {
    this.updateAttribute('educations')(e)
  }

  setReferences(e) {
    this.updateAttribute('references')(e)
  }

  nextIfEnter(e) {
    if (e.keyCode === 13) {
      this.nextPage()
    }
  }

  prevPage() {
    if (this.state.page <= 0) return

    this.setState({
      page: this.state.page-1,
    })
  }
  nextPage() {
    if (!this.validatePage()) {
      return
    }

    // always save application state
    // - save the application
    // - create it on final submit
    // - clear local state on final submit
    this.saveTutorProfile()

    let nextAction = () => Promise.resolve()
    if (this.state.page === LAST_FORM_PAGE) {
      nextAction = this.signUpTutor
    }

    return nextAction().then(() => {
        // nav to either next page or 0
        let nextPage = this.state.page + 1
        if (this.state.page >= LAST_FORM_PAGE+1) {
          nextPage = 0
        }

        // change page
        this.setState({
          page: nextPage,
        }, () => {
          ReactDOM.findDOMNode(this.elScrollTopAnchor).scrollIntoView({
            behavior: 'smooth',
          })
        })
      }
    )
  }

  saveTutorProfile() {
    let saveData = {
      email: this.state.email,
      acceptTos: this.state.acceptTos,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      zip: this.state.zip,
      preferredSubject: this.state.preferredSubject,
      yearsExp: this.state.yearsExp,
      subjectQualifications: this.state.subjectQualifications,
      educations: this.state.educations,
      references: this.state.references,
    }
    this.saveApplication(saveData)

    return saveData
  }
  updateTutorProfile() {
    let saveData = this.saveTutorProfile()

    return axios.put(
      `${API_PREFIX}/user_profiles/update`,
      saveData,
      {},
    )
      .then(res => {
        return res.data
      })
      .then(json => {
        const camelized = camelize(json)
        this.setState({
          email: camelized.email,
          firstName: camelized.firstName,
          lastName: camelized.lastName,
          zip: camelized.zip,
          preferredSubject: camelized.subject,
          yearsExp: camelized.yearsExp,
          subjectQualifications: camelized.subjectQualifications,
          educations: camelized.educations,
          references: camelized.references,
        })
        .catch(err => {
          console.log("Error updating profile: AppInfo")
          console.log(err)
          throw err
        })
      })
  }
  saveApplication(saveData) {
    localStorage.setItem('tutorApplication', JSON.stringify(saveData))
  }
  loadApplication() {
    let tutorApp = JSON.parse(localStorage.getItem('tutorApplication'))

    console.log("LOADED TUTORAPP!")
    this.setState(
      {
      ...tutorApp
      },
      () => console.log(this.state)
    )
  }

  validateTutorSignup() {
    let errors = {}

    return errors
  }
  validateTutorPersonal() {
    let errors = {}

    if(!this.state.email || !VALID_EMAIL_REGEX.test(this.state.email)) {
      errors['email'] = 'Please enter valid email'
    }
    if(!this.state.firstName || this.state.firstName.length < 1) {
      errors['firstName'] = 'Please enter first name';
    }
    if(!this.state.lastName || this.state.lastName.length < 1) {
      errors['lastName'] = 'Please enter last name';
    }
    if (!this.state.acceptTos) {
      errors['acceptTos'] = "Please accept the Terms of Service to submit your application"
    }

    return errors
  }
  validateTutorAvatarData() {
    let errors = {}

    if (!this.state.avatarData || this.state.avatarData.length < 1) {
      errors['avatarData'] = "Please provide a high-resolution profile picture"
    }

    return errors
  }
  validateTutorSubject() {
    let errors = {}

    if(!this.state.preferredSubject) {
      errors['subject'] = 'Please select subject';
    }
    if(!this.state.yearsExp || this.state.yearsExp.length < 1) {
      errors['yearsExp'] = 'Please select years of experience';
    }
    if(!this.state.subjectQualifications || this.state.subjectQualifications.length < 1) {
      errors['subjectQualifications'] = 'What qualifies you to tutor this subject?';
    }
    if(!this.state.zip || this.state.zip.length < 5) {
      errors['zip'] = 'Please enter zip';
    }

    return errors
  }
    /*
  validateTutorWhy() {
    let errors = {};

    if(!this.state.firstName) {
      errors['firstName'] = 'Please enter first name';
    }
    if(!this.state.lastName) {
      errors['lastName'] = 'Please enter last name';
    }
    if(!this.state.email) {
      errors['email'] = 'Please enter email';
    }
    if(this.state.email && !VALID_EMAIL_REGEX.test(this.state.email)) {
      errors['email'] = 'Please enter valid email';
    }
    if(!this.state.bio) {
      errors['bio'] = 'Please enter bio';
    }
    if(!this.state.tagline) {
      errors['tagline'] = 'Please enter tagline';
    }
    if(!this.state.preferredSubject) {
      errors['subject'] = 'Please select subject';
    }

    return errors
  }
  validateTutorInformation() {
    let errors = {};

    if(!this.state.zip) {
      errors['zip'] = 'Please enter zip';
    }
    if(!this.state.yearsExp) {
      errors['yearsExp'] = 'Please select years of experience';
    }
    if(!this.state.ableToTravel) {
      errors['travel'] = 'Please select travel';
    }
    if(!this.state.phoneNumber) {
      errors['phoneNumber'] = 'Please enter phone number';
    }

    return errors
  }
  */
  validateTutorEducation() {
    let errors = {};

    let edus = [...this.state.educations]
    let completedEdus = edus.filter(e => (
      e.institute && e.institute.length > 0 &&
      e.degree && e.degree.length > 0 &&
      e.course && e.course.length > 0
    ))
    let pendingEdus = edus.filter(e => (
      (!e.institute || e.institute.length < 1) &&
      (!e.degree || e.degree.length < 1) &&
      (!e.course || e.course.length < 1)
    ))

    if(completedEdus.length < 1 || edus.length != (completedEdus.length + pendingEdus.length)) {
      errors['education'] = 'Please provide all Degrees, Fields of Study, and Educational Institutions';
    }

    return errors
  }
  validateTutorReferences() {
    let errors = {};

    let references = [...this.state.references]
    let completedReferences = references.filter(e => (
      e.fName && e.fName.length > 0 &&
      e.email && e.email.length > 0
    ))
    let pendingReferences = references.filter(e => (
      (!e.fName || e.fName.length < 1) &&
      (!e.email || e.email.length < 1)
    ))
    let invalidEmailReferences = references.filter(e => (
      e.email && !VALID_EMAIL_REGEX.test(e.email)
    ))

    if(references.length != (completedReferences.length + pendingReferences.length)) {
      errors['references'] = 'Please complete the Title, First Name, Last Initial and Email for each of your references';
    } else if(invalidEmailReferences.length > 0) {
      errors['references'] = 'Please provide a valid email address for each of your references';
    }

    return errors
  }

  validatePage() {
    // clear errors
    let errors = {};
    this.setState({ errors: errors });

    // get errors for appropriate page
    if (this.state.page === 0) {
      errors = this.validateTutorPersonal()
    }
    if (this.state.page === 1) {
      this.validateTutorAvatarData()
    }
    else if (this.state.page === 2) {
      errors = this.validateTutorSubject()
    }
    else if (this.state.page === 3) {
      // validation done in-form
      // errors = this.validateTutorEducation()
    }
    else if (this.state.page === 4) {
      // validation done in-form
      //errors = this.validateTutorReferences()
    }

    // display errors
    if(Object.keys(errors).length > 0) {
      this.setState({ errors: errors });
      return false
    } else {
      return true
    }
  }

  signUpTutor() {
    this.setState({
      submissionErr: false,
    })

    let tutorParams = {
      // 1st step
      password: this.state.password,
      password_confirmation: this.state.password,
      confirm_success_url: SIGNUP_REDIRECT_URL,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      acceptTos: this.state.acceptTos,
      type: 'Teacher',

      // 2nd step
      zip: this.state.zip,
      subject: this.state.preferredSubject,
      yearsExp: this.state.yearsExp,
      subjectQualifications: this.state.subjectQualifications,
      educationsAttributes: this.state.educations.map(e => ({ degree: e.degree, course: e.course, institute: e.institute  })),
      referencesAttributes: this.state.references.map(r => ({
        first_name: r.fName,
        email: r.email,
        personal_note: r.personalNote,
        //last_name: r.lastI,
        //title: r.honorific,
      })),
    }

    // register tutor
    return axios.post(
      `${API_PREFIX}/auth`,
      tutorParams,
      {},
    ).then(
        res => {
          return {
            'access-token': res.headers['access-token'],
            'client': res.headers.client,
            'uid': res.headers.uid,
          }
        },
        err => {
          // error in POST -> email is taken
          this.setState({
            submissionErr: err.response && err.response.data && err.response.data.errors && err.response.data.errors.full_messages || 'An unknown error has occurred. Please email us at hi@shinetutors.co, and we will get you sorted out.',
            page: 0,
          });
          throw err
        }
    ).then(
      // upload avatar data
      authHeaders => {
        if (!this.state.avatarData || this.state.avatarData.length < 1) return

        let fileData = new FormData()
        fileData.append('avatar', this.state.avatarData)

        // save profile picture
        // - pass is-registering header with auth headers to bypass is_approved requirement
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
            'is-registering': true,
            ...authHeaders,
          }
        }
        return axios.post(
          `${API_PREFIX}/user_profiles/upload`,
          fileData,
          config,
        )
      }
    ).then(
      res => {
        if (!res || !res.data) return

        const avatarUrl = res.data.avatar_url
        this.setState({
          imageUrl: avatarUrl,
        })
      },
      err => {
        console.log(err)
        throw err
      }
    )
  }

  renderStepTitle() {
    let title = ""
    switch(this.state.page) {
      case 0:
        title = "Create Your Account"
        break
      case 1:
        title = "About You"
        break
      case 2:
        title = "Your Subject"
        break
      case 3:
        title = "Your Education"
        break
      case 4:
        title = "Prior References"
        break
      case 5:
        title = "We're Reviewing Your Profile!"
        break
    }

    return title
  }

  renderActionButtons() {
    return (
      <div
        className="section-information__action-buttons"
      >
        <Button
          className="section-information__action-buttons__back"
          grey={true}
          onClick={this.prevPage}
        >
          BACK
        </Button>
        <Button
          className="section-information__action-buttons__next"
          orange={true}
          onClick={this.nextPage}
        >
          CONTINUE / Press ENTER
        </Button>
      </div>
    )
  }

  render() {
    return (
      <div
        className="section-information"
      >
        <div
          className="section-information__scrollAnchor"
          ref={node => this.elScrollTopAnchor = node}
        >
        </div>
        <div className="">
          <Panel
            noTitle={true}
            boxShadow={true}
            noScroll={true}
            noContentPadding={true}
          >
            <div className="section-information__title">
              <CircularImage
                imageUri="/images/mini-tutor-guide.jpg"
                width="90px"
                height="94px"
              />
            </div>
            <div
              className="panel__title__header--bold"
            >
              { this.renderStepTitle() }
            </div>

            {
              this.state.page === 0
                ?
                // create account
                <div className="section-information__content"
                >
                  <div
                    className="section-information__content__grid"
                  >
                    <Field
                      fieldFor={`tutor-application__fname`}
                      label="First Name"
                    >
                      <Input
                        className=""
                        name="tutor-application__fname"
                        placeholder="First Name"
                        value={this.state.firstName}
                        onChange={this.updateAttribute('firstName')}
                        hasError={!!this.state.errors['firstName']}
                      />
                    </Field>
                    <Field
                      fieldFor={`tutor-application__lname`}
                      label="Last Name"
                    >
                      <Input
                        className=""
                        name={`tutor-application__lname`}
                        placeholder="Last Name"
                        value={this.state.lastName}
                        onChange={this.updateAttribute('lastName')}
                        hasError={!!this.state.errors['lastName']}
                      />
                    </Field>
                    <Field
                      fieldFor={`tutor-application__email`}
                      label="Email Address"
                      className="grid-1-2"
                    >
                      <Input
                        name={`tutor-application__email`}
                        placeholder="Preferred Email"
                        value={this.state.email}
                        onChange={this.updateAttribute('email')}
                        hasError={!!this.state.errors['email']}
                      />
                    </Field>
                    <FieldCheckbox
                      title={<span>I accept the Shine Tutors <a href="/terms-of-service" target="_blank">Terms of Service</a></span>}
                      className="grid-1-2"
                      name="acceptTos"
                      onChange={this.updateAttribute('acceptTos')}
                      checked={this.state.acceptTos}
                      hasError={(this.state.errors['acceptTos'] && this.state.errors['acceptTos'].length > 0)}
                      reverse={true}
                    />
                  </div>

                  <div
                    className="section-information__error"
                  >
                    { this.state.submissionErr }
                  </div>
                </div>
                : ''
              }
              {
                this.state.page === 1
                  ?
                  <div className="section-information__content">
                    <Tutor
                      clickable={true}
                      imageUrl={this.state.imageUrl}
                      avatarData={this.state.avatarData}
                      onChangeWithoutUpload={this.saveAvatarData}
                      hasError={!!this.state.errors['avatarData']}
                    />
                    <p>
                      This will show up in search results! We recommend a high-resolution profile image, at least 800x800px.
                    </p>
                  </div>
                  : ''
              }
              {
                this.state.page === 2
                  ?
                  <div className="section-information__content">
                    <div
                      className="section-information__content__grid"
                    >
                      <Field
                        fieldFor={`tutor-application__subject`}
                        label="Preferred Subject"
                        className="grid-1-2"
                      >
                        <Select
                          name={`tutor-application__subject`}
                          placeholder="Please Select"
                          options={SUBJECT_OPTIONS}
                          noMaxHeight={true}
                          value={this.state.preferredSubject}
                          onChange={this.updateAttribute('preferredSubject')}
                          hasError={!!this.state.errors['preferredSubject']}
                        />
                      </Field>
                      <Field
                        fieldFor={`tutor-application__subjectQualifications`}
                        label={`Why This Subject?`}
                        className="grid-1-2"
                      >
                        <Input
                          name={`tutor-application__subjectQualifications`}
                          placeholder={`As a student, why should I work with you?`}
                          value={this.state.subjectQualifications}
                          onChange={this.updateAttribute('subjectQualifications')}
                          hasError={!!this.state.errors['subjectQualifications']}
                        />
                      </Field>
                      <Field
                        fieldFor={`tutor-application__yearsExp`}
                        label="Years of Experience"
                      >
                        <Input
                          name={`tutor-application__yearsExp`}
                          placeholder="Years of Experience"
                          value={this.state.yearsExp}
                          onChange={this.updateAttribute('yearsExp')}
                          hasError={!!this.state.errors['yearsExp']}
                        />
                      </Field>
                      <Field
                        fieldFor={`tutor-application__zip`}
                        label="ZIP Code"
                      >
                        <Input
                          name={`tutor-application__zip`}
                          placeholder="ZIP Code"
                          value={this.state.zip}
                          onChange={this.updateAttribute('zip')}
                          hasError={!!this.state.errors['zip']}
                        />
                      </Field>
                    </div>
                  </div>
                  : ''
              }
              {
                this.state.page === 3
                  ?
                  <>
                    <FormTutorEducation
                      educations={this.state.educations}
                      setEducations={this.setEducations}
                      onSubmit={this.nextPage}
                    />
                  </>
                  : ''
              }
              {
                this.state.page === 4
                  ?
                  <>
                    <FormTutorReferences
                      references={this.state.references}
                      setReferences={this.setReferences}
                      onSubmit={this.nextPage}
                    />
                  </>
                  : ''
              }
              {
                this.state.page === 5
                  ?
                  <>
                  <div className="section-information__content">
                    We're looking forward to getting to know you! Expect an email from us within the next 1-2 business days.
                  </div>
                  </>
                  : ''
              }


              {
                this.state.page < 3
                  ? this.renderActionButtons()
                  : ''
              }
          </Panel>
          {
            /*
          this.state.page === 1
            ?
              <div className="section-information__block">
                <Panel
                  title="Step 1/4: Introduce Yourself"
                  fullWidth={true}
                  noMobileBorder={true}
                  boxShadow={true}
                  noScroll={true}
                >
                  <FormTutorWhy
                    updateBio={this.updateAttribute('bio')}
                    updateTagline={this.updateAttribute('tagline')}
                    updatePreferredSubject={this.updateAttribute('preferredSubject')}
                    updateFirstName={this.updateAttribute('firstName')}
                    updateLastName={this.updateAttribute('lastName')}
                    updateEmail={this.updateAttribute('email')}

                    bio={this.state.bio}
                    tagline={this.state.tagline}
                    preferredSubject={this.state.preferredSubject}
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    email={this.state.email}
                    errors={this.state.errors}
                    submissionErr={this.state.submissionErr}

                    onSubmit={this.nextPage}
                  />
                </Panel>
              </div>
            :
              ''
          }
          {
            this.state.page === 2
              ?
                <div className="section-information__block">
                  <Panel
                    title="Step 2/4: Tutoring Information"
                    fullWidth={true}
                    noMobileBorder={true}
                    boxShadow={true}
                    noScroll={true}
                  >
                    <FormTutorInformation
                      updateZip={this.updateAttribute('zip')}
                      updateYrsExp={this.updateAttribute('yearsExp')}
                      updateAbleToTravel={this.updateAttribute('ableToTravel')}
                      updatephoneNumber={this.updateAttribute('phoneNumber')}

                      zip={this.state.zip}
                      yearsExp={this.state.yearsExp}
                      ableToTravel={this.state.ableToTravel}
                      phoneNumber={this.state.phoneNumber}
                      errors={this.state.errors}

                      onSubmit={this.nextPage}
                    />
                  </Panel>
                </div>
              :
                ''
          }
          {
            this.state.page === 3
              ?
                <div className="section-information__block">
                  <Panel
                    title="Step 3/4: Educational Background"
                    fullWidth={true}
                    action={this.addEducation}
                    noMobileBorder={true}
                    boxShadow={true}
                    noScroll={true}
                  >
                    <FormTutorEducation
                      educations={this.state.educations}
                      setEducations={this.setEducations}
                      errors={this.state.errors}
                      onSubmit={this.updateAttribute('educations', this.nextPage)}
                    />
                  </Panel>
                </div>
              :
                ''
          }
          {
            this.state.page === 4
              ?
                <div className="section-information__block">
                  <Panel
                    title="Step 4/4: Tutoring Experience"
                    fullWidth={true}
                    action={this.addReference}
                    noMobileBorder={true}
                    boxShadow={true}
                    noScroll={true}
                  >
                    <>
                      <FormTutorReferences
                        references={this.state.references}
                        errors={this.state.errors}
                        referenceRequestText={this.state.referenceRequestText}
                        updateReferenceRequestText={this.updateAttribute('referenceRequestText')}
                        onSubmit={this.updateAttribute('references', this.nextPage)}
                      />
                    </>
                  </Panel>
                </div>
              :
                ''
              */
          }

        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: signUpData => dispatch(registerUser(signUpData)),
    toggleSignupSuccessModal: open => dispatch(toggleSignupSuccessModal(open)),
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser.attributes,
    isSignedIn: state.auth.currentUser.isSignedIn,
    showSignupSuccessModal: state.signupSuccessModal.open,
  }
}

ApplicationInfo.propTypes = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplicationInfo)



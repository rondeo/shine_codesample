import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Panel from 'components/Panel'
import Button from 'components/Button'
import Field from 'components/Field'
import FieldCheckbox from 'components/FieldCheckbox'
import FormAvailability from 'components/FormAvailability'
import Input from 'components/Input'
import Separator from 'components/Separator'
import AccountPanel from 'components/AccountPanel'
import FormAccountSettings from 'components/FormAccountSettings'
import FormContactInfo from 'components/FormContactInfo'
import FormAddress from 'components/FormAddress'
import FormBankInformation from 'components/FormBankInformation'
import FormBillingMethod from 'components/FormBillingMethod'
import FormPassword from 'components/FormPassword'
import GroupAccountPanel from 'components/GroupAccountPanel'
import GroupEditItems from 'components/GroupEditItems'
import GroupFeedback from 'components/GroupFeedback'
import Tutor from 'components/Tutor'
import TutorCardPrice from 'components/TutorCardPrice'
import IconClose2 from 'images/svg/close2'
import IconPen from 'images/svg/pen'
import imgDefault from 'images/default.png'
import axios from 'axios'

import {
  API_PREFIX
} from '../../constants'

import {
  SUBJECT_OPTIONS,
  SUBJECT_OPTIONS_HASH,
  FIELDS_TIMES
} from 'utils/constants.js'


//import css from './style.scss'

class SectionAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      tutorProfileEdit: false,
      contactInfoEdit: false,
      addressEdit: false,
      acceptingNewStudents: false,
      availability: [],
      imageUrl: false,
    }
    this.fetchProfile = ::this.fetchProfile
    this.toggleProfileSetting = ::this.toggleProfileSetting
    this.toggleContactInfo = ::this.toggleContactInfo
    this.toggleAddress = ::this.toggleAddress
    this.updateProfile = ::this.updateProfile
    this.setUserProfile = ::this.setUserProfile
    this.setAcceptAttribute = ::this.setAcceptAttribute
    this.updateAvailability = ::this.updateAvailability
  }

  selectAvailabilityItem(time) {
    this.updateProfile({availability: [time, ...this.state.availability]})

    this.setState({
      availability: [time, ...this.state.availability],
    })
  }
  deselectAvailabilityItem(time) {
    let remainingAvailability = [...this.state.availability]
      .filter(i => i !== time)

    this.updateProfile({availability: remainingAvailability})

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


  toggleProfileSetting() {
    this.setState({tutorProfileEdit: !this.state.tutorProfileEdit});
  }

  toggleContactInfo() {
    this.setState({contactInfoEdit: !this.state.contactInfoEdit});
  }

  toggleAddress() {
    this.setState({addressEdit: !this.state.addressEdit});
  }

  setUserProfile(profile) {
    this.setState({user: profile});
  }

  componentWillMount() {
    this.fetchProfile();
  }

  fetchProfile() {
    axios.get(
      `${API_PREFIX}/user_profiles/profile`, {}, {}
    )
      .then(res => {
        this.setState({user: res.data.profile});
        this.setState({availability: res.data.profile.availability});
        this.setState({acceptingNewStudents: res.data.profile.acceptingNewStudents});
        if(res.data.profile.imageUrl) {
          this.setState({imageUrl: res.data.profile.imageUrl});
        } else {
          this.setState({imageUrl: imgDefault});
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  setAcceptAttribute(e) {
    let val = e.target.type === "checkbox" ? e.target.checked : e.target.value
    this.setState({
      [e.target.name]: val,
    })

    let userParams = {
      accepting_new_students: e.target.checked,
    }

    this.updateProfile(userParams)
  }

  updateProfile(userParams) {
    axios.put(
      `${API_PREFIX}/user_profiles/${this.state.user.id}`,
      { user: userParams },
      {},
    )
      .then(res => {
        this.setState({user: res.data.user});
        this.setState({tutorProfileEdit: false});
        this.setState({contactInfoEdit: false});
        this.setState({addressEdit: false});
      })
      .catch(err => {
        // TODO: Insert a banner (flash message) "Error updating Profile" here
        // - flash message component w global state/Redux?
        //alert(err.response.data.errors)
      })
  }

  render() {
    return (
      <section className="section-account">
        <div className="container-fluid">
          <div className="section-account__content">
            <div className="section-account__left">
              <div className="section-account__left__content">
              {
                this.props.accountParent
                  ?
                    <div>
                      <div className="section-account__item">
                        <div className="
                          section-account__item_wrapper
                          section-account__item_wrapper--bordered
                          section-account__item_wrapper--padded
                        ">
                          <Tutor
                            imageUrl={this.state.imageUrl}
                            name={this.state.user.name}
                            subtitle={this.state.user.tagLine}
                            clickable={true}
                          />
                        </div>
                      </div>
                      <div className="section-account__item">
                        <div className="section-account__item_wrapper">
                          <GroupEditItems
                            accountSectionId="section-account__Contact"
                            billingSectionId="section-account__Billing"
                            passwordSectionId="section-account__Password"
                            locationSectionId="section-account__Location"
                          />
                        </div>
                      </div>
                    </div>
                  : ''
              }
              {
                // is Tutor
                this.props.accountTutor
                  ?
                    <div>
                      <div className="section-account__item">
                        <div className="section-account__item_wrapper">
                          <Tutor
                            imageUrl={this.state.imageUrl}
                            name={this.state.user.name}
                            subtitle={this.state.user.tagLine}
                            clickable={true}
                          />
                        </div>
                      </div>
                      <div className="section-account__item">
                        <FieldCheckbox
                          title="Accepting New Students"
                          name="acceptingNewStudents"
                          checked={this.state.acceptingNewStudents}
                          onChange={this.setAcceptAttribute}
                          toggle={true}
                        />
                      </div>
                      {
                        /*
                        <div className="section-account__item">
                          <FieldCheckbox
                            title="Hide My Profile"
                          />
                        </div>
                        */
                      }
                      <div className="section-account__item">
                        <Panel
                          title="My Availability"
                        >
                          <FormAvailability
                            availability={this.state.availability}
                            updateAvailability={this.updateAvailability}
                          />
                        </Panel>
                      </div>
                    </div>
                  : ''
              }
              {
                // public Tutor Profile
                !this.props.accountParent && !this.props.accountTutor
                  ?
                    <div>
                      <div className="section-account__item d-flex justify-center">
                        <TutorCardPrice
                          imageUrl={this.props.user.imageUrl}
                          tutorName={this.props.user.name}
                          reviews={this.props.user.confirmedReferences}
                          priceCents={this.state.user.hourlyRateCents}
                          tagline={this.props.user.tagline}
                        />
                      </div>
                      <div className="section-account__item inner-fw d-flex justify-center">
                        <Button
                          text={`Contact ${this.props.user.firstName}`}
                          orange={true}
                          isBig={true}
                          onClick={this.props.openContactModal}
                        />
                      </div>
                      <div className="section-account__item">
                        <Panel
                          title="Availability"
                          textLeft={true}
                          small={true}
                        >
                          <GroupAccountPanel
                            mod={true}
                            items={[
                              { title: 'Monday', text: '11am - 1pm | 3pm - 7pm', uppercase: true },
                              { title: 'Tuesday', text: '5pm - 7pm', uppercase: true  },
                              { title: 'Wednesday', text: '11am - 1pm | 3pm - 7pm', uppercase: true },
                              { title: 'Thursday', text: '11am - 1pm | 3pm - 7pm', uppercase: true },
                              { title: 'Friday', text: '11am - 1pm | 3pm - 7pm | 8px - 9pm', uppercase: true }
                            ]}
                          />
                        </Panel>
                      </div>
                      <div className="section-account__item">
                        <Panel
                          title="Subject"
                          textLeft={true}
                          small={true}
                        >
                          <GroupAccountPanel
                            mod={true}
                            items={[
                              { title: 'Business', text: 'Public speaking'},
                              { title: 'Computer', text: 'Microsoft Word'},
                              { title: 'Corporate Training', text: 'Grammar, Public Speaking, Microsoft Word, Proofreading'},
                              { title: 'Elementary Education', text: 'Grammar, Public Speaking, Microsoft Word, Proofreading'},
                              { title: 'English', text: 'ACT English,  ACT Reading,  English, Grammar,  Public Speaking, Reading,  SAT Reading,  Writing, Proofreading, SAT Writing, Spelling, Vocabulary'}
                            ]}
                          />
                        </Panel>
                      </div>
                    </div>
                  :
                    ''
              }
            </div>
            </div>
            <div className="section-account__right">
              {
                this.props.accountParent
                  ?
                    <div>
                      <div className="section-account__item">
                        <Panel
                          id="section-account__Contact"
                          title="Account Information"
                          actionButtonWithClick={true}
                          icon={<IconPen />}
                          text={ this.state.contactInfoEdit ? "Cancel" : "Edit" }
                          buttonAction={ this.toggleContactInfo }
                        >
                        {
                          this.state.contactInfoEdit
                            ?
                              <FormContactInfo
                                onSubmit={this.updateProfile}
                                accountType='Learner'
                                editing={this.state.contactInfoEdit}

                                email={this.state.user.email}
                                firstName={this.state.user.firstName}
                                lastName={this.state.user.lastName}
                                phone={this.state.user.phoneNumber}
                                studentName={this.state.user.studentName}
                              />
                            :
                              <GroupAccountPanel
                                account={true}
                                perLine={2}
                                items={[
                                  { title: 'Name', text: this.state.user.name, separator: true },
                                  { title: 'Phone', text: this.state.user.phoneNumber, separator: true },
                                  { title: 'Student\'s Name', text: this.state.user.studentName, separator: false },
                                  { title: 'Email Address', text: this.state.user.email, separator: false },
                                ]}
                              />
                        }
                        </Panel>
                      </div>

                      <div className="section-account__item">
                        <Panel
                          id="section-account__Billing"
                          title="Payment Info"
                          fullWidth={true}
                        >
                          <FormBillingMethod
                            brand={this.state.user && this.state.user.brand}
                            last4={this.state.user && this.state.user.last4}
                            setUserProfile={this.setUserProfile}
                          />
                        </Panel>
                      </div>
                      <div className="section-account__item">
                        <Panel
                          id="section-account__Password"
                          title="Password & Security"
                        >
                          <FormPassword />
                        </Panel>
                      </div>
                      <div className="section-account__item">
                        <Panel
                          id="section-account__Location"
                          title="My Neighborhood"
                          actionButtonWithClick={true}
                          icon={<IconPen />}
                          text={ this.state.addressEdit ? "Save" : "Edit" }
                          buttonAction={ this.state.addressEdit ? this.updateProfile : this.toggleAddress }
                        >
                          {
                            this.state.addressEdit
                              ?
                                <FormAddress
                                  onSubmit={this.updateProfile}
                                  user={this.state.user}
                                />
                              :
                                <div>
                                  <AccountPanel
                                    title="Address"
                                    text={this.state.user.streetAddress}
                                  >
                                    <div>{this.state.user.city}{this.state.user.city && this.state.user.state ? ', ' : ''}{this.state.user.state} {this.state.user.zip}</div>
                                  </AccountPanel>
                                  <div className="location__wrapper">
                                    <div className="section-account__maps">
                                      {
                                        this.state.user.latitude && this.state.user.longitude
                                          ?
                                            <iframe
                                              src={`
                                                https://maps.google.com/maps?q=${this.state.user.latitude},${this.state.user.longitude}&hl=en&z=14&output=embed
                                              `}
                                              frameBorder="0"
                                              allowFullScreen
                                            />
                                          :
                                          <span style={{fontSize: '1.0rem'}}>
                                            Please add your ZIP code to view your neighborhood info.
                                          </span>
                                      }
                                    </div>
                                  </div>
                                </div>
                          }
                        </Panel>
                      </div>
                    </div>
                  : ''
              }
              {
                this.props.accountTutor
                  ?
                    <div>
                      <div className="section-account__item">
                        <Panel
                          title="Tutoring Profile"
                          actionButtonWithClick={true}
                          icon={ this.state.tutorProfileEdit ? false : <IconPen /> }
                          text={ this.state.tutorProfileEdit ? "Cancel" : "" }
                          buttonAction={ this.toggleProfileSetting }
                        >
                          <FormAccountSettings
                            onSubmit={this.updateProfile}
                            editing={this.state.tutorProfileEdit}

                            gender={this.state.user.gender}
                            travelDistance={this.state.user.travelDistance}
                            subject={this.state.user.subject}
                            yearsExp={this.state.user.yearsExp}
                            subjectQualifications={this.state.user.subjectQualifications}
                            hourlyRateCents={this.state.user.hourlyRateCents}
                          />
                        </Panel>
                      </div>
                      <div className="section-account__item">
                        <Panel
                          title="My Contact Information"
                          actionButtonWithClick={true}
                          icon={ this.state.contactInfoEdit ? false : <IconPen />}
                          text={ this.state.contactInfoEdit ? "Cancel" : "" }
                          buttonAction={ this.toggleContactInfo }
                        >
                          <FormContactInfo
                            onSubmit={this.updateProfile}
                            accountType='Teacher'
                            editing={this.state.contactInfoEdit}

                            email={this.state.user.email}
                            firstName={this.state.user.firstName}
                            lastName={this.state.user.lastName}
                            phone={this.state.user.phoneNumber}
                            studentName={this.state.user.studentName}
                          />
                        </Panel>
                      </div>
                      <div className="section-account__item">
                        <Panel
                          title="My Payments"
                        >
                          <FormBankInformation
                            user={this.state.user}
                          />
                        </Panel>
                      </div>
                      <div className="section-account__item">
                        <Panel
                          title="Password & Security"
                        >
                          <FormPassword />
                        </Panel>
                      </div>

                      <div className="section-account__item">
                      </div>
                      <div className="section-account__item">
                        <Panel
                          title="My Tutoring Location"
                          actionButtonWithClick={true}
                          icon={ this.state.addressEdit ? false : <IconPen /> }
                          text={ this.state.addressEdit ? "Cancel" : "" }
                          buttonAction={ this.toggleAddress }
                        >
                        {
                          this.state.addressEdit
                            ?
                              <FormAddress
                                onSubmit={this.updateProfile}
                                user={this.state.user}
                              />
                            :
                              <div>
                                <AccountPanel
                                  title="Tutoring Address"
                                  text={this.state.user.streetAddress}
                                >
                                  <div>{this.state.user.city}{this.state.user.city && this.state.user.state ? ', ' : ''}{this.state.user.state} {this.state.user.zip}</div>
                                </AccountPanel>
                                <div className="location__wrapper">
                                  <div className="section-account__maps">
                                    {
                                      this.state.user.latitude && this.state.user.longitude
                                        ?
                                          <iframe
                                            src={`
                                              https://maps.google.com/maps?q=${this.state.user.latitude},${this.state.user.longitude}&hl=en&z=14&output=embed
                                            `}
                                            frameBorder="0"
                                            allowFullScreen
                                          />
                                        :
                                        <span className="update-zip">
                                          Please update your ZIP to view your tutoring map.
                                        </span>
                                    }
                                  </div>
                                </div>
                              </div>
                            }
                        </Panel>
                      </div>
                    </div>
                  : ''
              }
              {
                // Profile page
                !this.props.accountParent && !this.props.accountTutor
                  ?
                    <div>
                      <div className="section-account__item">
                        <Panel
                          title="Why I Tutor"
                          textLeft={true}
                          fullWidth={true}
                          small={true}
                        >
                          <AccountPanel
                            text={this.props.user.bio}
                          />
                        </Panel>
                      </div>
                      <div className="section-account__item">
                        <Panel
                          title="Education"
                          textLeft={true}
                          small={true}
                        >
                          <GroupAccountPanel
                            bordered={true}
                            mod={true}
                            items={
                              (this.props.user.educations || []).map(e => (
                                {
                                  title: `${e.degree}, ${e.course}, ${e.institute}`,
                                  text: 'Some text lorem',
                                }
                              ))
                            }
                          />
                        </Panel>
                      </div>
                      {
                        /*
                      <div className="section-account__item">
                        <Panel
                          title="Experience"
                          textLeft={true}
                          small={true}
                        >
                          <GroupAccountPanel
                            mod={true}
                            items={[
                              { title: 'Lorem ipsum (2006 - 2011)', text: 'Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
                              { title: 'Lorem ipsum (2006 - 2011)', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
                              { title : 'Lorem ipsum (2006 - 2011)', text : 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.' }
                            ]}
                          />
                        </Panel>
                      </div>
                      */
                      }
                      <div className="section-account__item">
                        <Panel
                          title="Work History & Feedback"
                          fullWidth={true}
                          textLeft={true}
                          small={true}
                        >
                          <GroupFeedback
                            references={this.props.user.confirmedReferences}
                          />
                        </Panel>
                      </div>
                    </div>
                  : ''
              }
            </div>
          </div>
        </div>
      </section>
    )
  }
}

SectionAccount.defaultProps = {
  user: { confirmedReferences: [], educations: [], },
}
SectionAccount.propTypes = {
  accountParent: PropTypes.bool,
  accountTutor: PropTypes.bool,
  user: PropTypes.object.isRequired,
}

export default SectionAccount


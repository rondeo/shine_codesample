import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Field from 'components/Field'
import Input from 'components/Input'
import Radio from 'components/Radio'
import Select from 'components/Select'
import Button from 'components/Button'
import FieldCheckbox from 'components/FieldCheckbox'
import GroupAccountPanel from 'components/GroupAccountPanel'
import {
  SUBJECT_OPTIONS,
  SUBJECT_OPTIONS_HASH,
} from 'utils/constants.js'
//import css from './style.scss'

class FormAccountSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

    this.renderGenderFields = ::this.renderGenderFields
    this.renderTravelDistanceFields = ::this.renderTravelDistanceFields
    this.renderBioFields = ::this.renderBioFields
    this.renderHourlyRateFields = ::this.renderHourlyRateFields
    this.renderSubjectFields = ::this.renderSubjectFields
    this.renderYearsExpFields = ::this.renderYearsExpFields
    this.renderSubjectWhyFields = ::this.renderSubjectWhyFields

    this.setAttribute = ::this.setAttribute
    this.validateForm  = ::this.validateForm
    this.submit = ::this.submit
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      gender: newProps.gender,
      travel: newProps.travelDistance,
      bio: newProps.bio,
      yearsExp: newProps.yearsExp,
      subject: newProps.subject,
      subjectQualifications: newProps.subjectQualifications,
      hourlyRate: (newProps.hourlyRateCents && (parseFloat(newProps.hourlyRateCents) / 100.0).toFixed(2)) || '',
    })
  }

  setAttribute(e) {
    let val = e.target.type === "checkbox" ? e.target.checked : e.target.value

    this.setState({
      [e.target.name]: val,
    })
  }

  submit() {
    if(this.validateForm()) {
      return false;
    }
    let userParams = {
      gender: this.state.gender,
      travel_distance: this.state.travel,
      bio: this.state.bio,
      years_exp: this.state.yearsExp,
      subject: this.state.subject,
      subject_qualifications: this.state.subjectQualifications,
      hourly_rate_cents: Math.round(parseFloat(this.state.hourlyRate) * 100), // translate to cents
      accepting_new_students: this.state.acceptingNewStudents,
    }
    this.props.onSubmit(userParams)
  }

  validateForm() {
    this.setState({
      bioErr: false,
      expErr: false,
      subErr: false,
      subjQualErr: false,
      rateErr: false
    })
    let error = false;

    if(!this.state.subjectQualifications) {
      error = true
      this.setState({subjQualErr: true})
    }
    if (
      !this.state.hourlyRate ||
      isNaN(parseFloat(this.state.hourlyRate)) ||   // hourlyRate is null
      parseFloat(this.state.hourlyRate) < 1
    ) {
      error = true
      this.setState({rateErr: true})
    }
    return error;
  }

  renderGenderFields() {
    return (
      this.props.editing
        ?
          <div className="sex__wrapper">
            <div className="sex__item">
              <Radio
                id="1"
                name="gender"
                label="Male"
                value="Male"
                checked={this.state.gender == 'Male'}
                onClick={this.setAttribute}
              />
            </div>
            <div className="sex__item">
              <Radio
                id="2"
                name="gender"
                value="Female"
                label="Female"
                checked={this.state.gender == 'Female'}
                onClick={this.setAttribute}
              />
            </div>
          </div>
        :
          this.state.gender || ""
      )

  }
  renderTravelDistanceFields() {
    return (
      this.props.editing
        ?
          <div className="sex__wrapper">
            <div className="sex__item">
              <Radio
                id="3"
                name="travel"
                label="5 mi"
                value="5"
                checked={this.state.travel == '5'}
                onClick={this.setAttribute}
              />
            </div>
            <div className="sex__item">
              <Radio
                id="4"
                name="travel"
                label="10 mi."
                value="10"
                checked={this.state.travel == '10'}
                onClick={this.setAttribute}
              />
            </div>
            <div className="sex__item">
              <Radio
                id="5"
                name="travel"
                label="25 mi."
                value="25"
                checked={this.state.travel == '25'}
                onClick={this.setAttribute}
              />
            </div>
          </div>
        :
          this.state.travel && (this.state.travel + " Miles")
    )
  }
  renderSubjectFields() {
    return (
      this.props.editing
        ?
          <Select
            id="information-7"
            name="subject"
            options={SUBJECT_OPTIONS}
            value={this.state.subject}
            onChange={this.setAttribute}
          />
        :
          this.state.subject && SUBJECT_OPTIONS_HASH[this.state.subject]
    )
  }
  renderBioFields() {
    return (
      this.props.editing
        ?
          <Input
            textarea={true}
            name="bio"
            placeholder="Tell us about yourself."
            value={this.state.bio}
            onChange={this.setAttribute}
            hasError={this.state.bioErr}
          />
        :
          this.state.bio
    )
  }
  renderSubjectWhyFields() {
    return (
      this.props.editing
        ?
          <Input
            name="form-account-settings__bio"
            placeholder="Your Services"
            name="subjectQualifications"
            value={this.state.subjectQualifications}
            onChange={this.setAttribute}
            hasError={this.state.subjQualErr}
          />
        :
          this.state.subjectQualifications
      )
  }
  renderYearsExpFields() {
    return (
      this.props.editing
        ?
          <Select
            id="information-8"
            name="yearsExp"
            options={
              [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19, 20].map(n => (
                { name: `${n} years`, value: n }
              ))
            }
            value={this.state.yearsExp}
            onChange={this.setAttribute}
          />
        :
          this.state.yearsExp + ' Years'
    )
  }
  renderHourlyRateFields() {
    return (
      this.props.editing
        ?
          <Input
            name="form-account-settings__bio"
            placeholder="$ ??.??"
            name="hourlyRate"
            value={this.state.hourlyRate}
            onChange={this.setAttribute}
            hasError={this.state.rateErr}
          />
        :
          this.state.hourlyRate && parseFloat(this.state.hourlyRate) > 0
            ? '$ ' + this.state.hourlyRate
            : '$ ?.??'
    )
  }

  render() {
    return (
      <form className="form-account-settings">
        <GroupAccountPanel
          account={true}
          perLine={2}
          items={[
            { title: 'Preferred Subject', text: this.renderSubjectFields(), separator: true  },
            { title: 'Hourly Rate', text: this.renderHourlyRateFields(), separator: true  },
            { title: 'Subject Headline', text: this.renderSubjectWhyFields(), separator: true  },
            { title: 'Subject Years of Experience', text: this.renderYearsExpFields(), separator: true },
            { title: 'Gender', text: this.renderGenderFields(), },
            { title: 'Travel Distance', text: this.renderTravelDistanceFields(), },
          ]}
        />

        {
          this.props.editing
            ?
              <div className="">
                <Button
                  orange={true}
                  bigWidth={true}
                  className="form-account-settings__submit"
                  onClick={this.submit}
                >
                  Save
                </Button>
              </div>
            :
              ''
        }
      </form>
    )
  }
}

FormAccountSettings.propTypes = {
  onSubmit: PropTypes.func,
  editing: PropTypes.bool,
  gender: PropTypes.string,
  travelDistance: PropTypes.number,
  subject: PropTypes.string,
  subjectQualifications: PropTypes.string,
  yearsExp: PropTypes.number,
  hourlyRateCents: PropTypes.number,
  bio: PropTypes.string,
}

export default FormAccountSettings


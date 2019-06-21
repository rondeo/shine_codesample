import React, {Component, Fragment} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Field from 'components/Field'
import Input from 'components/Input'
import Select from 'components/Select'
import Button from 'components/Button'
import {
  DEGREE_OPTIONS,
} from 'utils/constants.js'
//import css from './style.scss'

const BLANK_EDU = {
  institute: '',
  degree: '',
  course: '',
}

class FormTutorEducation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      educations: this.props.educations,
      educationIdx: this.props.educationIdx || 0,
      currentEducation: { ...this.props.educations[this.props.educationIdx || 0] },

      errorInstitute: false,
      errorCourse: false,
      errorDegree: false,
    }

    this.validateEducation = ::this.validateEducation
    this.updateCurrentEducation = ::this.updateCurrentEducation
    this.saveCurrentEducation = ::this.saveCurrentEducation
    this.allValidEducations = ::this.allValidEducations
    this.nextEducation = ::this.nextEducation
    this.submitEducations = ::this.submitEducations
    this.completeEducations = ::this.completeEducations
  }
  componentWillReceiveProps(newProps) {
    if (
      newProps.educations &&
      (
        // is 1st edu or a new edu
        newProps.educations.length === 1 ||
        newProps.educations.length > this.props.educations.length
      )
    ) {
      let educations = [...newProps.educations]

      this.setState({
        educations: educations,
        // cool trick: allocates a new object if we are over the length of the array, or uses existing if we are not
        currentEducation: { ...educations[this.state.educationIdx] },
      })
    }
  }

  updateCurrentEducation(attrName) {
    let self = this
    return (e) => {
      let edu = { ...this.state.currentEducation }
      edu[attrName] = e.target.value

      self.setState({
        currentEducation: edu,
      })
    }
  }


  validateEducation() {
    this.setState({
      errorDegree: false,
      errorCourse: false,
      errorInstitute: false,
    })
    let edu = this.state.currentEducation
    let errors = {}

    if (!edu.institute || edu.institute.length < 1) {
      errors.errorInstitute = true
    }
    if (!edu.degree || edu.degree.length < 1) {
      errors.errorDegree = true
    }
    if (!edu.course || edu.course.length < 1) {
      errors.errorCourse = true
    }

    this.setState({
      ...errors,
    })

    return Object.keys(errors).length === 0
  }

  saveCurrentEducation() {
    let currentEdu = { ...this.state.currentEducation }

    let edus = [...this.state.educations]
    edus.splice(this.state.educationIdx, 1, currentEdu)
    this.setState({
      educations: edus,
    },
      this.submitEducations
    )
  }

  // save valid educations to parent component
  // - use fake event as handler expects an onClick-style event
  submitEducations() {
    let edus = this.allValidEducations()
    let edusEvent = {target: {value: edus} }
    this.props.setEducations(edusEvent)
  }

  // strip invalid educations
  // - ensure at least 1 education is provided
  allValidEducations() {
    let edus = [...this.state.educations]
    edus = edus.filter(e => (
      e.institute && e.institute.length > 0 ||
      e.degree && e.degree.length > 0 ||
      e.course && e.course.length > 0
    ))

    if(edus.length < 1) {
      edus = [{...BLANK_EDU}]
    }

    return edus
  }

  nextEducation() {
    let validEdu = this.validateEducation()
    if (!validEdu) return false

    // save to local edus array
    // then save local edus to parent
    this.saveCurrentEducation()

    // move
    this.setState({
      educationIdx: this.state.educationIdx+1,
      currentEducation: { ...this.state.educations[this.state.educationIdx+1] },
    })
  }

  completeEducations() {
    // save to local edus array, even if invalid, in case is valid
    // then save local edus to parent
    this.saveCurrentEducation()

    // complete Edus section
    this.props.onSubmit()
  }

  render() {
    let i = this.state.educationIdx

    return (
      <div className="form-educations">
        <form className="form-container">

          <div className="form-information__field grid-1-2">
            <Field
              fieldFor={`educations-${i}-school`}
              label="University, College, or School Name *"
            >
              <Input
                name={`educations-${i}-school`}
                placeholder="Institution Name"
                value={this.state.currentEducation.institute || ''}
                onChange={this.updateCurrentEducation('institute')}
                hasError={this.state.errorInstitute}
              />
            </Field>
          </div>

          <div className="form-information__field">
            <Field
              fieldFor={`educations-${i}-degree`}
              label="Degree *"
            >
              <Select
                small={true}
                name={`educations-${i}-degree`}
                placeholder="Please Select"
                options={DEGREE_OPTIONS}
                value={this.state.currentEducation.degree || false}
                onChange={this.updateCurrentEducation('degree')}
                hasError={this.state.errorDegree}
              />
            </Field>
          </div>

          <div className="form-information__field">
            <Field
              fieldFor={`educations-${i}-areaOfStudy`}
              label="Area of Study *"
            >
              <Input
                name={`educations-${i}-areaOfStudy`}
                placeholder="Area of Study"
                value={this.state.currentEducation.course || ''}
                onChange={this.updateCurrentEducation('course')}
                hasError={this.state.errorCourse}
              />
            </Field>
          </div>
        </form>

        <div className="form-educations__action-buttons">
          <Button
            grey={true}
            onClick={this.completeEducations}
          >
            DONE w/ EDUS
          </Button>
          <Button
            orange={true}
            onClick={this.nextEducation}
          >
            ADD ANOTHER EDU
          </Button>
        </div>
      </div>
    )
  }
}

FormTutorEducation.propTypes = {
  onSubmit: PropTypes.func,
  actionButtons: PropTypes.func,
}

export default FormTutorEducation


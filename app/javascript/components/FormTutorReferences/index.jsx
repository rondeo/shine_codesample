import React, {Component, Fragment} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import Input from 'components/Input'
import Field from 'components/Field'
import FieldCheckbox from 'components/FieldCheckbox'
import Select from 'components/Select'
import {
  VALID_EMAIL_REGEX,
} from '../../constants'

class FormTutorReferences extends Component {
  constructor(props) {
    super(props)
    this.state = {
      references: this.props.references,
      referenceIdx: this.props.referenceIdx || 0,
      currentReference: { ...this.props.references[this.props.referenceIdx || 0] },

      errorFName: false,
      errorEmail: false,
    }

    this.validateReference = ::this.validateReference
    this.updateCurrentReference = ::this.updateCurrentReference
    this.saveCurrentReference = ::this.saveCurrentReference
    this.allValidReferences = ::this.allValidReferences
    this.nextReference = ::this.nextReference
    this.submitReferences = ::this.submitReferences
    this.completeReferences = ::this.completeReferences
  }
  componentWillReceiveProps(newProps) {
    if (
      // if it's a "NewReference" coming from the Panel button
      // - add it to the end since we haven't saved these refs from state yet
      newProps.references
    ) {
      let references = [
        ...newProps.references,
      ]
      this.setState({
        references: references,
        // cool trick: allocates a new object if we are over the length of the array, or uses existing if we are not
        currentReference: { ...references[this.state.referenceIdx] },
      })
    }
  }

  updateCurrentReference(attrName) {
    let self = this
    return (e) => {
      let reference = {...this.state.currentReference}
      reference[attrName] = e.target.value

      self.setState({
        currentReference: reference,
      })
    }
  }

  validateReference() {
    this.setState({
      errorHonorific: false,
      errorFName: false,
      errorLastI: false,
      errorEmail: false,
    })
    let reference = this.state.currentReference
    let errors = {}

    if (!reference.fName || reference.fName.length < 1) {
      errors.errorFName = true
    }
    if (!reference.email || !VALID_EMAIL_REGEX.test(reference.email)) {
      errors.errorEmail = true
    }

    this.setState({
      ...errors,
    })

    return Object.keys(errors).length === 0
  }

  nextReference() {
    let validReference = this.validateReference()
    if (!validReference) return

    this.saveCurrentReference()

    this.setState({
      referenceIdx: this.state.referenceIdx+1,
      currentReference: { ...this.state.references[this.state.referenceIdx+1] },
    })
  }

  completeReferences() {
    this.saveCurrentReference()

    this.props.onSubmit && this.props.onSubmit()
  }

  // strip invalid references
  allValidReferences() {
    let references = [...this.state.references]
    references = references.filter(e => (
      e.fName && e.fName.length > 0 &&
      e.email && e.email.length > 0
    ))

    return references
  }

  saveCurrentReference() {
    let currentReference = { ...this.state.currentReference }

    let references = [...this.state.references]
    references.splice(this.state.referenceIdx, 1, currentReference)
    this.setState({
      references: references,
    },
      this.submitReferences
    )
  }

  // save valid references to parent component
  // - use fake event as handler expects an onClick-style event
  submitReferences() {
    let refs = this.allValidReferences()
    let referencesEvent = { target: {value: refs} }
    this.props.setReferences(referencesEvent)
  }

  render() {
    let i = this.state.referenceIdx
    let r = this.state.currentReference

    return (
      <div className="form-tutor-references">
        <form className="form-container">
          <div className="form-information__field grid-1-4">
            <Button
              orange={true}
              radius={true}
              noHover={true}
            >
              <div>
                Help your tutor profile stand out from the crowd with an enthusiastic reference!
              </div>
            </Button>
          </div>

          <>
            <div className="form-information__field grid-1-2">
              <Field
                fieldFor={`reference-${i}-first-name`}
                label="First Name"
              >
                <Input
                  name={`reference-${i}-first-name`}
                  placeholder="First Name"
                  value={r.fName || ''}
                  onChange={this.updateCurrentReference('fName')}
                  hasError={this.state.errorFName}
                />
              </Field>
            </div>

            <div className="form-information__field grid-3-2">
              <Field
                fieldFor={`reference-${i}-email`}
                label="Email Address"
              >
                <Input
                  name={`reference-${i}-email`}
                  placeholder="Email Address"
                  value={r.email || ''}
                  onChange={this.updateCurrentReference('email')}
                  hasError={this.state.errorEmail}
                />
              </Field>
            </div>

            <div className="form-information__field grid-1-4">
              <Field
                fieldFor="reference-personal-note"
                label={
                  <div>
                    Attach a Personal Note
                  </div>
                }
              >
                <Input
                  className="reference-personal-note"
                  name="reference-personal-note"
                  placeholder="Hi, it's been a while. I hope you're doing great! I'm writing to see if you'd be able to leave me a tutoring reference? I'm taking on some new students this year, and your reference would help me greatly."
                  textarea={true}
                  charLimit={600}
                  value={r.personalNote || ''}
                  onChange={this.updateCurrentReference('personalNote')}
                />
              </Field>
            </div>
          </>

        </form>

        <div className="form-tutor-references__action-buttons">
          <Button
            grey={true}
            onClick={this.completeReferences}
          >
            DONE w/ REFS
          </Button>
          <Button
            orange={true}
            onClick={this.nextReference}
          >
            ADD ANOTHER REF
          </Button>
        </div>
      </div>
    )
  }
}

FormTutorReferences.defaultProps = {
}

FormTutorReferences.propTypes = {
  references: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
}

export default FormTutorReferences


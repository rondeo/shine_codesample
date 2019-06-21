import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Field from 'components/Field'
import Button from 'components/Button'
import Select from 'components/Select'
import Input from 'components/Input'
//import css from './style.scss'

class FormTutorInformation extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <form className="form-container">
        <div className="form-information__field">
          <Field
            fieldFor="phone"
            label="Phone Number *"
          >
            <Input
              name="phone"
              placeholder="Your Phone Number"
              value={this.props.phoneNumber}
              onChange={this.props.updatephoneNumber}
              hasError={!!this.props.errors['phoneNumber']}
            />
          </Field>
        </div>
        <div className="form-information__field">
          <Field
            fieldFor="years-exp"
            label="Years of Experience Tutoring *"
          >
            <Select
              name="years-exp"
              options={
                [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19, 20].map(n => (
                  { name: `${n} years`, value: n }
                ))
              }
              value={this.props.yearsExp}
              onChange={this.props.updateYrsExp}
              hasError={!!this.props.errors['yearsExp']}
            />
          </Field>
        </div>
        <div className="form-information__field">
          <Field
            fieldFor="able-to-travel"
            label="Are you able to travel to students' homes? *"
          >
            <Select
              name="able-to-travel"
              options={[
                { name: `Yes`, value: true },
                { name: `No`, value: false },
              ]}
              value={this.props.ableToTravel}
              onChange={this.props.updateAbleToTravel}
              hasError={!!this.props.errors['travel']}
            />
          </Field>
        </div>
        <div className="form-information__field">
          <Field
            fieldFor="zip-code"
            label="Current ZIP Code *"
          >
            <Input
              name="zip-code"
              placeholder="Your ZIP"
              value={this.props.zip}
              onChange={this.props.updateZip}
              hasError={!!this.props.errors['zip']}
            />
          </Field>
        </div>

        {
          /*
        <div className="form-information__field grid-1-2">
          <Field
            label="Interests"
            add={true}
            subtitle="What interests do you share with students. We'd love to know so we can match you width the best students possible. (Add up to 6)"
          >
            <Select
              multiline={true}
              name="yrs-exp"
              placeholder="10 years"
              options={[
                { name: '1', value: '1' },
                { name: '2', value: '2' },
                { name: '3', value: '3' },
                { name: '4', value: '4' }
              ]}
            />
          </Field>
        </div>
        */
        }
        <div className="form-information__field grid-1-2 d-flex justify-end">
          <Button
            text="Save & Continue"
            orange={true}
            bigWidth={true}
            onClick={this.props.onSubmit}
          />
        </div>
      </form>
    )
  }
}

FormTutorInformation.propTypes = {
}

export default FormTutorInformation


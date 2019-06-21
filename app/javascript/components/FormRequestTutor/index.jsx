import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Field from 'components/Field'
import Input from 'components/Input'
import Button from 'components/Button'
import imgModal1 from 'images/modal1.jpg'
import imgModal2 from 'images/modal2.jpg'
//import css from './style.scss'

class FormRequestTutor extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <form action="/" className="form-request">
        <div
          style={{
            backgroundImage: `url(${imgModal1})`
          }}
          className="form-request__head"
          >
          <div className="form-request__head-text">
            <h2>Your Request</h2>
          </div>
        </div>
        <div className="form-request__wrapper">
          <div className="modal-information__field">
            <Field
              id="requestTutor-1"
              label="Subject"
            >
              <Input
                id="requestTutor-1"
                name="subject"
                placeholder="Biochemistry"
              />
            </Field>
          </div>
          <div className="modal-information__field">
            <Field
              id="requestTutor-2"
              label="Grade"
            >
              <Input
                id="requestTutor-2"
                name="grade"
                placeholder="Middle School"
              />
            </Field>
          </div>
          <div className="modal-information__field grid-1-2">
            <Field
              id="requestTutor-5"
              label="Message"
            >
              <Input
                id="requestTutor-5"
                name="message"
                textarea={true}
                maxLength={600}
                placeholder="Please describe how we can best serve your student."
              />
            </Field>
          </div>
          <div className="modal__button grid-1-2">
            <Button
              text="Contact Emma"
              orange={true}
              submit={true}
            />
          </div>
        </div>
      </form>
    )
  }
}

FormRequestTutor.propTypes = {
}

export default FormRequestTutor


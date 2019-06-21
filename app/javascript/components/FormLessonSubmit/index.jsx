import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import Field from 'components/Field'
import Input from 'components/Input'
import Select from 'components/Select'
import {SingleDatePicker} from 'react-dates'
import moment from 'moment'
import {
  SUBJECT_OPTIONS,
  SUBJECT_OPTIONS_HASH,
} from 'utils/constants.js'
import modalBackground from 'images/modal4'
import axios from 'axios'
import {
  API_PREFIX,
} from '../../constants'

class FormLessonSubmit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subject: '',
      parent: '',
      hours: 0,
      minutes: '',
      summary: '',
      lessonDate: moment(),
      lessonDateFocused: false,
    }
    this.updateAttribute = ::this.updateAttribute
    this.handleLessonDateChange = ::this.handleLessonDateChange
    this.handleLessonDateFocusChanged = ::this.handleLessonDateFocusChanged
    this.submitLesson = ::this.submitLesson
    this.fetchSubject = ::this.fetchSubject
  }

  handleLessonDateChange(date) {
    this.setState({
      lessonDate: date,
    })
  }

  handleLessonDateFocusChanged(focusObj) {
    this.setState({
      lessonDateFocused: focusObj.focused,
    })
  }

  updateAttribute(attrName, cb) {
    let self = this

    return (e) => {
      let val = e.target.type === 'checkbox' ? e.target.checked : e.target.value

      // fetch subject to preselect if updating parent
      if(attrName == 'parent') {
        self.fetchSubject(val);
      }

      self.setState(
        {
          [attrName]: val,
        },
        () => cb && cb()
      )
    }
  }

  fetchSubject(parentId) {
    axios.get(
      `${API_PREFIX}/hiring_requests/${parentId}/subject`
    )
      .then(res => {
        this.setState({subject: res.data.subject});
      })
      .catch(err => {
        console.log(err)
      })
  }

  submitLesson() {

    let error = false;
    this.setState({
      parentErr: false,
      subjectErr: false,
      dateErr: false,
      hourErr: false,
      minuteErr: false,
      summaryErr: false
    })

    if(!this.state.parent) {
      error = true
      this.setState({parentErr: true})
    }
    if(!this.state.subject) {
      error = true
      this.setState({subjectErr: true})
    }
    /*
     *  Temp remove HOURS field
    if(!this.state.hours) {
      error = true
      this.setState({hourErr: true})
    }
    */
    if(!this.state.minutes) {
      error = true
      this.setState({minuteErr: true})
    }
    if(!this.state.lessonDate) {
      error = true
      this.setState({dateErr: true})
    }
    if(!this.state.lessonDate) {
      error = true
      this.setState({dateErr: true})
    }
    if(!this.state.summary) {
      error = true
      this.setState({summaryErr: true})
    }

    if (!error) {
      let lessonParams = {
        learner_id: this.state.parent,
        subject: SUBJECT_OPTIONS_HASH[this.state.subject], // get readable name
        hours: parseInt(this.state.hours),
        minutes: parseInt(this.state.minutes),
        lesson_date: this.state.lessonDate,
        summary: this.state.summary
      }
      this.props.createLesson(lessonParams)
    }
  }

  render() {
    return (
      <div className="form-lesson">
        <form className="form-container" style={{paddingTop: '25px'}}>
          <div className="form-lesson__field grid-1-2">
            <h2>Submit a Lesson</h2>
          </div>
          <div className="form-lesson__field">
            <Field
              fieldFor="parent"
              label="Parent *"
            >
              <Select
                name="parent"
                options={
                  this.props.parents.map(p => (
                    { name: p.name, value: p.id }
                  ))
                }
                onChange={this.updateAttribute('parent')}
                hasError={this.state.parentErr}
              />
            </Field>
          </div>

          <div className="form-lesson__field">
            <Field
              fieldFor="subject"
              label="Subject *"
            >
              <Select
                name="subject"
                options={SUBJECT_OPTIONS}
                onChange={this.updateAttribute('subject')}
                value={this.state.subject}
                hasError={this.state.subjectErr}
              />
            </Field>
          </div>

          <div className="form-lesson__field">
            <Field
              fieldFor="lessonDate"
              label="Date *"
            >
              <SingleDatePicker
                date={this.state.lessonDate}
                onDateChange={this.handleLessonDateChange}
                focused={this.state.lessonDateFocused}
                onFocusChange={this.handleLessonDateFocusChanged}
                id="lessonDatePicker"
                required={true}
                isOutsideRange={(day) => false}
                showDefaultInputIcon={true}
                numberOfMonths={1}
              />
            </Field>
          </div>

          <div className="form-lesson__field">
            <Field
              fieldFor="minutes"
              label="Lesson Duration (min)*"
            >
              <Select
                name="minutes"
                options={
                  ['00',15,30,45,60,75,90,120,150,180].map(n => (
                    { name: n, value: n.toString() }
                  ))
                }
                onChange={this.updateAttribute('minutes')}
                hasError={this.state.minuteErr}
              />
            </Field>
          </div>

          <div className="form-lesson__field grid-1-2">
            <Field
              id="summary"
              label="Lesson Summary *"
            >
              <Input
                id="why-4"
                name="summary"
                textarea={true}
                charLimit={true}
                maxlength={600}
                placeholder="What did you cover in this lesson? Please note any particularly challenging topics, breakthroughs, or areas of strength the parent might want to know about.."
                onChange={this.updateAttribute('summary')}
                value={this.state.summary}
                hasError={this.state.summaryErr}
              />
            </Field>
          </div>

          <div className="form-lesson__button grid-1-2">
            <Button
              text="Submit Lesson"
              orange={true}
              fullWidth={true}
              onClick={this.submitLesson}
            />
          </div>
        </form>
      </div>

    )
  }
}

FormLessonSubmit.propTypes = {
}

export default FormLessonSubmit


import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import LessonItem from 'components/LessonItem'
import imgDefault from 'images/default.png'
import imgMan1 from 'images/mini-man1'
import imgMan2 from 'images/mini-man2'
import imgMan3 from 'images/mini-man3'
import {
  SUBJECT_OPTIONS,
  SUBJECT_OPTIONS_HASH
} from 'utils/constants.js'
import dayjs from 'dayjs'
//import css from './style.scss'

class GroupLessons extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.fetchData = ::this.fetchData
    this.fetchLessons = ::this.fetchLessons

    this.lessons = [
    ]
  }

  fetchData(conv_id, user_id) {
    this.props.fetchMessages(conv_id, user_id)
  }

  fetchLessons(student_id) {
    this.props.fetchStudentLessons(student_id);
  }

  render() {
    let countToRender = this.props.messagePage ? 3 : 6
    let lessons = this.lessons.slice(0, countToRender)

    return (
      <div className="group-lessons">
        <div className="group-lessons__wrapper">
         {
            this.props.messagePage
              ?
                this.props.conversations.map(c => (
                  <div
                    className="group-lessons__lesson-item"
                    key={c.title}
                    onClick={ () => this.fetchData(c.id, c.other_user.id) }
                  >
                    <LessonItem
                      image={c.other_user.imageUrl ? c.other_user.imageUrl : imgDefault}
                      title={c.other_user.name}
                      subtitle={
                        Math.round(dayjs().diff(dayjs(c.content.created_at), 'day')) > 0
                          ? `${dayjs(c.content.created_at).format('MMM D')}`
                          : 'Today'
                      }
                      text={c.content.content}
                    />
                  </div>
                ))
              :
                this.props.students.map(s => (
                  <div
                    className="group-lessons__lesson-item"
                    key={s.title}
                    onClick={() => this.fetchLessons(s.user.id)}
                  >
                    <LessonItem
                      image={s.user.imageUrl ? s.user.imageUrl : imgDefault}
                      title={s.user.name}
                      subtitle={SUBJECT_OPTIONS_HASH[s.latest_lesson.subject]}
                      text={s.summary}
                    />
                  </div>
                ))
          }
        </div>
      </div>
    )
  }
}

GroupLessons.propTypes = {
  messagePage: PropTypes.bool,
}

export default GroupLessons


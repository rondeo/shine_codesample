import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import HistoryItem from 'components/HistoryItem'
import Separator from 'components/Separator'
import imgMiniMan1 from 'images/mini-man1.jpg'
import imgDefault from 'images/default.png'
import imgMan3 from 'images/man3'
import {
  SUBJECT_OPTIONS,
  SUBJECT_OPTIONS_HASH
} from 'utils/constants.js'
import dayjs from 'dayjs'

//import css from './style.scss'

class GroupHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

    this.itemCount = 8
  }

  render() {
    let lessons = [...this.props.lessons].sort((a,b) => {
      return dayjs(b.date).diff(dayjs(a.date))
    })
    lessons[0].detailed = true

    return (
      <div className="group-history">
        {
          lessons.map((item, i) => (
            <div key={i}>
              <div className="group-history__item">
                <HistoryItem
                  detailed={item.detailed}
                  image={
                    this.props.type == 'Teacher'
                      ? (item.learner.image_url || imgDefault)
                      : (item.tutor.image_url || imgDefault)
                  }
                  title={this.props.type == 'Teacher' ? item.learner.name : item.tutor.name}

                  date={item.date}
                  subject={SUBJECT_OPTIONS_HASH[item.subject] || item.subject}
                  time={item.duration_in_mins}
                  quote={item.summary}
                  text={item.summary}
                  type={this.props.type}
                  status={item.status}
                  updateStatus={this.props.updateStatus}
                  id={item.id}

                  button={this.props.hasItemButton}
                  attachmentImage={imgMan3}
                />
              </div>
              {
                i !== 7
                  ?
                    <div className="group-history__separator">
                      <Separator />
                    </div>
                  :
                    ''
              }
            </div>
          ))
        }
      </div>
    )
  }
}

GroupHistory.propTypes = {
  hasItemButton: PropTypes.bool,
}

export default GroupHistory


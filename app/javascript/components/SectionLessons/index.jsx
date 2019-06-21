import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Panel from 'components/Panel'
import GroupLessons from 'components/GroupLessons'
import News from 'components/News'
import Subpanel from 'components/Subpanel'
import GroupHistory from 'components/GroupHistory'
import GroupMessages from 'components/GroupMessages'
import CircularImage from 'components/CircularImage'
import FormMessage from 'components/FormMessage'
import {Link} from 'react-router-dom'
import imgDefault from 'images/default.png'
import Button from 'components/Button'
import {
  SUBJECT_OPTIONS,
  SUBJECT_OPTIONS_HASH
} from 'utils/constants.js'
//import SimpleBar from 'simplebar'
//import css from './style.scss'

class SectionLessons extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

    this.DOM = {}
    this.createHiringRequest = ::this.createHiringRequest
  }
  componentDidMount() {
    this.DOM = {
      $sectionLessons: document.querySelector('.js-section-lessons'),
      scrollContent: document.querySelectorAll('.js-scroll')
    }

    /*
    // mount SimpleBars for scrollable content (lesson subpanels)
    // - can this be done with eg overflow-y?
    this.DOM.scrollContent.forEach(item => {
      let simple = new SimpleBar(item, {
        // simple.unMount()
      })
    })
    */
  }

  createHiringRequest() {
    this.props.createHiringRequest()
  }

  render() {
    return (
      <div className="section-lessons">
        <div className="container-fluid">
          <div className="section-lessons__content">
            <div className="section-lessons__left">
              {
                this.props.messagePage
                  ?
                    <div>
                      <div className="section-lessons__panel section-lessons__panel--left">
                        <Panel
                          title="Messages"
                          center={true}
                          withoutBorders={true}
                          withoutContentPadding={true}
                          contentStyle={{
                            maxHeight: '50vh',
                            padding: 0,
                          }}
                        >
                          <GroupLessons
                            messagePage={this.props.messagePage}
                            conversations={this.props.conversations}
                            fetchMessages={this.props.fetchMessages}
                          />
                        </Panel>
                      </div>
                      <div className="section-lessons__news">
                        <div className="section-lessons__news-wrapper">
                          <News
                            image={imgDefault}
                            lessonPage={this.props.lessonPage}
                            messagePage={this.props.messagePage}
                            currentUserJoinDate={this.props.currentUserJoinDate}
                          />
                        </div>
                      </div>
                    </div>
                  :
                    <div className="section-lessons__panel section-lessons__panel--left">
                      <Panel
                        title=""
                        center={true}
                        withoutBorders={true}
                        withoutContentPadding={true}
                        contentStyle={{
                          maxHeight: '64vh',
                          padding: 0,
                        }}
                      >
                        <GroupLessons
                          students={this.props.students}
                          fetchStudentLessons={this.props.fetchStudentLessons}
                        />
                      </Panel>
                      <div className="section-lessons__news">
                        <div className="section-lessons__news-wrapper">
                          <News
                            image={imgDefault}
                            lessonPage={this.props.lessonPage}
                            messagePage={this.props.messagePage}
                            currentUserJoinDate={this.props.currentUserJoinDate}
                          />
                        </div>
                      </div>
                    </div>
              }
            </div>
            <div className="section-lessons__right">
              {
                this.props.messagePage
                  ?
                    <div>
                      <div className="section-lessons__panel">
                        <Panel
                          title={
                              this.props.conversations && this.props.conversations.length > 0
                                ?

                                  <span style={{display: 'flex', alignItems: 'center'}}>
                                    <CircularImage
                                      imageUri={
                                        (
                                          this.props.currentConversation &&
                                          this.props.currentConversation.other_user &&
                                          this.props.currentConversation.other_user.imageUrl
                                        ) ||
                                        imgDefault
                                      }
                                      width='44px'
                                      height='44px'
                                      style={{marginRight: '24px',}}
                                    />
                                    Conversation with {this.props.title || '...'}
                                    {
                                      this.props.type == 'Learner' && !this.props.isHired
                                        ?
                                          <div style={{paddingLeft: '50px'}}>
                                            <Button
                                              small={true}
                                              orange={true}
                                              onClick={this.createHiringRequest}
                                            >
                                              Hire Tutor
                                            </Button>
                                          </div>
                                        :
                                          ''
                                    }
                                  </span>

                                :
                                  ''
                            }
                          center={true}
                          buttonMod={true}
                          withoutContentPadding={true}
                          contentStyle={{
                            maxHeight: '50vh',
                            padding: 0,
                          }}
                          id="message-list-panel"
                        >
                          <div className="section-messages">
                            <GroupMessages
                              containingPanelId="message-list-panel"
                              messages={this.props.messages}
                              userId={this.props.userId}
                            />
                          </div>
                        </Panel>
                      </div>
                      <FormMessage
                        submitMessage={this.props.submitMessage}
                      />
                    </div>
                  :
                    <div className="section-lessons__panel section-lessons__panel--right section-lessons__panel--right--lessons-page">
                      <Panel
                        title={
                          this.props.latestLesson &&
                          (this.props.latestLesson.tutor || this.props.latestLesson.learner)
                              ?
                                <span style={{display: 'flex', alignItems: 'center'}}>
                                  <CircularImage
                                    imageUri={
                                      (this.props.type == "Teacher" && this.props.latestLesson.learner && this.props.latestLesson.learner.image_url) ||
                                      (this.props.type == "Learner" && this.props.latestLesson.tutor && this.props.latestLesson.tutor.image_url) ||
                                      imgDefault
                                    }
                                    width='44px'
                                    height='44px'
                                    style={{marginRight: '24px',}}
                                  />
                                  Lessons with {
                                    this.props.latestLesson &&
                                      (this.props.type === "Teacher" && this.props.latestLesson.learner && this.props.latestLesson.learner.name) ||
                                      (this.props.type === "Learner" && this.props.latestLesson.tutor && this.props.latestLesson.tutor.name)
                                      || '...'
                                  }
                                </span>
                              :
                                ''
                        }
                        button={this.props.type == 'Teacher' && this.props.hasStripeAccount ? true : false}
                        buttonText="New Lesson"
                        buttonMod={true}
                        withoutContentPadding={true}
                        buttonAction={this.props.toggleLessonModal}
                        contentStyle={{
                          maxHeight: '64vh',
                          padding: 0,
                        }}
                      >
                      {
                        this.props.latestLesson.subject
                          ?
                            <div className="section-lessons__scroll js-scroll">
                              <Subpanel
                              >
                                <GroupHistory
                                  hasItemButton={this.props.lessonPage}
                                  lessons={this.props.lessons}
                                  type={this.props.type}
                                  updateStatus={this.props.updateStatus}
                                />
                              </Subpanel>
                            </div>
                          :
                            <div className="section-lessons__panel--right__no-content">
                              <span>
                                <div>No Lessons yet!</div>
                                {
                                  this.props.type === "Teacher"
                                  ?
                                    <div>
                                      <br />
                                      To submit your first lesson, click the "New Lesson" button above.
                                    </div>
                                  :
                                    <div>
                                      <br />
                                      Once your tutor submits a Lesson Report, it will show up here for your approval.
                                    </div>
                                }
                              </span>
                            </div>
                          }
                      </Panel>
                    </div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SectionLessons.propTypes = {
  messagePage: PropTypes.bool,
  lessonPage: PropTypes.bool,
  // messages page attrs
  userId: PropTypes.number,
  title: PropTypes.string,
  conversations: PropTypes.array,
  messages: PropTypes.array,
  fetchMessages: PropTypes.func,
  submitMessage: PropTypes.func,
}

export default SectionLessons


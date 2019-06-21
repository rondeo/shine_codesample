import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import SectionLessons from 'components/SectionLessons'
import RateLesson from 'components/RateLesson'
import {connect} from 'react-redux'
import FormLessonReview from 'components/FormLessonReview'
import axios from 'axios'
import Modal from 'components/Modal'
import {
  API_PREFIX,
} from '../../constants'

class PageLessons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      students: [],
      lessons: [],
      tutorId: '',
      lessonId: '',
      latestLesson: {tutor: {}},
      ratingModal: false,
    }
    this.parentTutors = ::this.parentTutors
    this.fetchStudentLessons = ::this.fetchStudentLessons
    this.updateStatus = ::this.updateStatus
    this.toggleRatingModal = ::this.toggleRatingModal
    this.approveLesson = ::this.approveLesson

    if(!axios.defaults.headers.common['uid']) {
      axios.defaults.headers.common['uid'] = this.props.currentUser.email;
      axios.defaults.headers.common['client'] = this.props.currentUser.client;
      axios.defaults.headers.common['access-token'] =  this.props.currentUser.accessToken;
    }
  }

  componentWillMount() {
    this.parentTutors();
  }

  toggleRatingModal() {
    this.setState({
      ratingModal: !this.state.ratingModal
    })
  }

  parentTutors() {
    axios.get(
      `${API_PREFIX}/lessons/tutors`
    )
      .then(res => {
        this.setState({students: res.data});
        if(res.data && res.data[0]) {
          this.setState({lessons: res.data[0].lessons});
          this.setState({latestLesson: res.data[0].latest_lesson});
          this.setState({tutorId: res.data[0].latest_lesson.tutor_id});
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  fetchStudentLessons(tutor_id) {
    this.setState({tutorId: tutor_id});
    let url = `${API_PREFIX}/lessons/tutors?tutor_id=${tutor_id}`

    axios.get(url)
      .then(res => {
        this.setState({lessons: res.data.lessons});
        this.setState({latestLesson: res.data.latest_lesson});
      })
      .catch(err => {
        console.log(err)
      })
  }

  updateStatus(status, id) {
    if(status == 'approved') {
      this.toggleRatingModal();
      this.setState({lessonId: id});
    } else {
      axios.put(`${API_PREFIX}/lessons/${id}/update_status?status=${status}`)
        .then(res => {
          this.setState({lessons: res.data.lessons});
          this.setState({latestLesson: res.data.latest_lesson});
      })
    }
  }

  approveLesson(data) {
    axios.put(
      `${API_PREFIX}/lessons/${this.state.lessonId}/update_status`,
      {
        status: 'approved',
        rating: data.rating,
        message: data.message,
        private_feedback: data.privateFeedback,
      },
      {},
    )
      .then(res => {
        this.toggleRatingModal();
        this.setState({lessons: res.data.lessons});
        this.setState({latestLesson: res.data.latest_lesson});
      })
      .catch(err => {
        console.log("ERR UPDATING LESSON!")
        console.log(err)
        console.log(err.message)
        console.log(err.data.full_messages)
      })
  }

  render() {
    return (
      <div className="page-lessons">
        <SectionLessons
          lessonPage={true}
          type={this.props.currentUser.type}
          students={this.state.students}
          lessons={this.state.lessons}
          latestLesson={this.state.latestLesson}
          updateStatus={this.updateStatus}
          fetchStudentLessons={this.fetchStudentLessons}
          currentUserJoinDate={this.props.currentUser.createdAt}
        />

         <Modal
          id="modal--lesson-modal"
          isOpen={this.state.ratingModal}
          onClose={this.toggleRatingModal}
        >
          <RateLesson
            approveLesson={this.approveLesson}
            name={this.state.latestLesson.tutor.name}
            tutorImageUrl={this.state.latestLesson.tutor.image_url}
            lessonId={this.state.lessonId}
          />
        </Modal>
      </div>
    )
  }
}

PageLessons.propTypes = {
}


const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser.attributes,
    isSignedIn: state.auth.currentUser.isSignedIn
  }
}

export default
  connect(
    mapStateToProps,
  )(PageLessons)



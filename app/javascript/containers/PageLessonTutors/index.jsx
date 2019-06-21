import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import SectionLessons from 'components/SectionLessons'
import Modal from 'components/Modal'
import FormLessonSubmit from 'components/FormLessonSubmit'
import {connect} from 'react-redux'
import axios from 'axios'
//import css from './style.scss'
import {
  API_PREFIX,
} from '../../constants'

class PageLessonTutors extends Component {
  constructor(props) {
    super(props)
    this.state = {
      students: [],
      parents: [],
      lessons: [],
      parentId: '',
      lessonModal: false,
      latestLesson: {learner: {}}
    }
    this.students = ::this.students
    this.fetchParents = ::this.fetchParents
    this.toggleLessonModal = ::this.toggleLessonModal
    this.fetchStudentLessons = ::this.fetchStudentLessons
    this.createLesson = ::this.createLesson

    if(!axios.defaults.headers.common['uid']) {
      axios.defaults.headers.common['uid'] = this.props.currentUser.email;
      axios.defaults.headers.common['client'] = this.props.currentUser.client;
      axios.defaults.headers.common['access-token'] =  this.props.currentUser.accessToken;
    }
  }

  componentWillMount() {
    this.students();
    this.fetchParents();
  }

  toggleLessonModal() {
    this.setState({
      lessonModal: !this.state.lessonModal
    })
  }

  students() {
    axios.get(
      `${API_PREFIX}/lessons`
    )
      .then(res => {
        this.setState({students: res.data});
        if(res.data && res.data[0]) {
          this.setState({lessons: res.data[0].lessons});
          this.setState({latestLesson: res.data[0].latest_lesson});
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  fetchParents() {
     return axios.get(
      `${API_PREFIX}/lessons/parents`
    )
      .then(res => {
        console.log(res.data);

        this.setState({parents: res.data.parents});
      })
      .catch(err => {
        console.log(err);
      })
  }

  fetchStudentLessons(learner_id) {
    let url = `${API_PREFIX}/lessons?learner_id=${learner_id}`

    axios.get(url)
      .then(res => {
        console.log(res.data);
        this.setState({lessons: res.data.lessons});
        this.setState({latestLesson: res.data.latest_lesson});
      })
      .catch(err => {
        console.log(err)
      })
  }

  createLesson(lessonParams) {
    axios.post(`${API_PREFIX}/lessons`, { lesson: lessonParams},{},)
      .then(res => {
        this.students();
        this.toggleLessonModal();
    })
  }


  render() {
    return (
      <div className="page-lessons">
        {/* lessonPage is correctly false - omit the NewsBox */}
        <SectionLessons
          lessonPage={false}
          border={true}
          type={this.props.currentUser.type}
          students={this.state.students}
          lessons={this.state.lessons}
          latestLesson={this.state.latestLesson}
          fetchStudentLessons={this.fetchStudentLessons}
          toggleLessonModal={this.toggleLessonModal}
          hasStripeAccount={this.props.currentUser.hasStripeAccount}
          currentUserJoinDate={this.props.currentUser.createdAt}
        />
        <Modal
          id="modal--lesson-modal"
          isOpen={this.state.lessonModal}
          onClose={this.toggleLessonModal}
        >
          <div className="page-lessons__lesson-submit">
            <FormLessonSubmit
              parents={this.state.parents}
              createLesson={this.createLesson}
            />
          </div>
        </Modal>
      </div>
    )
  }
}

PageLessonTutors.propTypes = {
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
  )(PageLessonTutors)

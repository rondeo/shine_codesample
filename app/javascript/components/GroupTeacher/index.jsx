import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Teacher from 'components/Teacher'
//import css from './style.scss'

class GroupTeacher extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="group-teachers">
        <Teacher
          image="human-1"
          name="Annie C."
          fliped={false}
          color={null}
        >
          <div className="teacher__about">
            <div>Sacramento, CA</div><div>7 Years Exp.</div>
          </div>
        </Teacher>
        <Teacher
          image="human-2"
          name="Michael W."
          fliped={true}
          color="pale"
        >
          <div className="teacher__about">
            <div>Mountain View, CA</div><div>11 Years Exp.</div>
          </div>
        </Teacher>
        <Teacher
          image="human-3"
          name="Jeremy A."
          fliped={true}
          color="mango"
        >
          <div className="teacher__about">
            <div>Mill Valley, CA</div><div>6 Years Exp.</div>
          </div>
        </Teacher>
        <Teacher
          image="human-4"
          name="Teresa G."
          fliped={true}
          color="pale-peach-2"
        >
          <div className="teacher__about">
            <div>Temescal, CA</div><div>9 Years Exp.</div>
          </div>
        </Teacher>
        <Teacher
          image="human-5"
          name="Michelle L."
          fliped={true}
          color="pale-peach-2"
        >
          <div className="teacher__about">
            <div>San Francisco, CA</div><div>8 Years Exp.</div>
          </div>
        </Teacher>
        <Teacher
          image="human-6"
          name="Jason B."
          fliped={true}
          color="pale-peach"
        >
          <div className="teacher__about">
            <div>Los Altos, CA</div><div>18 Years Exp.</div>
          </div>
        </Teacher>
      </div>
    )
  }
}

GroupTeacher.propTypes = {
}

export default GroupTeacher


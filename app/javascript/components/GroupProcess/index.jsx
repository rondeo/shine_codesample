import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Process from 'components/Process'

class GroupProcess extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="group-group-process">
        <Process
          title="Get Matched with Great Students"
          icon="process-1"
          text="Work with amazing students and make lasting connections."
        />
        <Process
          title="Share Your Expertise"
          icon="process-4"
          text="Name your own hours and find students that match."
        />
        <Process
          title="Name Your Rate"
          icon="process-3"
          text="Set your own rate for your skills."
        />
        <Process
          title="Join an Amazing Tutor Community"
          icon="process-2"
          text="Find colleagues, friends, and teammates through our tutor network."
        />
      </div>
    )
  }
}

GroupProcess.propTypes = {
}

export default GroupProcess


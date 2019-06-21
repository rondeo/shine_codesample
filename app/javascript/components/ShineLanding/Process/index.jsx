import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import GroupProcess from 'components/GroupProcess'
import Button from 'components/Button'
import {Link} from 'react-router-dom'

class SectionProcess extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <section className="section-process shineLanding">
        <div className="container-fluid">
          <div className="section-process__content">
            <div className="section-process__title">
              <h4>Hey Tutors!</h4>
              <h2>Love Helping Students?</h2>
              <div className="section-process__text">
                Only 1 in 4 tutors pass our initial screening. What helps? We look for grit, prior achievement, and geniune desire to help others.
              </div>
            </div>

            <div className="section-process__processes">
              <GroupProcess
              />
            </div>

            <div></div>
            <Link to="/tutor-with-us" className="section-process__processes--button-apply">
              <Button
                bigWidth={true}
                orange={true}
              >
                Apply Now!
              </Button>
            </Link>
          </div>
        </div>
      </section>
    )
  }
}

SectionProcess.propTypes = {
}

export default SectionProcess


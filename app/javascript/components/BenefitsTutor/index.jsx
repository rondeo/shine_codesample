import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Benefit from 'components/Benefit'
import IconDiploma from 'images/svg/diploma'
import IconTwoUsers from 'images/svg/two-users'
import IconBenefits3 from 'images/svg/benefit-3'

class TutorBenefits extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="group-benefits--tutor">
        <Benefit
          icon={<IconDiploma />}
          title="Choose Your Specialty"
          text="We all have that subject we know like the back of our hand. Help students find you by specializing."
        />
        <Benefit
          icon={<IconBenefits3 />}
          title="Name Your Rate"
          text="Keep your standard rate. We'll even help you find the best rate for a subject in your area."
        />
        <Benefit
          icon={<IconTwoUsers />}
          title="Get Matched with Students"
          text="Get connected with interested parents and schedule lessons at a mutually convenient time."
        />
      </div>
    )
  }
}

TutorBenefits.propTypes = {
}

export default TutorBenefits



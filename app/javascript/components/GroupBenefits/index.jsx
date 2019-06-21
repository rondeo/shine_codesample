import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Benefit from 'components/Benefit'
import IconBenefits1 from 'images/svg/benefit-1'
import IconBenefits2 from 'images/svg/benefit-2'
import IconBenefits3 from 'images/svg/benefit-3'

class GroupBenefits extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="group-benefits">
        <Benefit
          icon={<IconBenefits1 />}
          title="Tell Us What You Need"
          text="PHONE You're in control of your schedule. Just let us know what you when you want to schedule your lessons, and we'll make it happen."
        />
        <Benefit
          icon={<IconBenefits2 />}
          title="Get Matched by Professionals"
          text="Don't spend your time looking through endless tutor profiles. At Shine, simply tell us what you need, and we'll show you a list of hand-picked matches."
        />
        <Benefit
          icon={<IconBenefits3 />}
          title="And Stay On Budget"
          title="Start Lessons"
          text="GRAD CAPT. -- If you don't feel the spark with your tutor, we'll match you with another candidate - completely free. Tutoring can be expensive - but it doesn't have to be. Just let us know what you've got budgeted, and we'll find someone that fits your wallet as well as your student."
        />
      </div>
    )
  }
}

GroupBenefits.propTypes = {
}

export default GroupBenefits


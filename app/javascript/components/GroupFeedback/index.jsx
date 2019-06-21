import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Feedback from 'components/Feedback'
//import css from './style.scss'

class GroupFeedback extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="group-feedback">
        {
          this.props.references.map(r => (
            <div className="group-feedback__item">
              <Feedback
                reviews={[
                  { value: r.rating }
                ]}
                starsDisabled={true}
                title={r.title}
                date={r.createdAt}
                text={r.referenceText}
              />
            </div>
          ))
        }
      </div>
    )
  }
}

GroupFeedback.defaultProps = {
  references: [],
}
GroupFeedback.propTypes = {
  references: PropTypes.array.isRequired,
}

export default GroupFeedback


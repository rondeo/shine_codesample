import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import TutorCard from 'components/TutorCard'
import CircularImage from 'components/CircularImage'
import { abbreviatedName } from 'utils/view_filters.js'
//import css from './style.scss'

class GroupTutor extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

    this.selectTutor = ::this.selectTutor
  }

  selectTutor(e) {
    const tutorId = e.target.attributes['tutorId'] && e.target.attributes['tutorId'].value
    tutorId &&
      this.props.selectTutor &&
      this.props.selectTutor(parseInt(tutorId))
  }

  render() {
    return (
      <div className="group-tutors">
        {
          this.props.tutors.map(t => (
            <div
              key={t.id}
              tutorId={t.id}
              className={`
                group-tutors__tutor
                ${this.props.selectedTutorId === t.id ? 'group-tutors__tutor--selected' : ''}
              `}
              onMouseOver={this.selectTutor}
              onMouseEnter={this.selectTutor}
              onClick={this.selectTutor}
            >
              <CircularImage
                imageUri={t.imageUrl}
                className="group-tutors__tutor__image"
                tutorId={t.id}
              />
              <div
                className="group-tutors__tutor__name"
                tutorId={t.id}
              >
                {abbreviatedName(t.name)}
              </div>
            </div>
            /*
            <TutorCard
              key={t.id}
              id={t.id}
              starName={`stars-${t.id}`}
              starDisabled={this.props.starDisabled}
              reviews={t.confirmedReferences}
              educations={t.educations}
              imageUrl={t.imageUrl}
              tutorName={t.name}
              bio={t.bio}
              reviewCount={t.referenceCount}
              yrsExp={t.yearsExp || 1}
              priceCents={parseFloat(t.hourlyRate || 0)*100}
              loadsProfile={true}
            />
            */
          ))
        }
      </div>
    )
  }
}

GroupTutor.defaultProps = {
  tutors: [],
  starDisabled: true,
}

GroupTutor.propTypes = {
  tutors: PropTypes.array.isRequired,
  starDisabled: PropTypes.bool,
}

export default GroupTutor


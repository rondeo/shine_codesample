import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import GroupTutor from 'components/GroupTutor'
import FormConnect from 'components/FormConnect'
import Button from 'components/Button'
import {formattedRate} from 'utils/view_filters.js'
import axios from 'axios'
import teacher1 from 'images/profile-annie-chapin-small.jpg'
import teacher2 from 'images/profile-michael-washington-small.jpg'
import teacher3 from 'images/profile-jeremy-anser-small.jpg'
import teacher4 from 'images/profile-teresa-givens-small.jpg'
import teacher5 from 'images/profile-michelle-lieu-small.jpg'
import teacher6 from 'images/profile-jason-beverly-small.jpg'
//import css from './style.scss'

class SectionTutor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tutors: props.tutors || [],
    }

    this.selectTutor = ::this.selectTutor
    this.messageTutor = ::this.messageTutor
  }

  componentWillReceiveProps(newProps) {
    if (newProps.tutors && newProps.tutors.length > 0) {
      function randomPic() {
        let ts = [
          teacher1,
          teacher2,
          teacher3,
          teacher4,
          teacher5,
          teacher6,
        ]
        return ts[Math.floor(Math.random() * 6)]
      }

      let newTs = newProps.tutors.map(t => {
        return {
          ...t,
          imageUrl: randomPic(),
        }
      })

      this.setState({
        selectedTutor: {
          ...newTs[0],
        },
        tutors: newTs,
      })
    }
  }

  messageTutor(tutorId, name) {
    this.props.setSelectedTutor(tutorId, name)
  }

  selectTutor(tutorId) {
    if (tutorId && tutorId !== this.state.selectedTutor.id) {
      let selectedTutor = this.state.tutors.filter(t => parseInt(t.id) === parseInt(tutorId))[0]
      this.setState({
        selectedTutor: { ...selectedTutor },
      })
    }
  }

  render() {
    return (
      <div className="section-tutors">
          <div
            className="section-tutors__title"
          >
          </div>
          {
            this.props.tutors.length > 0
            ?
              <div className="section-tutors__group">
                <GroupTutor
                  tutors={this.state.tutors}
                  selectedTutorId={this.state.selectedTutor && this.state.selectedTutor.id}
                  selectTutor={this.selectTutor}
                />
              </div>
            :
              <div className="section-tutors__group__error">
                We're sorry! We don't have anyone in your area just yet. Try a different zip code, or <a href="mailto:frank@shinetutors.co">contact us</a> and we'll tap the Shine network to find you a great tutor.
              </div>
          }
          {
            this.props.tutors && this.props.tutors.length > 0
              ?
                <>
                  <div className="section-tutors__selected">
                    <div
                      className="section-tutors__selected__left"
                      style={{
                        backgroundImage: `url(${this.state.selectedTutor && this.state.selectedTutor.imageUrl})`,
                      }}
                    >
                    </div>
                    <div className="section-tutors__selected__right">
                      <div className="section-tutors__selected__right__info">
                        {
                          this.state.selectedTutor
                            ?
                              <>
                                <div className="section-tutors__selected__right__info__name__fname">
                                  {this.state.selectedTutor.name.split(' ')[0]}
                                </div>
                                <div className="section-tutors__selected__right__info__name__lname">
                                  {this.state.selectedTutor.name.split(' ')[1]}
                                </div>
                              <div className="section-tutors__selected__right__info__degrees">
                              {this.state.selectedTutor.educations.map(e => (
                                <div className="section-tutors__selected__right__info__degrees__item">
                                  {e.degree}, {e.institute}
                                </div>
                              ))}
                              </div>
                              <div className="section-tutors__selected__right__info__lessons__wrapper">
                                <div className="section-tutors__selected__right__info__lessons">
                                  {`"${this.state.selectedTutor.tagline || "I love helping students who love math..."}"`}
                                  </div>
                              </div>
                              <div className="section-tutors__selected__right__info__rate">
                                <span className="superscript">$ </span>
                                <span className="rate-rate">
                                  {formattedRate(this.state.selectedTutor.hourlyRateCents)}
                                </span>
                                <span className="rate-hour">/hr</span>
                              </div>
                              <div className="section-tutors__selected__right__info__contact">
                                <div className="section-tutors__selected__right__info__contact__button"
                                 onClick={ () => this.messageTutor(this.state.selectedTutor.id, this.state.selectedTutor.name.split(' ')[0]) }
                                >
                                  Chat with {this.state.selectedTutor.name.split(' ')[0]}
                                </div>
                                <div className="section-tutors__selected__right__info__contact__button">
                                  See {this.state.selectedTutor.name.split(' ')[0]}'s References
                                </div>
                              </div>
                                    </>
                                    :
                                  ''
                                }

                      </div>
                    </div>
                  </div>
                  <div className="section-tutors__button__wrapper">
                    {
                      (
                        this.props.loadNextPage &&
                        this.props.totalAvailablePages &&
                        this.props.page &&
                        (this.props.page < this.props.totalAvailablePages)
                      )
                        ?
                          <Button
                            className="section-tutors__button"
                            text="View More"
                            onClick={this.props.loadNextPage}
                          />
                        :
                          ''
                    }
                  </div>
                </>
              :
              ''
          }
      </div>
    )
  }
}

SectionTutor.defaultProps = {
  tutors: [],
}

SectionTutor.propTypes = {
  tutors: PropTypes.array.isRequired,
  loadNextPage: PropTypes.func,
  totalAvailablePages: PropTypes.number,
  page: PropTypes.number,
}

export default SectionTutor


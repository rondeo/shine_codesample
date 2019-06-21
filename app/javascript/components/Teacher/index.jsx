import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import teacher1 from 'images/profile-annie-chapin-small-lossy.jpg'
import teacher2 from 'images/profile-michael-washington-small-lossy.jpg'
import teacher3 from 'images/profile-jeremy-anser-small-lossy.jpg'
import teacher4 from 'images/profile-teresa-givens-small-lossy.jpg'
import teacher5 from 'images/profile-michelle-lieu-small-lossy.jpg'
import teacher6 from 'images/profile-jason-beverly-small-lossy.jpg'

class Teacher extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

    switch (this.props.image) {
      case 'human-1':
        this.image = teacher1
        return
      case 'human-2':
        this.image = teacher2
        return
      case 'human-3':
        this.image = teacher3
        return
      case 'human-4':
        this.image = teacher4
        return
      case 'human-5':
        this.image = teacher5
        return
      case 'human-6':
        this.image = teacher6
        return
    }
  }

  render() {
    return (
      <div
        className={`teacher ${this.props.fliped ? 'teacher--flipped' : ''} ${this.props.color ? 'teacher--' + this.props.color : ''}`}
        style={{backgroundImage: `url(${this.image})`}}
      >
        <div className="teacher__info">
          <div className="teacher__name">{this.props.name}</div>
          <div className="teacher__about">
            { /* block yields for content here */ }
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}

Teacher.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  fliped: PropTypes.bool,
  color: PropTypes.string,
}

export default Teacher


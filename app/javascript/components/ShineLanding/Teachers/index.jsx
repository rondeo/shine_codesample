import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import GroupTeacher from 'components/GroupTeacher'
import Button from 'components/Button'
import Circle from 'images/svg/circle'
//import css from './style.scss'

class Teachers extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

    this.DOM = {}
  }

  componentDidMount() {
    this.DOM = {
      parallax: document.querySelector('.js-parallax-background'),
      section: document.querySelector('.js-parallax-section')
    }

    if (this.DOM.parallax) {
      let containerW = $(this.DOM.parallax).width()
      let containerH = $(this.DOM.parallax).height()

      $(this.DOM.section).on('mousemove', (event) => {
        console.log(event)
        var posX = event.screenX,
          posY = event.screenY,
          left = containerW / 2 - posX,
          top = containerH / 2 - posY

          Array.from(document.querySelector('.js-parallax-background').children).forEach(item => {

          $(item).css({
            transform: `translate(${left / 10}px, ${top / 10}px)`,
          })
        })
      })
    }
  }

  render() {
    return (
      <section className="shineLanding section-teachers js-parallax-section">
        <div className="container-fluid">
          <div className="text-center">
            <h4>Meet our teachers</h4>
            <h2>They Can't Wait To Meet You</h2>
          </div>
          <div className="section-teachers__background js-parallax-background">
            <div className="section-teachers__icon section-teachers__icon--1">
              <Circle />
            </div>
            <div className="section-teachers__icon section-teachers__icon--2">
              <Circle />
            </div>
          </div>
          <div className="section-teachers__teachers">
            <GroupTeacher
            />
          </div>
          <div className="section-teachers__bottom">
          {
            /*
            <Button
              orange={true}
            >
              <span>Meet more teachers</span>
            </Button>
            */
          }
          </div>
        </div>
      </section>
    )
  }
}

Teachers.propTypes = {
}

export default Teachers


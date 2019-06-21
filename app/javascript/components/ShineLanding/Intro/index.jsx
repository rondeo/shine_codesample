import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import GuidedSearch from 'components/GuidedSearch'
import Button from 'components/Button'
import Modal from 'components/Modal'
import HeaderFake from 'components/HeaderFake'

class SectionIntro extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalId: null,
    }

    this.openModal = ::this.openModal
    this.closeModal = ::this.closeModal
  }

  static MODAL_GUIDED_SEARCH = 'GUIDED_SEARCH'

  openModal() {
    this.setState({
      modalId: SectionIntro.MODAL_GUIDED_SEARCH,
    })
  }
  closeModal() {
    this.setState({
      modalId: null,
    })
  }

  render() {
    return (
      <div className="shineLanding">
        <div
          style={{
          }}
          className="section-intro"
        >
          <div className="section-intro__content">
            <div className="section-intro__content--left">
              <h1>It's Time to <span className="highlight">Shine</span></h1>
              <h2 className="">Get matched with the best tutors in your neighborhood.</h2>
              <p className="showMobile">
                We match you with hand-picked tutors in your neighborhood. Satisfaction guaranteed.
              </p>
              { /*
              <h3>Find the right tutor for <span className="highlight">YOU</span></h3>
              */ }
            </div>
            <div
            >
              <Button
                className="section-intro__content__button"
                orange={true}
                onClick={this.openModal}
              >
                <span className="hideMobile">
                  Let's Get Those Grades Up!
                </span>
                <span className="showMobile">
                  Get Started Today
                </span>
              </Button>
              <Modal
                id={SectionIntro.MODAL_GUIDED_SEARCH}
                isOpen={this.state.modalId === SectionIntro.MODAL_GUIDED_SEARCH}
                onClose={this.closeModal}
                closeDark={true}
              >
                <HeaderFake
                />
                <div
                  className="shineLanding"
                  tabIndex="-1"
                >
                  <div
                    className="section-intro__content--right"
                    tabIndex="-1"
                  >
                    <GuidedSearch />
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SectionIntro.propTypes = {
}

export default SectionIntro


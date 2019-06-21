import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import SectionHead from 'components/SectionHead'
import ApplicationInfo from 'components/ApplicationInfo'
import ApplicationThanks from 'components/ApplicationThanks'
import TutorBenefits from 'components/BenefitsTutor'
import Button from 'components/Button'
import Modal from 'components/Modal'
import Footer from 'components/Footer'

class PageTutorApplication extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalId: null,
      step: 1,
    }

    this.openApplyModal = ::this.openApplyModal
    this.closeApplyModal = ::this.closeApplyModal

    this.nextStep = ::this.nextStep;
  }

  static MODAL_APPLY = 'APPLY'

  openApplyModal() {
    this.setState({
      modalId: PageTutorApplication.MODAL_APPLY,
    })
  }
  closeApplyModal() {
    this.setState({
      modalId: null,
    })
  }

  nextStep() {
    this.setState({ step: this.state.step + 1 });
  }

  render() {
    return (
      <div
        className="page-application__wrapper"
      >
      <div
        className="page-application"
      >
        <div className="page-application__content">
          <div className="container-fluid">
            <div className="page-application__title">
              <h1>
                {/*
                  Math Whizzes / Science Superstars / English Excellers / SAT Standard-Setters
                  */}
                  <span className="expand">Expand</span> Your Tutoring <span className="hideMobile">Practice</span>
              </h1>
              <h3>
                Pick a subject specialty and connect with students who need your skills.
              </h3>
              <p className="hideMobile">
                Whether you're a new tutor or a full-time professional, we'll help you find new students - on your hours, at your established rate.
              </p>
              <Button
                className="page-application__title__button"
                orange={true}
                bigWidth={true}
                onClick={this.openApplyModal}
              >
                Start Teaching
              </Button>
            </div>
            <div className="page-application__application">
              <Modal
                id={PageTutorApplication.MODAL_APPLY}
                isOpen={this.state.modalId === PageTutorApplication.MODAL_APPLY}
                onClose={this.closeApplyModal}
              >
                <ApplicationInfo
                />
              </Modal>
            </div>
          </div>
          <div
            className="page-application__benefits"
          >
            <div className="container-fluid">
              <h4>
                Get Started Growing Your Business
              </h4>
              <h2>
                Creating Your Profile is 100% Free
              </h2>
              <TutorBenefits
              />
            </div>
          </div>
          <div
            className="page-application__faq"
          >
            <div className="container-fluid">
              <h4>
                Here's What You Need to Know
              </h4>
              <h2>
                Some Frequently Asked Questions
              </h2>
              <div
              >
                <h3>
                  How do I find students?
                </h3>
                <p>
                  Students will message you through Shine and you'll be able to chat with them directly to set up lessons. We do as much as possible to recommend you to parents and create the right match, so you'll be able to answer any questions and go straight to figuring out a good time and place to meet for lessons.
                </p>
              </div>
              <div
              >
                <h3>
                  Do I have to pay to use Shine?
                </h3>
                <p>
                  No! Using Shine is 100% free and will always be. Our commission model means that we only earn when you do, and we'll never take a cut out of your rate to make it. Your rate is what you earn, every session.
                </p>
              </div>
              <div
              >
                <h3>
                  Can I bring my profile from another tutoring site?
                </h3>
                <p>
                  Yes! Simply email us at tutors@shinetutors.co with a link to your existing tutor profile, and we'll take care of importing your profile for you - easy peasy!
                </p>
              </div>
              <div
              >
                <h3>
                  How often will I get paid?
                </h3>
                <p>
                  Short answer: every week! Shine disburses payments weekly through our payment processor, Stripe - meaning you will always have up-to-date, automatic payments straight to your bank account. Any unexpected delays? Email us at tutors@shinetutors.co and we'll sort it out right away.
                </p>
              </div>
              <div>
                <h3>
                  How many students can I have?
                </h3>
                <p>
                  As many as you want! There is no limit to the number of students you can find through Shine. If you'd like to tutor part-time to earn extra money, that is fine with us, and if you'd like to make tutoring your full-time occupation, we're happy with that too. Our goal is to give you the flexibility to share your skills in whatever way works for you.
                </p>
              </div>
              <div>
                <h3>
                  Which tutors get the most students on Shine?
                </h3>
                <p>
                  All tutors on Shine have a subject specialty, so we find that everyone gets more interest than usual! Other than that, references help! If you don't have any prior references, consider offering a free first lesson - that'll get people in the door, and you can ask for a reference directly afterwards.
                </p>
              </div>
              <div>
                <h3>
                  What is a tutoring reference?
                </h3>
                <p>
                  We find that hearing about what it's like to work with you is a critical part of getting parents excited about working with you! When creating your profile, we give you the option to request one or more reference(s). This can be from parents of classmates, teachers, or simply just students you've worked with. The more references, the better! The more people see testimonials about your work, the more likely they are to get excited about choosing you to be their tutor!
                </p>
              </div>
              <div>
                <h3>
                  Can you support my subject?
                </h3>
                <p>
                  Yes! We're always adding new subjects to the Shine platform, and would love to support your favorite as well! Don't see the subject you want? Shoot us an email at tutors@shinetutors.co, and we'll get back to you straight away.
                </p>
              </div>
              <div>
                <h3>
                  How can I get in touch?
                </h3>
                <p>
                  We love hearing from Shine tutors! Simply send an email with your question or concern to tutors@shinetutors.co, and we'll get back to you straight away.
                </p>
              </div>
              <div>
                <h3>
                  Ready to Go?
                </h3>
                <p>
                  It's easy to start teaching. Create your profile now and start meeting new students today!
                </p>
                <Button
                  className="page-application__title__button"
                  orange={true}
                  bigWidth={true}
                  onClick={this.openApplyModal}
                >
                  Start Teaching
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer
        />
      </div>
    </div>
    )
  }
}

PageTutorApplication.propTypes = {
}

export default PageTutorApplication


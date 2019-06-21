import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import graduatingStudent from 'images/grad-student-small'
//import css from './style.scss'

class AboutUs extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <main
        className="page-about-us"
      >
        <div className="container-fluid">
          <article className="our-story">
            <h1>Our Story</h1>
            <section className="about">
              <h2>Founded by Teachers</h2>
              <p>While working as teachers in Los Angeles and San Francisco, our founders were frustrated by the lack of options that seemed to put real learning first. There were many sites that promoted tutors and their achievements, but few that highlighted great tutors and their ability to really teach - to communicate in a way that students could really understand. We created Shine to find and share those teachers. Whatever your subject, specialty, or location, we want to provide a way for you to share your gifts with those who seek them - and ensure high-quality learning in the process.</p>
            </section>
            <section className="approach">
              <h2>Grounded in Research</h2>
              <p>
                On the first day of teaching, they tell you, "Students learn best from someone who cares." The learning sciences literature bears this out. Research shows that learning is built on empathy and communication, as well as consistent practice. At Shine, we seek out tutors who exemplify these scientific characteristics - to create a smooth, fun, and productive learning experience for you.
              </p>
                { /* At Shine, we combine our research-backed learning theory with modern algorithms to match you with someone that is right for you. */ }
                { /* Our approach to finding great tutors is grounded in the learning sciences literature. Beyond  */ }
            </section>
            <section className="caring">
              <h2>To Help All Students Grow</h2>
              <p>A great tutor is more than an knowledgeable teacher or a helpful friend - a great tutor inspires, challenges, and builds your student up to be the best he or she can be. A great tutor will not only help you finish your homework today, but will plant ideas that will set you up for your college admissions essays, four years from now. A great teacher cares. We want every student to feel that kind of support as they reach the next step in their educational journey. Ready to Shine? Let us know how we can help.</p>
            </section>
          </article>
        </div>
      </main>
    )
  }
}

AboutUs.propTypes = {
}

export default AboutUs


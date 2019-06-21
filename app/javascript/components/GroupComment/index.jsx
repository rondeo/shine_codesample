import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Comment from 'components/Comment'
import slick from 'slick-carousel'
//import css from './style.scss'

class GroupComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

    this.DOM = {}
  }
  componentDidMount() {
    this.DOM.$comments = document.querySelector('.js-comments')

    $(this.DOM.$comments).slick({
      centerMode: false,
      variableWidth: false,
      slidesToShow: 3,
      slidesToScroll: 1,

      speed: 1500,
      autoplay: true,
      infinite: true,
      pauseOnDotsHover: true,
      pauseOnHover: true,
      arrows: false,
      dots: true,
      cssEase: 'cubic-bezier(0.19, 1, 0.22, 1)',
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,

            centerMode: false,
            variableWidth: false,
          },
        },
      ],
    })
  }

  render() {
    return (
      <div className="group-comments js-comments">
        <Comment
          text="Alison is easygoing and adaptable. She approaches the lesson in a creative, methodical, and organized fashion and will not proceed until you get it. If my teachers in school were as caring and conscientious, I wouldn't be writing this review! Thanks Alison."
          author="Mia P."
          location="Berkeley"
        />
        <Comment
          text="Frank has been a very effective and engaging SAT tutor for my son. Frank is very well versed in the material and testing process, and he taught my son several useful strategies. He is knowledgeable as well as friendly and approachable, which made the experience very positive and worthwhile for us."
          author="Liz H."
          location="Mill Valley"
        />
        <Comment
          text='Teddy has a unique way of talking to both of our sons, in a way that is not intimidating but engaging. They want to talk to Teddy about what they are studying and tell him how they are doing in school. We are really grateful that Teddy is helping our son.'
          author="Anne S."
          location="San Mateo"
        />
        <Comment
          text="Eliza understands how math is being taught today in High School and was able to quickly understand and help each of my kids. She spent time with me after her initial session talking about her observations with each student and giving me pointers about how I can assist with their learning."
          author="Astra P."
          location="Danville"
        />
        <Comment
          text="Our son has always struggled with his math classes and was challenged to obtain a C or above. We found Jameson was a perfect match for the tutoring. They met at the local library near our home once a week. His grades on test and assignments greatly improved included even some A's."
          author="Andrew M."
          location="San Francisco"
        />
      </div>
    )
  }
}

GroupComment.propTypes = {
}

export default GroupComment


import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Intro from 'components/ShineLanding/Intro'
import Connect from 'components/ShineLanding/Connect'
import Benefits from 'components/ShineLanding/Benefits'
import Teachers from 'components/ShineLanding/Teachers'
import Comments from 'components/ShineLanding/Comments'
import City from 'components/ShineLanding/City'
import TutorApplicationProcess from 'components/ShineLanding/Process'
import StayInTouch from 'components/ShineLanding/StayInTouch'
import Footer from 'components/Footer'
//import css from './style.scss'

class ShineLanding extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
    // load Intercom in prod
    if (/shinetutors.co/.test(window.location.hostname)) {
      (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/rc0lg6pe';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
      window.Intercom("boot", {
        app_id: "rc0lg6pe"
      });
    }
  }

  render() {
    return (
      <main className="shineLanding">
        <Intro />
        <Benefits />
        <Teachers />
        <Comments />
        <City />
        <TutorApplicationProcess />
        <StayInTouch />
        <Footer />

        { /* Intercom */ }
      </main>
    )
  }
}

ShineLanding.propTypes = {
}

export default ShineLanding


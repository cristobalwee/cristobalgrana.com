import React, { Component, PropTypes } from 'react';
import '../styles.scss';
import { TimelineMax, TweenMax } from 'gsap';
import $ from 'jquery';
import MobileProject from '../components/mobileproject.jsx';

class Mobile extends Component {
  render() {
    return (
      <div className="center">
        <div className="nav-bar-responsive">
          <img className="pointer" src="/public/media/logo.svg"></img>
        </div>
        <div id="landing-responsive" className="center">
          <div className="content">
            <h1 id="landing-head">Hello there</h1>
            <h3 id="landing-sub-head">My name is Cristobal Graña, and I'm a <span id="landing-2-sub-head">Student at UIUC</span></h3>
          </div>
        </div>
        <MobileProject
          title="Telescope"
          description="Development, UI Framework"
          info="I started learning Vue.js recently, and I noticed there aren't very many
            UI component frameworks out there, so I decided to make one. I'm still working
            on it since it's more ambitious than what I'm used to."
          img="telescope.png"
          number="01"
          color="#404e5c"
          link="https://github.com/cristobalwee/telescope"/>
      </div>
    );
  }
}

export default Mobile;

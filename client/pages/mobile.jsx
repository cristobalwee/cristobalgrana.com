import React, { Component, PropTypes } from 'react';
import '../styles.scss';
import { TimelineMax, TweenMax } from 'gsap';
import $ from 'jquery';
import MobileProject from '../components/mobileproject.jsx';

class Mobile extends Component {
  componentDidMount() {
    $(document).ready(function() {
      const winH = $(window).height() - 100;
      $(window).scroll(function() {
        if ($(window).scrollTop() > winH) {
          $('.nav-bar-responsive').css("position", "fixed");
          $('.nav-bar-responsive').css("display", "block");
        }
        if ($(window).scrollTop() <= winH) {
          $('.nav-bar-responsive').css("display", "none");
          $('.nav-bar-responsiver').css("position", "static");
        }
      });
    });
    const landingHead = $("#landing-head");
    const landingSubHead = $("#landing-sub-head");
    const landingSubHead2 = $("#landing-2-sub-head");
    this.tweenUp(landingHead, 0.15);
    this.tweenUp(landingSubHead, 0.3);

    const subtitles = ["Design Technologist",
                      "UX Engineer",
                      "Frontend Web Developer",
                      "UI/UX Designer",
                      "Private Pilot",
                      "Trivia Enthusiast",
                      "Student at UIUC"];
    // let idx = 0;
    // setInterval(() => {
    //   if (idx > 6) {
    //     idx = 0;
    //   }
    //   landingSubHead2.css("opacity", "0");
    //   setTimeout(() => {
    //     document.getElementById("landing-2-sub-head").innerHTML = subtitles[idx++];
    //     landingSubHead2.css("opacity", "1");
    //   }, 1000);
    // }, 2500);
  }

  tweenUp(object, time) {
    TweenMax.from(object, 0.75, {delay: time, top: "20px", opacity: "0", ease: Elastic.easeOut.config(2, 1)});
  }

  scroll() {
    $('html,body').animate({scrollTop: $("#telescope-responsive").offset().top}, 'slow');
  }

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
          <div className="bottom center expanded">
            <div className="mouse center link" onClick={this.scroll}>
              <div className="scrollwheel">
              </div>
            </div>
          </div>
        </div>
        <div id="telescope-responsive">
          <MobileProject
            title="Telescope"
            description="Design + Development, UI Framework"
            img="telescope.png"
            number="01"
            color="#404e5c"
            link="https://github.com/cristobalwee/telescope"/>
        </div>
        <div id="godaddy-responsive">
          <MobileProject
            title="GoDaddy"
            description="UI/UX Design Intern"
            img="godaddy.png"
            number="02"
            color="#3fb54f"
            link="https://godaddy.com"/>
        </div>
        <div id="gastronomads-responsive">
          <MobileProject
            title="Gastronomads"
            description="Design + Development, Website"
            img="gastronomads.png"
            number="03"
            color="#838383"
            link="https://www.gastronomads.co/"/>
        </div>
        <div id="foodful-responsive">
          <MobileProject
            title="Foodful"
            description="Design + Development, Website"
            img="foodful.png"
            number="04"
            color="#d0e8f9"
            link="https://github.com/cristobalwee/foodful"/>
        </div>
        <div id="contact-responsive">
          <div className="content-fix">
            <h1 id="contact-head">Currently <a href="mailto:hellothere@cristobalgrana.me"><span className="underline">for hire</span></a></h1>
            <h4 id="contact-sub-head">Willing to work in exchange for Shackburgers. <a href="/public/media/resume.pdf" target="_blank">Resume</a></h4>
            <div id="contact-icons">
              <a target="_blank" href="https://www.linkedin.com/in/cristobal-grana-samanez"><img className="inline" src="/public/media/linkedin.svg"></img></a>
              <a target="_blank" href="https://github.com/cristobalwee"><img className="inline" src="/public/media/github.svg"></img></a>
              <a target="_blank" href="https://www.behance.net/cristobalw918d"><img className="inline" src="/public/media/behance.svg"></img></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Mobile;

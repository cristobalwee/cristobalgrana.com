import React, { Component, PropTypes } from 'react';
import '../styles.scss';
import { TimelineMax, TweenMax } from 'gsap';
import $ from 'jquery';
import MobileProject from '../components/mobileproject.jsx';

class Mobile extends Component {
  componentDidMount() {
    $(document).ready(function() {
      var winH = $(window).height() - 100;
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
        </div>
        <div id="telescope-responsive">
          <MobileProject
            title="Telescope"
            description="Development, UI Framework"
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
      </div>
    );
  }
}

export default Mobile;

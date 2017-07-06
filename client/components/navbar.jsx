import React, { Component, PropTypes } from 'react';
import '../styles.scss';
import { TimelineMax, TweenMax } from 'gsap';
import $ from 'jquery';

class Navbar extends Component {
  render() {
    return (
      <div className="nav-bar">
        <img src="/public/media/logo.svg"></img>
      </div>
    );
  }
}

export default Navbar;

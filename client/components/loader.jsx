import React, { Component, PropTypes } from 'react';
import '../styles.scss';
import { TimelineMax, TweenMax } from 'gsap';
import $ from 'jquery';

class Loader extends Component {
  componentDidMount() {
    const loader = $("#loader-img");
    let tl = new TimelineMax({repeat: 1});
    tl.add(TweenMax.to(loader, 1.5, {rotation: "-360", ease: Power3.easeInOut}));
    TweenMax.to(loader, 0.75, {delay: 3, y: 20, opacity: 0, ease: Elastic.easeIn.config(2, 0.6)});
  }

  render() {
    return (
      <div id="loader">
        <img id="loader-img" className="content" src="public/media/logo.svg"></img>
      </div>
    );
  }
}

export default Loader;

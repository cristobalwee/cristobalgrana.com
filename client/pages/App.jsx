import React, { Component, PropTypes } from 'react';
import '../styles.scss';
import { TimelineMax, TweenMax } from 'gsap';
import $ from 'jquery';

import Project from '../components/project.jsx';

//https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc
//http://www.last.fm/api/show/user.getRecentTracks
//https://support.spotify.com/us/using_spotify/app_integrations/scrobble-to-last-fm/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollFlag: true,
      currPos: 0,
      positions: [
        "#landing",
        "#about",
        "#telescope",
        "#godaddy",
        "#gastronomads",
        "#contact"
      ],
      tweens: [
        ["#landing-head", "#landing-sub-head", "#landing-2-sub-head"],
        ["#about-head", "#about-info", "#about-contact"],
        ["#telescope-info", "#telescope-photo"],
        ["#godaddy-info", "#godaddy-photo"]
      ]
    };
    this.scroll = this.scroll.bind(this);
  }

  componentDidMount() {
    var landingHead = $("#landing-head");
    var landingSubHead = $("#landing-sub-head");
    var landingSubHead2 = $("#landing-2-sub-head");
    this.tweenUp(landingHead, 0.15);
    this.tweenUp(landingSubHead, 0.3);
    this.tweenUp(landingSubHead2, 0.45);

    // $("body").bind("mousewheel", this.scroll);
    // $("body").bind("mousewheel", function(e) {
    //   console.log(this.state);
    //   if (this.state.scrollFlag) {
    //     console.log("prescroll");
    //     this.setState({scrollFlag: false})
    //     return false;
    //   }
    // });
  }

  scroll() {
    this.renderNext(0, 1, ["#landing-head", "#landing-sub-head", "#landing-2-sub-head"], ["#about-head", "#about-info", "#about-contact"]);
  }

  tweenUp(object, time) {
    TweenMax.from(object, 0.75, {delay: time, top: "20px", opacity: "0", ease: Elastic.easeOut.config(2, 1)});
  }

  tweenDown(object, time) {
    TweenMax.to(object, 0.75, {delay: time, top: "-20px", opacity: "0", ease: Elastic.easeIn.config(2, 0.5)});
  }

  projectIn(project, time) {
    TweenMax.from(project, 0.75, {delay: time, y: -100, opacity: "0", ease: Elastic.easeOut.config(2, 1)});
  }

  projectOut(project, time) {
    TweenMax.to(project, 0.75, {delay: time, y: 100, opacity: "0", ease: Elastic.easeOut.config(2, 1)});
  }

  resetTween(object) {
    $(object).css("top", "0");
    $(object).css("opacity", "1");
  }

  hide(object, time) {
    TweenMax.to(object, 0.1, {delay: time, display: "none"});
  }

  show(object, time) {
    TweenMax.to(object, 0.1, {delay: time, display: "block", opacity: "1"});
  }

  renderNext(current, next, tweensOut, tweensIn) {
    var mouse = $("#mouse-anim");

    if (current === 0) {
      TweenMax.to($(".nav-bar"), 0.45, {delay: 2.2, top: "0", ease: Power2.easeOut});
      TweenMax.to($(".position"), 0.45, {delay: 2.2, right: "0", ease: Power2.easeOut});
      TweenMax.to(mouse, 0.75, {y: 100, opacity: "0", ease: Elastic.easeIn.config(2, 0.5)});
    }

    if (next === 0) {
      TweenMax.to($(".nav-bar"), 0.45, {top: "-100px", ease: Power2.easeIn});
      TweenMax.to($(".position"), 0.45, {right: "-100px", ease: Power2.easeIn});
      TweenMax.to(mouse, 0.75, {delay: 2.2, y: 0, opacity: "1", ease: Power2.easeOut});
    }

    if (next === 2) {
      this.show($("#lines"), 0.1)
      TweenMax.to($("#lines"), 0.45, {height: "auto", ease: Power2.easeIn});
    }

    tweensOut.map((elem, i) => {
      let delay = 0.15 + (0.15 * i);
      this.tweenDown($(elem), delay);
    });
    this.hide($(this.state.positions[current]), 1.6);
    this.show($(this.state.positions[next]), 1.6);
    tweensIn.map((elem, i) => {
      let delay = 1.75 + (0.15 * i);
      this.resetTween(elem);
      this.tweenUp($(elem), delay);
    });

    this.state.currPos = next;
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <div className="nav-bar">
          <img className="pointer" onClick={() => this.renderNext(this.state.currPos, 0, this.state.tweens[this.state.currPos], this.state.tweens[0])} src="/public/media/logo.svg"></img>
        </div>
        <div className="position">
          <p className="pointer" onClick={() => this.renderNext(this.state.currPos, 1, this.state.tweens[this.state.currPos], this.state.tweens[1])}>about</p>
          <p className="pointer" onClick={() => this.renderNext(this.state.currPos, 2, this.state.tweens[this.state.currPos], this.state.tweens[2])}>works</p>
          <span id="lines">
            <img onClick={() => this.renderNext(this.state.currPos, 2, this.state.tweens[this.state.currPos], this.state.tweens[2])} src="/public/media/line.svg"></img><br></br>
            <img onClick={() => this.renderNext(this.state.currPos, 3, this.state.tweens[this.state.currPos], this.state.tweens[3])} src="/public/media/line.svg"></img><br></br>
            <img onClick={() => this.renderNext(this.state.currPos, 4, this.state.tweens[this.state.currPos], this.state.tweens[4])} src="/public/media/line.svg"></img><br></br>
          </span>
          <p className="pointer" onClick={() => this.renderNext(this.state.currPos, 3, this.state.tweens[this.state.currPos], this.state.tweens[3])}>contact</p>
        </div>
        <div id="landing" className="center">
          <div className="content">
            <h1 id="landing-head">Hello there</h1>
            <h3 id="landing-sub-head">My name is Cristobal Graña, and I'm a</h3>
            <h3 id="landing-2-sub-head">Student at UIUC</h3>
          </div>
          <div id="mouse-anim" className="bottom center expanded responsivehide">
            <div className="mouse center link" onClick={this.scroll}>
              <div className="scrollwheel responsivehide">
              </div>
            </div>
          </div>
        </div>
        <div id="about" className="center">
          <div className="content-fix center">
            <h1 id="about-head">About Me</h1>
            <h4 id="about-info">I’m a Math and Computer Science Major at the University of Illinois at Urbana Champaign.
              I love crafting interfaces and user experiences, and learning about useless facts and trivia.
              I’m all about working with the frontend of websites to implement minimalist designs.</h4>
            <div id="about-contact">
              <span className="left">
                <a target="_blank" href="https://www.linkedin.com/in/cristobal-grana-samanez"><img className="inline" src="/public/media/linkedin.svg"></img></a>
                <a target="_blank" href="https://github.com/cristobalwee"><img className="inline" src="/public/media/github.svg"></img></a>
                <a target="_blank" href="https://www.behance.net/cristobalw918d"><img className="inline" src="/public/media/behance.svg"></img></a>
              </span>
              <span className="right">
                <a href="mailto:hellothere@cristobalgrana.com"><h4 className="inline pointer">Hello</h4></a>&nbsp;&nbsp;
                <h4 className="inline pointer">Resume</h4>
              </span>
            </div>
          </div>
        </div>
        <div id="telescope" className="center">
          <Project
            title="Telescope"
            description="Development, UI Framework"
            info="I started learning Vue.js recently, and I noticed there aren't very many
              UI component frameworks out there, so I decided to make one. I'm still working
              on it since it's more ambitious than what I'm used to."
            img="telescope.png"
            number="01"
            color="#404e5c"
            link="https://github.com/cristobalwee/foodful"/>
        </div>
        <div id="godaddy" className="center">
          <Project
            title="GoDaddy"
            description="UI/UX Design Intern"
            info="I’m currently interning at GoDaddy in Scottsdale, AZ as part of the Hosting
            UI team. My job is mainly to write and maintain components for the shared GoDaddy
            react framework."
            img="godaddy.png"
            number="02"
            color="#3fb54f"
            link="https://github.com/cristobalwee/foodful"/>
        </div>
      </div>
    );
  }
}

export default App;

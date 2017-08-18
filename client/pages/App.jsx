import React, { Component, PropTypes } from 'react';
import '../styles.scss';
import { TimelineMax, TweenMax } from 'gsap';
import $ from 'jquery';
import axios from 'axios';

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
        "#foodful",
        "#contact"
      ],
      tweens: [
        ["#landing-head", "#landing-sub-head", "#landing-2-sub-head"],
        ["#about-head", "#about-info", "#about-contact"],
        ["#telescope-info", "#telescope-photo"],
        ["#godaddy-info", "#godaddy-photo"],
        ["#gastronomads-info", "#gastronomads-photo"],
        ["#foodful-info", "#foodful-photo"],
        ["#contact-head", "#contact-sub-head", "#contact-links"]
      ]
    };
    this.scroll = this.scroll.bind(this);
  }

  componentDidMount() {
    const landingHead = $("#landing-head");
    const landingSubHead = $("#landing-sub-head");
    const landingSubHead2 = $("#landing-2-sub-head");
    this.tweenUp(landingHead, 0.15);
    this.tweenUp(landingSubHead, 0.3);
    this.tweenUp(landingSubHead2, 0.45);
    let flag = true;

    $("body").bind("mousewheel", (e) => {
      if (flag) {
        if(e.originalEvent.wheelDelta /120 < 0) {
          this.scroll(true);
        }
        if (e.originalEvent.wheelDelta /120 > 0) {
          this.scroll(false);
        }
        flag = false;
        setTimeout(() => {
          flag = true;
        }, 2000);
      }
    });

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

  scroll(down) {
    if (down) {
      if (this.state.currPos === 6) {
        return;
      }
      this.renderNext(this.state.currPos, this.state.currPos + 1, this.state.tweens[this.state.currPos], this.state.tweens[this.state.currPos + 1]);
    }
    else {
      if (this.state.currPos === 0) {
        return;
      }
      this.renderNext(this.state.currPos, this.state.currPos - 1, this.state.tweens[this.state.currPos], this.state.tweens[this.state.currPos - 1]);
    }
  }

  onRepeat(tl) {
    tl.invalidate().restart()
  }

  tweenUp(object, time) {
    TweenMax.from(object, 0.75, {delay: time, top: "20px", opacity: "0", ease: Elastic.easeOut.config(2, 1)});
  }

  tweenDown(object, time) {
    TweenMax.to(object, 0.75, {delay: time, top: "-20px", opacity: "0", ease: Elastic.easeIn.config(2, 0.5)});
  }

  tweenOut(object, time) {
    TweenMax.to(object, 0.75, {delay: time, top: "20px", opacity: "0", ease: Elastic.easeIn.config(2, 0.5)});
  }

  projectIn(project, time) {
    TweenMax.from(project, 0.75, {delay: time, top: "20px", opacity: "0", ease: Elastic.easeOut.config(2, 1)});
  }

  projectOut(project, time) {
    TweenMax.to(project, 0.75, {delay: time, top: "-20px", opacity: "0", ease: Elastic.easeIn.config(2, 0.5)});
  }

  projectDown(project, time) {
    TweenMax.to(project, 0.75, {delay: time, top: "20px", opacity: "0", ease: Elastic.easeIn.config(2, 0.5)});
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
    const mouse = $("#mouse-anim");
    const self = this;

    if (next === current) {
      return;
    }

    switch(next) {
      case 0:
        TweenMax.to($(".nav-bar"), 0.45, {top: "-100px", ease: Power2.easeIn});
        TweenMax.to($(".position"), 0.45, {right: "-100px", ease: Power2.easeIn});
        TweenMax.to(mouse, 0.75, {delay: 2.2, y: 0, opacity: "1", ease: Power2.easeOut});
        $("#lines").children().removeClass("current");
        TweenMax.to($("#lines"), 0.35, {height: 0, opacity: "0", display: "none"});
        break;
      case 1:
        $("#about-link").addClass("selected");
        $("#works-link").removeClass("selected");
        $("#contact-link").removeClass("selected");
        $("#lines").children().removeClass("current");
        TweenMax.to($("#lines"), 0.35, {height: 0, opacity: "0", display: "none"});
        break;
      case 2:
        $("#about-link").removeClass("selected");
        $("#works-link").addClass("selected");
        $("#contact-link").removeClass("selected");
        $("#lines").children().removeClass("current");
        setTimeout(() => {
          $("#first-line").addClass("current");
        }, 1750);
        break;
      case 3:
        $("#about-link").removeClass("selected");
        $("#works-link").addClass("selected");
        $("#contact-link").removeClass("selected");
        $("#lines").children().removeClass("current");
        setTimeout(() => {
          $("#second-line").addClass("current");
        }, 1750);
        break;
      case 4:
        $("#about-link").removeClass("selected");
        $("#works-link").addClass("selected");
        $("#contact-link").removeClass("selected");
        $("#lines").children().removeClass("current");
        setTimeout(() => {
          $("#third-line").addClass("current");
        }, 1750);
        break;
      case 5:
        if (current === 6) {
          this.show($("#lines"), 0.1);
          TweenMax.to($("#lines"), 0.45, {height: "auto", ease: Power2.easeIn});
        }
        $("#about-link").removeClass("selected");
        $("#works-link").addClass("selected");
        $("#contact-link").removeClass("selected");
        $("#lines").children().removeClass("current");
        setTimeout(() => {
          $("#fourth-line").addClass("current");
        }, 1750);
        break;
      case 6:
        $("#about-link").removeClass("selected");
        $("#works-link").removeClass("selected");
        $("#contact-link").addClass("selected");
        $("#lines").children().removeClass("current");
        TweenMax.to($("#lines"), 0.35, {height: 0, opacity: "0", display: "none"});
        break;
      default:
        $("#about-link").removeClass("selected");
        $("#works-link").removeClass("selected");
        $("#contact-link").removeClass("selected");
        break;
    }

    if (current === 0) {
      TweenMax.to($(".nav-bar"), 0.45, {delay: 2.2, top: "0", ease: Power2.easeOut});
      TweenMax.to($(".position"), 0.45, {delay: 2.2, right: "0", ease: Power2.easeOut});
      TweenMax.to(mouse, 0.75, {y: 50, opacity: "0", ease: Elastic.easeIn.config(2, 0.5)});
    }

    if (next === 0) {
      TweenMax.to($(".nav-bar"), 0.45, {top: "-100px", ease: Power2.easeIn});
      TweenMax.to($(".position"), 0.45, {right: "-100px", ease: Power2.easeIn});
      TweenMax.to(mouse, 0.75, {delay: 2.2, y: 0, opacity: "1", ease: Power2.easeOut});
    }

    if (next === 2) {
      this.show($("#lines"), 0.1);
      TweenMax.to($("#lines"), 0.45, {height: "auto", ease: Power2.easeIn});
    }

    if (next < current) {
      tweensOut.reverse();

      if (current > 2) {
        tweensOut.map((elem, i) => {
          let delay = 0.15 + (0.15 * i);
          this.projectDown($(elem), delay);
        });
        this.hide($(this.state.positions[current]), 1.6);
        this.show($(this.state.positions[next]), 1.6);
        tweensIn.map((elem, i) => {
          let delay = 1.75 + (0.15 * i);
          this.resetTween(elem);
          this.tweenUp($(elem), delay);
        });

        this.state.currPos = next;
        tweensOut.reverse();
        return;
      }

      tweensOut.map((elem, i) => {
        let delay = 0.15 + (0.15 * i);
        this.tweenOut($(elem), delay);
      });
      this.hide($(this.state.positions[current]), 1.6);
      this.show($(this.state.positions[next]), 1.6);
      tweensIn.map((elem, i) => {
        let delay = 1.75 + (0.15 * i);
        this.resetTween(elem);
        this.tweenUp($(elem), delay);
      });

      this.state.currPos = next;
      tweensOut.reverse();
      return;
    }

    if (next > 1) {
      if (current < 2) {
        tweensOut.map((elem, i) => {
          let delay = 0.15 + (0.15 * i);
          this.tweenDown($(elem), delay);
        });
        this.hide($(this.state.positions[current]), 1.6);
        this.show($(this.state.positions[next]), 1.6);
        tweensIn.map((elem, i) => {
          let delay = 1.75 + (0.15 * i);
          this.resetTween(elem);
          this.projectIn($(elem), delay);
        });

        this.state.currPos = next;
        return;
      }

      tweensOut.map((elem, i) => {
        let delay = 0.15 + (0.15 * i);
        this.projectOut($(elem), delay);
      });
      this.hide($(this.state.positions[current]), 1.6);
      this.show($(this.state.positions[next]), 1.6);
      tweensIn.map((elem, i) => {
        let delay = 1.75 + (0.15 * i);
        this.resetTween(elem);
        this.projectIn($(elem), delay);
      });

      this.state.currPos = next;
      return;
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
  }

  render() {
    return (
      <div>
        <div className="nav-bar">
          <img className="pointer" onClick={() => this.renderNext(this.state.currPos, 0, this.state.tweens[this.state.currPos], this.state.tweens[0])} src="/public/media/logo.svg"></img>
        </div>
        <div className="position">
          <p id="about-link" className="pointer" onClick={() => this.renderNext(this.state.currPos, 1, this.state.tweens[this.state.currPos], this.state.tweens[1])}>about</p>
          <p id="works-link" className="pointer" onClick={() => this.renderNext(this.state.currPos, 2, this.state.tweens[this.state.currPos], this.state.tweens[2])}>works</p>
          <span id="lines">
            <img id="first-line" onClick={() => this.renderNext(this.state.currPos, 2, this.state.tweens[this.state.currPos], this.state.tweens[2])} src="/public/media/line.svg"></img><br></br>
            <img id="second-line" onClick={() => this.renderNext(this.state.currPos, 3, this.state.tweens[this.state.currPos], this.state.tweens[3])} src="/public/media/line.svg"></img><br></br>
            <img id="third-line" onClick={() => this.renderNext(this.state.currPos, 4, this.state.tweens[this.state.currPos], this.state.tweens[4])} src="/public/media/line.svg"></img><br></br>
            <img id="fourth-line" onClick={() => this.renderNext(this.state.currPos, 5, this.state.tweens[this.state.currPos], this.state.tweens[5])} src="/public/media/line.svg"></img><br></br>
          </span>
          <p id="contact-link" className="pointer" onClick={() => this.renderNext(this.state.currPos, 6, this.state.tweens[this.state.currPos], this.state.tweens[6])}>contact</p>
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
                <a href="mailto:hellothere@cristobalgrana.me"><h4 className="inline pointer">Hello</h4></a>&nbsp;&nbsp;
                <a href="/public/media/resume.pdf" target="_blank"><h4 className="inline pointer">Resume</h4></a>
              </span>
            </div>
          </div>
        </div>
        <div id="telescope" className="center">
          <Project
            title="Telescope"
            description="Design + Development, UI Framework"
            info="I started learning Vue.js recently, and I noticed there aren't very many
            UI component frameworks out there, so I decided to make one. I'm still working
            on it since it's more ambitious than what I'm used to."
            img="telescope.png"
            number="01"
            color="#404e5c"
            link="https://github.com/cristobalwee/telescope"/>
        </div>
        <div id="godaddy" className="center">
          <Project
            title="GoDaddy"
            description="UI/UX Design Intern"
            info="I interned at GoDaddy in Scottsdale, AZ as part of the Hosting UI team.
            My job was mainly UX engineering and writing components for the shared GoDaddy
            react framework."
            img="godaddy.png"
            number="02"
            color="#3fb54f"
            link="https://godaddy.com"/>
        </div>
        <div id="gastronomads" className="center">
          <Project
            title="Gastronomads"
            description="Design + Development, Website"
            info="My brother wants to be a food writer and asked me to make him a cool website,
            so I did. I ended up using Meteor because I wanted to mix it up, which was cool (it
            was also really easy to use)."
            img="gastronomads.png"
            number="03"
            color="#838383"
            link="https://www.gastronomads.co/"/>
        </div>
        <div id="foodful" className="center">
          <Project
            title="Foodful"
            description="Design + Development, Website"
            info="Spawned as a final project for UIUC's CS498RK: The Art of Web Programming,
            Foodful is a simple platform that connects restaurants and businesses to food banks
            and charities."
            img="foodful.png"
            number="04"
            color="#d0e8f9"
            link="https://github.com/cristobalwee/foodful"/>
        </div>
        <div id="contact" className="center">
          <div className="content-fix">
            <h1 id="contact-head">Currently <a href="mailto:hellothere@cristobalgrana.me"><span className="underline">for hire</span></a></h1>
            <h4 id="contact-sub-head">Willing to work in exchange for Shackburgers</h4>
            <div id="contact-links">
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

export default App;

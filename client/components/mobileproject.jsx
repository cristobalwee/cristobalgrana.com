import React, { Component, PropTypes } from 'react';
import '../styles.scss';
import { TimelineMax, TweenMax } from 'gsap';
import $ from 'jquery';

const MobileProject = (props) => {
  return (
    <div className="mobile-project center" style={{backgroundColor: props.color}}>
      <img className="inline" src={"/public/media/" + props.img}></img>
      <div className="overlay">
        <div className="left mobile-project-info">
          <h1 className="inline">{props.title}</h1>
          <h1 className="inline right project-number">{props.number}</h1>
          <p>{props.description}</p>
          <a href={props.link} target="_blank"><button>check it out</button></a>
        </div>
      </div>
    </div>
  );
}

MobileProject.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  img: PropTypes.string,
  number: PropTypes.string,
  color: PropTypes.string,
  link: PropTypes.string
}

export default MobileProject;

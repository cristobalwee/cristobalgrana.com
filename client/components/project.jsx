import React, { Component, PropTypes } from 'react';
import '../styles.scss';
import { TimelineMax, TweenMax } from 'gsap';
import $ from 'jquery';

const Project = (props) => (
  <div className="center project content">
    <div id={props.title.toLowerCase() + "-photo"} className="project-photo" style={{backgroundColor: props.color}}>
      <img className="inline" src={"/public/media/" + props.img}></img>
    </div>
    <div id={props.title.toLowerCase() + "-info"} className="project-info" style={{backgroundColor: props.color}}>
      <div className="overlay">
        <h1 className="inline">{props.title}</h1>
        <h1 className="inline right">{props.number}</h1>
        <p>{props.description}</p>
        <p className="justify">{props.info}</p>
        <a href={props.link} target="_blank" rel="noopener noreferrer"><button>check it out</button></a>
      </div>
    </div>
  </div>
);

Project.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  info: PropTypes.string,
  img: PropTypes.string,
  number: PropTypes.string,
  color: PropTypes.string,
  link: PropTypes.string
}

export default Project;

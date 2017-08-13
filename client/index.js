import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import App from './pages/App.jsx';
import Mobile from './pages/mobile.jsx';
import Loader from './components/loader.jsx';

let isMobile = false;

if (screen.width < 950) {
  isMobile = true;
}

$(window).resize(function() {
  if (window.width < 950) {
    isMobile = true;
  }
  else {
    isMobile = false;
  }
});

ReactDOM.render(<Loader />, document.getElementById('root'));

setTimeout(() => {
  if (isMobile) {
    ReactDOM.render(<Mobile />, document.getElementById('root'));
  }

  else {
    ReactDOM.render(<App />, document.getElementById('root'));
  }
}, 3850);

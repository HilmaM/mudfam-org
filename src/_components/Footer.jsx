import React from 'react';
import {Link} from 'react-router-dom';

function Footer() {
  return(
    <footer className="blog-footer">
    <p>
      © {new Date().getFullYear()} <a href="https://mudfam-server.herokuapp.com/">MudFam</a>
    </p>
    <Link to={'#'} className="btn-link" onClick={scrollerIcon} >Back to Top</Link>
  </footer>
  )
}

/**
 * Icon for scrolling page up!
 */
const scrolBtn = document.getElementById('scroll-icon-btn');

window.onscroll = function(){ scrollPage }

function scrollPage () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ) {
    scrolBtn.style.display = 'block';
  } else {
    scrolBtn.style.display = 'none';
  }
}

function scrollerIcon() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

export { Footer };
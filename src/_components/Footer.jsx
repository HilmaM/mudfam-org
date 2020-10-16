import React from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
=======
import {Link} from 'react-router-dom';
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f

function Footer() {
  return(
    <footer className="blog-footer">
    <p>
      © {new Date().getFullYear()} <a href="https://mudfam-server.herokuapp.com/">MudFam</a>
    </p>
<<<<<<< HEAD
    <Link to='#' className="btn-link" onClick={scrollerIcon} >Back to Top</Link>
  </footer>
  )
};
=======
    <Link to={'#'} className="btn-link" onClick={scrollerIcon} >Back to Top</Link>
  </footer>
  )
}
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f

/**
 * Icon for scrolling page up!
 */
const scrolBtn = document.getElementById('scroll-icon-btn');

<<<<<<< HEAD
window.onscroll = function(){ scrollPage };
=======
window.onscroll = function(){ scrollPage }
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f

function scrollPage () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ) {
    scrolBtn.style.display = 'block';
  } else {
    scrolBtn.style.display = 'none';
  }
<<<<<<< HEAD
};
=======
}
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f

function scrollerIcon() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
<<<<<<< HEAD
};
=======
}
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f

export { Footer };
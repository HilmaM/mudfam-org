import React from 'react';
import { Link } from 'react-router-dom';

function SmallHomeSlider() {
  return (
      <div className="inner-manage-page" id="home">
        <div className="overlay-innerpage">
          <div className="top_w3pvt_main container"></div>
        </div>
        <div className="row top_w3pvt_main container">
          <ol className="breadcrumb d-flex" >
            <li>
              <Link to={'/home'} className="breadcrumb-item" >Home</Link>
            </li>
            <li>
              <Link to="#" className="breadcrumb-item active" >Current</Link>
            </li>
          </ol>
        </div>
      </div>
  );
}

export { SmallHomeSlider };
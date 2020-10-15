import React from 'react';

function HomeSlider() {
  return (
    <div className="carousel slide" id="myCarousel" data-ride="carousel">
      <ol className="carousel-indicators">
        <li className="active" data-target="#myCarousel" data-slide-to="0"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="banner-w3pvt-1" ></div>
        </div>
        <div className="carousel-item">
          <div className="banner-w3pvt-2" ></div>
        </div>
        <div className="carousel-item">
          <div className="banner-w3pvt-3" ></div>
        </div>
      </div>
    </div>
  );
}

export { HomeSlider };
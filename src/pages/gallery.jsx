import React from 'react';
import { SmallHomeSlider } from '../home/small-home-slider';

function Gallery () {
  return (<>
    <SmallHomeSlider />
    <section className="container p-lg-5" >
      <div className="carousel slide" id="myCarousel" data-ride="carousel">
        <ol className="carousel-indicators">
          <li className="active" data-target="#myCarousel" data-slide-to="0"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>
          <li data-target="#myCarousel" data-slide-to="3"></li>
          <li data-target="#myCarousel" data-slide-to="4"></li>
          <li data-target="#myCarousel" data-slide-to="5"></li>
          <li data-target="#myCarousel" data-slide-to="6"></li>
          <li data-target="#myCarousel" data-slide-to="7"></li>
          <li data-target="#myCarousel" data-slide-to="8"></li>
          <li data-target="#myCarousel" data-slide-to="9"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="src/tools/svg/Confetti-Doodles.svg" alt="Confetti Doodles"  className="banner-w3pvt-1"/>
          </div>
          <div className="carousel-item">
            <img src="src/tools/svg/Wavey-Fingerprint.svg" alt="Wavey Fingerprints"  className="banner-w3pvt-1" />
          </div>
          <div className="carousel-item active">
            <img src="src/tools/svg/Confetti-Doodles.svg" alt="Confetti Doodles"  className="banner-w3pvt-1"/>
          </div>
          <div className="carousel-item">
            <img src="src/tools/svg/Wavey-Fingerprint.svg" alt="Wavey Fingerprints"  className="banner-w3pvt-1" />
          </div>
          <div className="carousel-item active">
            <img src="src/tools/svg/Confetti-Doodles.svg" alt="Confetti Doodles"  className="banner-w3pvt-1"/>
          </div>
          <div className="carousel-item">
            <img src="src/tools/svg/Wavey-Fingerprint.svg" alt="Wavey Fingerprints"  className="banner-w3pvt-1" />
          </div>
          <div className="carousel-item active">
            <img src="src/tools/svg/Confetti-Doodles.svg" alt="Confetti Doodles"  className="banner-w3pvt-1"/>
          </div>
          <div className="carousel-item">
            <img src="src/tools/svg/Wavey-Fingerprint.svg" alt="Wavey Fingerprints"  className="banner-w3pvt-1" />
          </div>
          <div className="carousel-item active">
            <img src="src/tools/svg/Confetti-Doodles.svg" alt="Confetti Doodles"  className="banner-w3pvt-1"/>
          </div>
          <div className="carousel-item">
            <img src="src/tools/svg/Wavey-Fingerprint.svg" alt="Wavey Fingerprints"  className="banner-w3pvt-1" />
          </div>
        </div><a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev"><span className="carousel-control-prev-icon" aria-hidden="true"></span><span className="sr-only">Previous</span></a><a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next"><span className="carousel-control-next-icon" aria-hidden="true"></span><span className="sr-only">Next</span></a>
      </div>
  
    </section>
  </>);
};

export { Gallery };
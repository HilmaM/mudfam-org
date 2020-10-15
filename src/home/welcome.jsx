import React, { useState, useEffect } from 'react';
import { ExtensionOne } from './extn-one';
import { SponsorsSection } from './sponsors';
import { HomeSlider } from './home-slider';
import { Link } from 'react-router-dom';

/**
 * Added modules
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { subscribeService, blogpostService } from '../_services';

function WelcomeSection() {
  
  const [blogs, getBlogs] = useState(null);
  const [subs, getSubs] = useState(null);

  useEffect(() => {
    subscribeService.getAll().then(n => getSubs(n));
    blogpostService.getAll().then(n => getBlogs(n));
  }, []);
  return (<>
    <section className="banner_bottom py-5">
      <div className="container py-md-5">
        <div className="row inner_sec_info"> 
          <div className="col-md-6 banner_bottom_grid help"><img className="img-fluid" src="src/tools/images/ab.jpg" alt=" "/></div>
          <div className="col-md-6 banner_bottom_left mt-lg-0 mt-4">
            <h4><a className="link-hny" href="/sites/community">Making life happen in the river valley</a></h4>
            <p>We believe in a healthy living. Therefore we ecourage people to join leisure activities wherever they are. Updates will also come along</p><a className="btn more black mt-3" href="/sites/community">Read more</a>
          </div>
        </div>
        <div className="row features-w3pvt-main" id="features">
          <div className="col-md-4 feature-gird">
            <div className="row features-hny-inner-gd">
              <div className="col-md-3 featured_grid_left">
                <div className="icon_left_grid"><span className="fa fa-globe" aria-hidden="true"></span></div>
              </div>
              <div className="col-md-9 featured_grid_right_info pl-lg-0">
                <h4><a className="link-hny" href="/sites/#">Network with others</a></h4>
                <p>Stay tuned as we will walk with you all the way. Local music is found here. Subscribe to our emailing list so that you can receive current news and other updates </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 feature-gird">
            <div className="row features-hny-inner-gd">
              <div className="col-md-3 featured_grid_left">
                <div className="icon_left_grid"><span className="fa fa-laptop" aria-hidden="true"></span></div>
              </div>
              <div className="col-md-9 featured_grid_right_info pl-lg-0">
                <h4><a className="link-hny" href="/home/blogposts">Discussion Corner</a></h4>
                <p>Share your thoughts and whats happening in your surroundings. Perhaps you could encourage someone to do something worthile</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 feature-gird">
            <div className="row features-hny-inner-gd">
              <div className="col-md-3 featured_grid_left">
                <div className="icon_left_grid"><span className="fa fa-handshake-o" aria-hidden="true"></span></div>
              </div>
              <div className="col-md-9 featured_grid_right_info pl-lg-0">
                <h4><a className="link-hny" href="/sites/#">Stay tuned</a></h4>
                <p>As a community initiative we rely heavily on donotions from warm hearted individuals like you. Please make a donation. It counts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="services" id="services">
      <div className="over-lay-blue py-5">
        <div className="container py-md-5">
          <div className="row my-4">
            <div className="col-lg-5 services-innfo pr-5">
              <h3 className="tittle-w3ls two mb-3 text-left"><span className="pink">Basilwizi </span>is water people</h3>
              <p>the river water is so good no one dares leave it after testing it. thatd why many drink, but a few will survive the river flow.</p><a href="/sites/community"><img className="img-fluid" src="src/tools/images/p2.jpg" alt=" "/></a>
            </div>
            <div className="col-lg-7 services-grid-inf">
              <div className="row services-w3pvt-main mt-5">
                <div className="col-lg-6 feature-gird">
                  <div className="row features-hny-inner-gd mt-3">
                    <div className="col-md-2 featured_grid_left">
                      <div className="icon_left_grid"><span className="fa fa-paint-brush" aria-hidden="true"></span></div>
                    </div>
                    <div className="col-md-10 featured_grid_right_info">
                      <h4><a className="link-hny" href="#">The way of life</a></h4>
                      <p>Its our way of life, to live and survive among the river's enlightenment. If you know how to support please feel free.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 feature-gird">
                  <div className="row features-hny-inner-gd mt-3">
                    <div className="col-md-2 featured_grid_left">
                      <div className="icon_left_grid"><span className="fa fa-bullhorn" aria-hidden="true"></span></div>
                    </div>
                    <div className="col-md-10 featured_grid_right_info">
                      <h4><a className="link-hny" href="#">The way of life</a></h4>
                      <p>Small things make us great. We live on the edge of water to satiate the thirst thereof.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row services-w3pvt-main mt-5">
                <div className="col-lg-6 feature-gird">
                  <div className="row features-hny-inner-gd mt-3">
                    <div className="col-md-2 featured_grid_left">
                      <div className="icon_left_grid"><span className="fa fa-shield" aria-hidden="true"></span></div>
                    </div>
                    <div className="col-md-10 featured_grid_right_info">
                      <h4><a className="link-hny" href="#">The way of life</a></h4>
                      <p>Its our way of life, to live and survive among the river's enlightenment. If you know how to support please feel free.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 feature-gird">
                  <div className="row features-hny-inner-gd mt-3">
                    <div className="col-md-2 featured_grid_left">
                      <div className="icon_left_grid"><span className="fa fa-lightbulb-o" aria-hidden="true"></span></div>
                    </div>
                    <div className="col-md-10 featured_grid_right_info">
                      <h4><a className="link-hny" href="#">The way of life</a></h4>
                      <p>Small things make us great. We live on the edge of water to satiate the thirst thereof.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="projects py-5" id="gallery">
      <div className="container py-md-5">
        <h3 className="tittle-w3ls text-left mb-5"><span className="pink">Stunning </span>Projects</h3>
        <div className="row news-grids mt-md-5 mt-4 text-center">
          <div className="col-md-4 gal-img"><a href="#gal1"><img className="img-fluid" src="src/tools/images/g1.jpg" alt="w3pvt"/></a>
            <div className="gal-info">
              <h5>View Project<span className="decription">Website</span></h5>
            </div>
          </div>
        </div>
        <div className="pop-overlay" id="gal1">
          <div className="popup"><img className="img-fluid" src="src/tools/images/g1.jpg" alt="Popup Image"/>
            <p className="mt-4">The Self Help Group project started in 2012 and is operating in the wards of Sinansengwe, Sinampande, Nagangala and Nabusenga in the Zambezi Valley.  </p><a className="close" href="#gallery">&times;</a>
          </div>
        </div>
      </div>
    </section>
  </>);
}

export { WelcomeSection };
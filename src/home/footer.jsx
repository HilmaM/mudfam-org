import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';

function FooterSection() {
  return (<>
    <footer className="py-lg-5 py-4">
        <div className="container py-sm-3">
            <div className="row footer-grids">
                <div className="col-lg-4 mt-4">
                  <h2>
                    <Link to={'/'} className="navbar-brand px-0 mx-0 mb-4" >Basilwizi Trust</Link>
                  </h2>
                    <p className="mb-3">... for sustainable, people driven, socio-economic development in the Zambezi Valley</p>
                    <h5>Reaching out to <span>500 000+ Lives </span></h5>
                    <div className="icon-social mt-4">
                        <Link to="#" className="button-footr">
                            <FontAwesomeIcon icon={['fab', 'facebook-f']} className="fa mx-2" color="#5f9be0" />
                        </Link>
                        <Link to="#" className="button-footr">
                            <FontAwesomeIcon icon={['fab', 'twitter']} className="fa mx-2" color="skyblue" />
                        </Link>
                    </div>
                </div>
                <div className="col-lg-4 mt-4">
                    <h4 className="mb-4">Donate
                        <div className="d-flex">
                            <p>BANK: <strong>Standard Chartered Bank Zimbabwe</strong><br/>ACCOUNT NAME: <strong>Basilwizi Trust</strong><br/>ACCOUNT NUMBER :<br/><strong>87002 – 62296500</strong><br/>ADDRESS: <strong>84 Fife Street, Bulawayo, ZW</strong><br/>BRANCH
                                CODE: <strong>[5337</strong>] <br/>BANK SWIFT: <strong>[SCBLZWHXA</strong>]</p>
                        </div>
                    </h4>
                </div>
                <div className="col-lg-4 mt-4 ad-info">
                    <h4 className="mb-4">Contact Info</h4>
                    <p className="border-bottom">
                        <FontAwesomeIcon icon="map-marker" color="red" /> Stand 291, Binga, Zimbabwe <br/>
                        <FontAwesomeIcon icon="phone" color="green" /> +263 15 356 or 366 <br/>
                        <FontAwesomeIcon icon="envelope-open" color="orange" /> bast-binga@basilwizi.org <br/>
                    </p>
                </div>
            </div>
        </div>
    </footer>
    <section className="copy_right p-3 d-flex">
        <div className="container">
            <div className="row d-flex">
                <div className="col-lg-9 copy_w3pvt">
                    <p className="text-lg-left text-center">© {new Date().getFullYear()} All Rights reserved. Designed by <span><a href="https://www.facebook.com/mapenzi.mudimba" target="_blank" rel="noopener noreferrer" >MudFam</a></span></p>
                </div>
                <div className="col-lg-3 move-top text-lg-right text-center">
                    <Link to="#" className="move-top text-muted" >
                        <FontAwesomeIcon icon="angle-double-up" size="lg" className="mt-3" id="scroll-icon-btn" onClick={scrollerIcon} />
                    </Link>
                </div>
            </div>
        </div>
    </section>
  </>);
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

export { FooterSection};

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { Spinner } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import {Alert} from '../../_components';
import { newsService } from '../../_services';

function NewsPages ({match}) {
  const { path } = match;
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    newsService.getAll().then(n => setArticles(n));
  }, []);

  return (
    <section className="banner_bottom" >
    <div className="nav-scroller py-1 mb-2">
      <nav className="nav d-flex justify-content-between">
        <Link className="p-2 text-muted" to={`${path}/`} >World</Link>
        <Link className="p-2 text-muted" to={`${path}/`} >Africa</Link>
        <Link className="p-2 text-muted" to={`${path}/`} >National</Link>
        <Link className="p-2 text-muted" to={`${path}/`} >Binga</Link>
        <Link className="p-2 text-muted" to={`${path}/`} >Tonga</Link>
        <Link className="p-2 text-muted" to={`${path}/`} >Technology</Link>
        <Link className="p-2 text-muted" to={`${path}/`} >Culture</Link>
        <Link className="p-2 text-muted" to={`${path}/`} >Business</Link>
        <Link className="p-2 text-muted" to={`${path}/`} >Opinion</Link>
        <Link className="p-2 text-muted" to={`${path}/`} >Health</Link>
        <Link className="p-2 text-muted" to={`${path}/`} >Breaking News</Link>
      </nav>
    </div>
      <div className="container p-md-5" >
        <div className="row" >
          <Alert />
          <div className="col-2" >
            <div className="row p-2" >
              <Link to={`${path}/write`} target="_blank" ><FontAwesomeIcon icon="pencil-alt" size="4x" color={'lime'} /></Link>
            </div>
            <div className="row p-2" >
              <Link to={`${path}/read/:id`}><FontAwesomeIcon icon="newspaper" size="4x" color={'green'} /></Link>
            </div>
            <div className="row p-2" >
              <Link to={`${path}/edit/:id`} target="_blank" ><FontAwesomeIcon icon="paperclip" size="4x" color={'blue'} /><div className="tooltip" >Edit this article</div></Link>
            </div>
            <div className="row p-2" >
              <Link to={`${path}like`} target="_blank" ><FontAwesomeIcon icon="thumbs-up" size="4x" color={'skyblue'} /><div className="tooltip" >Like this page!</div></Link>
            </div>
          </div>
          <div className="col-10" >
            <div className="row" >
              {
                articles && articles.map(i =>
                  <div key={i.id} className="col-md-4" >
                  <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col p-4 d-flex flex-column position-static">
                      <strong className="d-inline-block mb-2 text-success">{i.category}</strong>
                      <h6 className="mb-0">{i.article_title}</h6>
                      <div className="mb-1 text-muted">{moment(i.created).format('MMMM Do, YYYY')}</div>
                      <p className="card-text mb-auto">{i.author}</p>
                      <Link to={`${path}/read/${i.id}`}className="stretched-link">Continue reading</Link>
                    </div>
                    <div className="col-auto d-none d-lg-block">
                      <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Twaabane Times"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Twaabane Times</text></svg>
                    </div>
                  </div>
                </div>)
              }
              {
                !articles && <span>
                  <Spinner animation="grow" variant="success" /><br/>
                  Loading Data ...
                </span>
              }
            </div>
          </div>
        </div>
        <div id="features" className="row features-w3pvt-main" >
          <div className="col-md-4 feature-grid" >
            <div className="row features-hny-inner-gd" >
              <div className="col-md-3 featured_grid_left" >
                <div className="icon_left_grid">
                  <FontAwesomeIcon icon="globe-africa" />
                </div>
              </div>
              <div className="col-md-9 featured_grid_right_info pl-lg-0">
                <h4>
                  <a href="#" className="link-hny">Network with Other</a>
                </h4>
                <p>Stay tuned as we will walk with you all the way. Local music is found here. Subscribe to our emailing list so that you can receive current news and other updates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { NewsPages }


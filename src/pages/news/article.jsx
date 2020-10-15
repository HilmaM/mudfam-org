import React , {useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { newsService, alertService, accountService } from '../../_services';
import { Role } from '../../_helpers';

function ArticlePage ({ match, history }) {
  const { id } = match.params;
  const { path } = match;
  const [article, setArticle] = useState({});
  const user = accountService.userValue;

  useEffect(() => {
    newsService.getById(id).then(a => setArticle(a));
  });

  const deleteArticle = (id) => {
    setArticle(article => {
      if(article.id){
        article.isDeleting = true;
      }
    });
    newsService.delete(id).then(() => {
      article => article.id
    })
    alertService.success('Article was deleted!', { keepAfterRouteChange: true });
    history.push('..');
  };

  return (<>
    <div className="nav-scroller py-1 mb-2">
      <nav className="nav d-flex justify-content-between">
        <Link className="p-2 text-muted" to={`${path}`} >World</Link>
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
  <div className="container p-2" >
    <div className="row" >
      <h3 className="pb-4 mb-4 font-italic border-bottom">
        Twaabane Times
      </h3>
      <div className="blog-post" >
        {
          user && user.role === Role.Editor && <>
            <button className="btn btn-sm btn-danger mr-1" onClick={() => deleteArticle(article.id)} style={{ width: '60px' }} disabled={article.isDeleting} >Delete</button>
            <button className="btn btn-primary" >Edit</button>
          </>
        }
        <h2 className="blog-post-title" >{article.article_title}</h2>
        <p className="blog-post-meta" >{moment(article.created).format('MMMM Do, YYYY HH:mm:ss')}</p>
        <p dangerouslySetInnerHTML={{ __html: article.article_content }} />
      </div>
    </div>
  </div>
  </>)
};

export { ArticlePage };
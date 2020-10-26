import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import { poemService, accountService } from '../../_services';

function PoemPost ({ match }) {
  const { id } = match.params;

  const [poem, setPoem] = useState(null);
  const user = accountService.userValue;

  useEffect(() => {
    /**Poem Service */
    poemService.getById(id).then(p => setPoem(p));

  }, []);

  return (
      <Row className="reader-container px-sm-1 shadow" >
        {
          poem &&
          <div className="blog-post" >
            <nav className="navbar sticky-top this-bg shadow-sm" >
            <h1 className="blog-post-title" >
              <span dangerouslySetInnerHTML={{ __html: poem.poem_title }} />
            </h1>
            {
              user && 
              <div className="row text-center" >
                <div className="col-sm-2 col-3" >
                  <Link to={`/pages/poetry/edit/${poem.id}`} className="btn-link" >
                  <FontAwesomeIcon icon="edit" size="1x" />
                  </Link>
                  <div className="tooltip" >Edit Poem</div>
                </div>
                <div className="col-sm-2 col-3" size="1x"  >
                  <Link to="#" >
                  <FontAwesomeIcon icon="file-pdf" />
                  <span className="tooltip" >Convert to PDF and Download</span>
                  </Link>
                </div>
                <div className="col-sm-2 col-3" size="1x"  >
                  <Link to="#" >
                  <FontAwesomeIcon icon="archive" />
                  <span className="tooltip" style={{color:'red'}} >Delete Poem</span>
                  </Link>
                </div>
                <div className="col-sm-2 col-3" size="1x" ></div>
              </div>
            }
            </nav>
            <p className="blog-post-meta">{moment(poem.createdAt).format('MMMM Do, YYYY')} by <a href="htp://#">{poem.poet_name}</a></p>
            <div style={{wordWrap:'break-word',display:'inline-block'}}>
              <p dangerouslySetInnerHTML={{__html:poem.poem_content}} className="reader-page-font" id="editor" />
            </div>
          </div>
        }
        {
          !poem && <FontAwesomeIcon icon="spinner" pulse />
        }
      </Row>
  )
}
export { PoemPost };
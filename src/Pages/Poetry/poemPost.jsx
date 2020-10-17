import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { poemService } from '../../_services';

function PoemPost ({ match }) {
  const { id } = match.params;

  const [poem, setPoem] = useState(null);

  useEffect(() => {
    poemService.getById(id).then(p => setPoem(p));
  }, []);

  return (
    <Container fluid >
      <Row>
        {
          poem &&
          <div className="blog-post" >
            <h1 className="blog-post-title" >
              {poem.poem_title}
            </h1>
            <p className="blog-post-meta">{moment(poem.createdAt).format('MMMM Do, YYYY')} by <a href="htp://#">{poem.poet_name}</a></p>
            <div style={{wordWrap:'break-word',display:'inline-block'}}>
              <p dangerouslySetInnerHTML={{__html:poem.poem_content}} className="editor" />
            </div>
          </div>
        }
        {
          !poem && <FontAwesomeIcon icon="spnner" grow />
        }
      </Row>
      <footer className="jumbotron p-4 p-md-5 text-white rounded bg-secondary">
      </footer>
    </Container>
  )
}
export { PoemPost };
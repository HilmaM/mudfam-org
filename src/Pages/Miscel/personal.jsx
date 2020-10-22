import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { poemService } from '../../_services';

function Personal ({ match }) {
  const { path } = match;
  const [poems, setPoems] = useState(null);

  useEffect(() => {
    poemService.getAll().then(p => setPoems(p));
  });
  
  return (<>
    {
      poems &&
        poems.map(poem => 
          <div key={poem.id} className="col-md-4" >
            <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static reader-col">
                <strong className="d-inline-block mb-2 text-primary">{poem.category}</strong>
                <h3 dangerouslySetInnerHTML={{ __html: poem.poem_title }} />
                <div className="mb-1 text-muted">{moment(poem.createdAt).format('MMMM, Do YYYY')}</div>
                <p className="card-text mb-auto">{poem.poet_name}</p>
                <Link to={`${path}/read/${poem.id}`} className="stretched-link">Continue reading</Link>
              </div>
              <div className="col-auto d-none d-lg-block">
                <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
              </div>
            </div>
          </div>
    )}
    {
      !poems && <div className="text-center"><div className="spinner-border spinner-border-lg align-center"></div></div>
    }
    {
      poems && !poems.length && <h3 className="text-center">Nothing to show!</h3>
    }
  </>);
};

export { Personal }; 
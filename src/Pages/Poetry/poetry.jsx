import React from 'react';
import { Route, Link } from "react-router-dom";

import { CATEGORY } from '@/constants';

function PoemNav () {

  
  return(
    <div className="nav-scroller py-1 mb-2 nav-bg-col">
      <nav className="nav d-flex justify-content-between p-2">
        {Object.keys(CATEGORY).map(key=>{
          return (<div key={key.id}>
            <Route 
              render={
                () => {
                  if(key){
                    return (
                    <Link to={`/pages/poetry/${key.toLowerCase()}`} className="text-muted" key={key.id} >{key.toUpperCase()}</Link>
                    )
                  }
                }
              }
            />
          </div>)
        })}
      </nav>
    </div>)
};

export { PoemNav };

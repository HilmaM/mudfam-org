import React from 'react';
import {Link} from 'react-router-dom';

function Pages({match}){
  const {path} = match;

  return (<>
    <div>
      <h3>Welcome To MudFam</h3>
      <p>Navigate with the links below which will take you to where you want to go.</p>
      <p>
        <Link to={`${path}/poetry`} >Poetry Corner</Link>
      </p>
    </div>
  </>);

};

export { Pages };
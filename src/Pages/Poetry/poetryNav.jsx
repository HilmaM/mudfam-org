import React, {useState, useEffect} from 'react';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CATEGORY } from '@/constants';
import { accountService } from '../../_services';

function PoemNav () {

  const user = accountService.userValue;

  return(
    <div className="mb-2">
      <nav className="navbar navbar-expand" >
        <div id="logo" >
          <NavLink to={'/pages/poetry'} >
            <FontAwesomeIcon icon="newspaper" color="khaki" size="3x" />
            <div className="tooltip" >Poem</div>
          </NavLink>
          {
            user ?
            <NavLink to={'/pages/poetry/write'} >
              <FontAwesomeIcon icon="pencil-alt" color="khaki" size="3x" />
            </NavLink> : ''
          }
        </div>
        <label className="toggle" htmlFor="drop-p">Menu</label>
        <input id="drop-p" type="checkbox"/>
        <ul className="menu mr-auto" style={{ fontSize: '8px' }} >
          {Object.keys(CATEGORY).map(key=>
            <li key={key} >
              <NavLink to={`/pages/poetry/${key.toLowerCase()}`} className="nav-item nav-link">{key.toUpperCase()}</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>)
};

export { PoemNav };

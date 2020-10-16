import React, { useState, useEffect } from 'react';
import { NavLink, Route, Link } from 'react-router-dom';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';

<<<<<<< HEAD
import { Role } from '@/_helpers';
import { accountService } from '@/_services';
=======
import { Role } from '../_helpers';
import { accountService } from '../_services';
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f
import { Details } from '../profile/Details';

function NavigationBar() {
  const user = accountService.userValue;

  return (
    <>
      <div className="col-4 pt-1">
<<<<<<< HEAD
        <Link to={'/pages'} className="text-muted">Blog</Link>
      </div>
      <div className="col-4 text-center">
        <Link to={'/home'} activeclassname="active" className="blog-header-logo text-dark">
=======
        <Link to={'/pages'} className="text-muted">Poetry</Link>
      </div>
      <div className="col-4 text-center">
        <Link to={'/'} activeclassname="active" className="blog-header-logo text-dark">
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f
          MudFam
        </Link>
      </div>
      <div className="col-4 d-flex justify-content-end align-items-center">
        {
          user ?
          user.role === Role.Admin &&
          <NavLink to="/admin" className="nav-item nav-link">Admin</NavLink>
          : ''
        }
        {
          user ? 
          <Dropdown as={ButtonGroup} >
            <Button variant="info" size="sm" alignright="true" >
              <h6><Link className="nav-item nav-link text-muted" to="/profile" ><span className="text-white" >{user.first_name} {user.last_name}</span></Link></h6>
            </Button>
            <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />
            <Dropdown.Menu>
              <Dropdown.Item>Edit</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Delete Account</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={accountService.logout} >Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
<<<<<<< HEAD
          : <Link to={'/account/login'} className="btn btn-sm text-muted" >Login</Link>
=======
          : <Link to={'/login'} className="btn btn-sm text-muted" >Login</Link>
>>>>>>> 6a2ee12f94e74cf6b2c5ea1a8edeb44466525e0f
        }
      </div>
    </>
  );
}

export { NavigationBar };
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Overlay, Popover, Row, Col, Dropdown, DropdownButton, FormControl, ButtonGroup, Button } from 'react-bootstrap';

import { Role } from '@/_helpers';
import { accountService } from '@/_services';

function Nav() {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const user = accountService.userValue;
  // The forwardRef is important!!
  // Dropdown needs access to the DOM node in order to position the Menu
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}  
    </a>
  ));

  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <li>
            <NavLink to='/#' className="nav-item nav-link text-dark" >Governance</NavLink>
          </li>
          <li>
            <NavLink to='/#' className="nav-item nav-link text-dark" >Education</NavLink>
          </li>
          <li>
            <NavLink to='/#' className="nav-item nav-link text-dark" >Livelihood</NavLink>
          </li>
        </div>
      );
    },
  );


  return (<><nav className="navbar navbar-expand">
    <div id="logo" >
      <NavLink to={'/home'} className="navbar-brand px-0 mx-0" >
        <img src="/src/tools/images/basi_logo.jpg" alt="Logo"/>
      </NavLink>
    </div>
    <label className="toggle" htmlFor="drop">Menu</label>
    <input id="drop" type="checkbox"/>
    <ul className="menu mr-auto">
      <li>
        <NavLink to={'/home/management'} >About Us</NavLink>
      </li>
      <li>
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            Programmes & Projects
          </Dropdown.Toggle>
          <Dropdown.Menu as={CustomMenu}>
            <Dropdown.Item eventKey="1">Red</Dropdown.Item>
            <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
            <Dropdown.Item eventKey="3" active>
              Orange
            </Dropdown.Item>
            <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
      <li>
        <NavLink to={'/home/news'} className="nav-item nav-link" >Publications</NavLink>
      </li>
      <li>
        <NavLink to={`/home/sponsors`} className="nav-item nav-link" >Sponsors & Partners</NavLink>
      </li>
      <li>
        <NavLink to={`/home/contactus`} className="nav-item nav-link" >Contact Us</NavLink>
      </li>
      {
        user && user.role === Role.Admin &&
        <li>
          <NavLink to="/admin" className="nav-item nav-link">
          <span>Admin</span>
        </NavLink>
      </li>
      }
      {
        user && user ?
          <Dropdown as={ButtonGroup} >
            <Button variant="info" size="sm" alignright="true" >
              <h6><Link className="nav-item nav-link text-muted" to="/profile" ><span className="text-white" >{user.firstName} {user.lastName}</span></Link></h6>
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
          : <Link to={'/login'} className="btn btn-sm text-muted" >Login</Link>
      }
    </ul>
  </nav>
  <Route path="/admin" component={AdminNav} />
  </>);
}

function AdminNav({ match }) {
  const { path } = match;

  return (
    <nav className="admin-nav navbar navbar-expand navbar-light">
      <div className="navbar-nav">
        <ul>
          <li>
            <NavLink to={`${path}/users`} className="nav-item nav-link">Users</NavLink>
          </li>
          <li>
            <NavLink to={`${path}/miscel`} className="nav-item nav-link" >Manage Items</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export { Nav }; 
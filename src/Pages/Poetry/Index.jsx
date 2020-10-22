import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Modal } from 'react-bootstrap';
import { Switch, Route, Link } from 'react-router-dom';

import { accountService } from '../../_services';
import { SideBar } from '../Miscel/sideBar';
import { Role } from '../../_helpers';
import { SubscribeMe } from '../../_miscel';
import { PoemList } from './poemList';
import { PoemNav } from './poetryNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PoemWriter } from './makePoem';
import { PoemPost } from './poemPost';
import { Personal } from '../Miscel/personal';
import { Africa } from '../Miscel/africa';

function Poetry({ match }) {
  const { path } = match;
  const user = accountService.userValue

  return(<>
    <PoemNav />
    <Container fluid>
      <Row>
        <Col md={8} className="blog-main">
          {
            user ?
            user.role === Role.Admin && 
              <nav className="bg-primary nav d-flex justify-content-between p-2" >
                <div id="logo">Admin Only</div>
                <label className="toggle" htmlFor="drop1">Menu</label>
                <input id="drop1" type="checkbox"/>
                <ul className="menu mr-auto" >
                  <li>
                    <Link to={`#`} className="nav-link nav-item btn-link" >New Poem</Link>
                  </li>
                  <li>
                    <Link to="#" className="nav-link nav-item" >Edit</Link>
                  </li>
                  <li>
                    <Link to="#" className="nav-link nav-item" >Remove</Link>
                  </li>
                  <li>
                    <Link to="#" className="nav-link nav-item" >Search</Link>
                  </li>
                  <li>
                    <Link to="#" className="nav-link nav-item" >Tools</Link>
                  </li>
                </ul>
              </nav>
            : ''
          }
          <div className="row py-md-4" >
            <Switch>
              <Route exact path={path} component={PoemList} />
              <Route path={`${path}/write`} component={PoemWriter} />
              <Route path={`${path}/read/:id`} component={PoemPost} />
              <Route path={`${path}/edit/:id`} component={PoemWriter} />
              <Route path={`${path}/personal`} component={Personal} />
              <Route path={`${path}/africa`} component={Africa} />
            </Switch>
          </div>
        </Col>
        <Col md={4} role="aside" className="blog-sidebar">
          <Form>
            <InputGroup>
              <Form.Control 
                className="search"
                placeholder="Search..."
              />
              <InputGroup.Append>
                  <Button className="btn btn-primary" ><FontAwesomeIcon icon="search" /></Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
          <SideBar />
          <SubscribeMe />
        </Col>
      </Row>
    </Container>
  </>);
};

export { Poetry };
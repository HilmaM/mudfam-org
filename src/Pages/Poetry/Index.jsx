import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Media } from 'react-bootstrap';
import { Switch, Route, Link } from 'react-router-dom';

import { poemService, accountService } from '../../_services';
import { SideBar } from '../Miscel/sideBar';
import { Role } from '../../_helpers';
import { CommentSection, SubscribeMe, CommentList } from '../../_miscel';
import { commentService } from '../../_services';
import { PoemList } from './poemList';
import { PoemNav } from './poetry';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PoemWriter } from './makePoem';
import { PoemPost } from './poemPost';

function Poetry({ match }) {
  const { path } = match;
  const user = accountService.userValue;

  const [poems, setPoems] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    poemService.getAll().then(x => setPoems(x));
    commentService.getAll().then(c => setComments(c));
  }, []);
  return(<>
    <PoemNav />
    <Container fluid>
      <Row>
        <Col md={8} className="blog-main">
            <nav className="bg-dark nav d-flex justify-content-between p-2" >
              <Link to={`${path}/write`} className="nav-link nav-item" >New Poem</Link>
              <Link to="#" className="nav-link nav-item" >Edit</Link>
              <Link to="#" className="nav-link nav-item" >Remove</Link>
              <Link to="#" className="nav-link nav-item" >Search</Link>
              <Link to="#" className="nav-link nav-item" >Tools</Link>
            </nav>
          {
            user ?
            user.role === Role.Admin && 
            <nav className="bg-dark nav d-flex justify-content-between p-2" >
              <Link to={`${path}/write`} className="nav-link nav-item" >New Poem</Link>
              <Link to="#" className="nav-link nav-item" >Edit</Link>
              <Link to="#" className="nav-link nav-item" >Remove</Link>
              <Link to="#" className="nav-link nav-item" >Search</Link>
              <Link to="#" className="nav-link nav-item" >Tools</Link>
            </nav>
            : ''
          }
          <div className="row" >
            <Switch>
              <Route exact path={path} component={PoemList} />
              <Route path={`${path}/read/:id`} component={PoemPost} />
              <Route path={`${path}/write`} component={PoemWriter} />
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
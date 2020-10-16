import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { poemService, accountService } from '../../_services';
import { SideBar } from '../Miscel/sideBar';
import { Role } from '../../_helpers';
import { CommentSection, SubscribeMe, CommentList } from '../../_miscel';
import { commentService } from '../../_services';
import { PoemList } from './poemList';

function PoemContainer ({ match }) {
  const { path } = match;
  const user = accountService.userValue;

  const [poems, setPoems] = useState(null);
  const [pageOfPoems, setPageOfPoems] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    poemService.getAll().then(x => setPoems(x));
    commentService.getAll().then(c => setComments(c));
  }, []);

  function deletePoem(id) {
    setPoems(poems.map(x => {
      if (x.id === id) { x.isDeleting = true; }
      return x;
    }));
    poemService.delete(id).then(() => {
      setPoems(poems => poems.filter(x => x.id !== id));
    });
  }

  const onChangePage = ({pageOfPoems}) => {
    setPageOfPoems(pageOfPoems)
  }
 
  return (<div>
    <Container fluid>
      <Row>
        <Col md={8} className="blog-main">
          {
            user ?
            user.role === Role.Admin && 
            <nav className="bg-dark nav d-flex justify-content-between p-2" >
              <Link to={`${path}/write`} className="nav-link nav-item" >New Poem</Link>
              <Link className="nav-link nav-item" >Edit</Link>
              <Link className="nav-link nav-item" >Remove</Link>
              <Link className="nav-link nav-item" >Search</Link>
              <Link className="nav-link nav-item" >Tools</Link>
            </nav>
            : ''
          }
          <div className="row" >
            <PoemList />
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
                  <Button className="btn btn-primary" ><span className="fa fa-search" ></span></Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
          <SideBar />
          <SubscribeMe />
        </Col>
      </Row>
    </Container>
  </div>)
}

export { PoemContainer };

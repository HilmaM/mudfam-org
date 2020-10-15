import React, {useState, useEffect} from 'react';
import { contactusService } from '../../_services';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

function ContactusMessages(){
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    contactusService.getAll().then(x => setMessages(x));
  }, []);

  function deleteMessage(id) {
      setMessages(messages.map(x => {
          if (x.id === id) { x.isDeleting = true; }
          return x;
      }));
      contactusService.delete(id).then(() => {
          setMessages(messages => messages.filter(x => x.id !== id));
      });
  }

  return (<div className="py-md-2" >
    <h3>Inbox</h3>
    <Tab.Container>
        {<>
          <Row>
            <Col sm={2} className="bg-primary" >
              <h4 className="text-white" >From</h4>
            </Col>
            <Col sm={1} className="bg-primary" >
              <h4 className="text-white" >Action</h4>
            </Col>
            <Col sm={9} className="bg-primary" >
              <h4 className="text-white" >Contents</h4>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              {
                messages && messages.map(msg => <div className="row" key={msg.id} >
                  <Nav variant="" className="flex-column col-sm-10" >
                    <Nav.Item>
                      <Nav.Link to='#' eventKey={msg.id}>
                        {msg.names} <br/>
                        <small>Sent On: {moment(msg.created).format('DD/MM/YYYY | HH:mm:ss')}</small>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav> 
                  <Col sm={2}>
                    <Row>
                      <Col sm={6} >
                        <FontAwesomeIcon icon="archive" onClick={() => deleteMessage(msg.id)} size="xs" />
                      </Col>
                      <Col sm={6} >
                        <FontAwesomeIcon icon="reply" size="xs" />
                      </Col>
                    </Row>
                  </Col>
                  </div>)
              }
            </Col>
            <Col sm={9}>
              {
                messages && messages.map(msg =>
                <Tab.Content key={msg.id}>
                  <Tab.Pane eventKey={msg.id}>
                    <p>
                      {msg.message}
                    </p>
                  </Tab.Pane>
                </Tab.Content>)
              }
            </Col>
          </Row>
        </>}
        {
          !messages && <span className="spinner-border spinner-border-lg align-center"></span>
        }
    </Tab.Container>
  </div>);
};

export { ContactusMessages };
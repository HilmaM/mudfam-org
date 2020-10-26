import  React from 'react';
import { Container, Row, Col, Tab, Nav, Figure, Image, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import FigureImage from 'react-bootstrap/esm/FigureImage';
import FigureCaption from 'react-bootstrap/esm/FigureCaption';

function Author() {
  return (<section className="p-5" >
    <Row>
          <Tab.Container defaultActiveKey="details">
            <Col sm={2} >
              <Figure>
                <FigureImage
                  src="src/fonts/images/mapenzi.png"
                  width="150px"
                  alt="Author"
                />
              </Figure>
              <FigureCaption>Mapenzi Mudimba</FigureCaption>
            </Col>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="details">Details</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="social">Social</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="hobbies">Hobbies</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="projects">Projects</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={7}>
              <Tab.Content>
                <p className="style-font" >Mapenzi Mudimba</p>
                <Tab.Pane eventKey="details">
                  <Row>
                    <Col xs={1} >
                      <p>
                        <FontAwesomeIcon icon="map-marker" size="1x" color="orange" />
                      </p>
                      <p>
                        <FontAwesomeIcon icon="envelope-open" size="1x" color="skyblue" />
                      </p>
                      <p>
                        <FontAwesomeIcon icon="mobile-alt" size="1x" color="grey" />
                      </p>
                    </Col>
                    <Col xs={11} >
                      <p>
                        C/O Midlands State University, P Bag 9055, Gweru
                      </p>
                      <p>
                        hazelman@live.com
                      </p>
                      <p>
                        0777151673
                      </p>
                    </Col>  
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="social">
                  <Row>
                    <Col xs={1} >
                      <Link to={'https://github.com/HilmaM'} >
                        <FontAwesomeIcon icon={['fab', 'github']}  size="2x" color="grey" />
                        <div className="tooltip" >Github</div>
                      </Link>
                    </Col>
                    <Col xs={1} >
                      <Link to={'#'} >
                        <FontAwesomeIcon icon={['fab', 'linkedin']}  size="2x" color="skyblue" />
                      </Link>
                    </Col>
                    <Col xs={1} >
                      <Link to={'#'} >
                        <FontAwesomeIcon icon={['fab', 'facebook-f']} size="2x" className="this-col" />
                      </Link>
                    </Col>
                    <Col xs={1} >
                      <Link to={'#'} >
                        <FontAwesomeIcon icon={['fab', 'youtube']}  size="2x" color="red" />
                      </Link>
                    </Col>
                    <Col xs={1} >
                      <Link to={'#'} >
                        <FontAwesomeIcon icon={['fab', 'twitter']} size="2x" color="skyblue" />
                      </Link>
                    </Col>
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="hobbies">
                  <Row>
                    <Col xs={4} className="card music-card-col" >
                      <h4>Music <FontAwesomeIcon icon="music" size="1x" color="grey" /> <FontAwesomeIcon icon="music" size="1x" color="grey" /> <FontAwesomeIcon icon="music" size="1x" color="grey" /></h4>
                      <p>Classical
                        <br/> Soft Rock <br/> Country <br/>Gospel <br/>RnB <br/>
                      </p>
                    </Col>
                    <Col xs={4} className="card sports-card-col" >
                      <h4><FontAwesomeIcon icon="football-ball" size="1x" color="grey" /> Sports <FontAwesomeIcon icon="volleyball-ball" size="1x" color="pink" /></h4>
                      <p>
                        Soccer (Manchester United) <br/> Volleyball <br/>Cricket <br/> F1 Racing <br/>
                      </p>
                    </Col>
                    <Col xs={4} className="card family-card-col" >
                      <h4>Family Time <FontAwesomeIcon icon="user-friends" size="1x" color="green" /></h4>
                      <p>
                        Computer games<br/> Camping<br/>
                      </p>
                    </Col>
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="projects">
                  <Table striped bordered hover variant="dark" >
                    <thead>
                      <tr>
                        <th>Project</th>
                        <th>Description</th>
                        <th>Link to project</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>MudFam</td>
                        <td>MudFam website. Made for a family enterprise <br/>
                          <Image src="src/fonts/images/mudfam-screen.PNG" alt="mudfam-site-eg" width="220px" />
                        </td>
                        <td>www.mudfam.org</td>
                      </tr>
                      <tr>
                        <td>Basilwizi</td>
                        <td>Basilwizi website. Created the site for an NGO in Binga</td>
                        <td>www.basilwizi.org</td>
                      </tr>
                      <tr>
                        <td>Flight Aware</td>
                        <td>Monitoring flights within and around my area.</td>
                        <td>www.flightaware.com</td>
                      </tr>
                    </tbody>
                  </Table>
                  <p className="style-font" >Hilma</p>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Tab.Container>

    </Row>
  </section>)
};

export { Author };
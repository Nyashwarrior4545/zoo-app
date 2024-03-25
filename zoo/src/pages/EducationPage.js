import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Layout from '../componets/Layout';
import giraffeImage from '../images_animals/giraffe.jpeg';
import parrotImage from '../images_animals/parrot.webp';
import redPandaImage from '../images_animals/red panda.jpg';
import './FacilitiesPage.css'


const Facilities = () => {
  return (
    <Layout>
      <Container>
        <h1>Education Vist</h1>
        <Row>
          <Col xs={6} md={3}>
            <Card className="image-card">
              <Card.Img variant="top" src={giraffeImage} alt="Giraffe" />
              <Card.Body>
                <Card.Text>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={3}>
            <Card className="image-card">
              <Card.Img variant="top" src={parrotImage} alt="Parrot" />
              <Card.Body>
                <Card.Text>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet  </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={3}>
            <Card className="image-card">
              <Card.Img variant="top" src={redPandaImage} alt="Red Panda" />
              <Card.Body>
                <Card.Text>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={3}>
            <Card className="image-card">
              <Card.Img variant="top" src={giraffeImage} alt="Giraffe" />
              <Card.Body>
                <Card.Text>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={3}>
            <Card className="image-card">
              <Card.Img variant="top" src={giraffeImage} alt="Giraffe" />
              <Card.Body>
                <Card.Text>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={3}>
            <Card className="image-card">
              <Card.Img variant="top" src={parrotImage} alt="Parrot" />
              <Card.Body>
                <Card.Text>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={3}>
            <Card className="image-card">
              <Card.Img variant="top" src={redPandaImage} alt="Red Panda" />
              <Card.Body>
                <Card.Text>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={3}>
            <Card className="image-card">
              <Card.Img variant="top" src={giraffeImage} alt="Giraffe" />
              <Card.Body>
                <Card.Text>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};


export default Facilities;

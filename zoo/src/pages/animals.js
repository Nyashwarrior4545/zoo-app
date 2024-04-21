import React from 'react';
import './Animals.css'; // Import Animals-specific CSS file
import giraffeImage from '../images_animals/giraffe.jpeg';
import parrotImage from '../images_animals/parrot.webp';
import redPandaImage from '../images_animals/red panda.jpg';
import Layout from '../componets/Layout';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext'; // Import useAuthContext hook
import { Button } from 'react-bootstrap'; // Import Button component from react-bootstrap


const Animals = () => {
  const { user } = useAuthContext(); // Retrieve user information from context

  return (
    <Layout>
      <div className="animals-page">
        {/* First Section: Massive Image with Information */}
        <section className="massive-image-section">
          <div className="image-overlay">
            {/* Render Get Discount button only if user is not logged in */}
            {!user && (
              <Button variant="primary" className="get-discount-button">
                <Link to="/login" className="get-discount-link">
                  get discount
                </Link>
              </Button>
            )}
            <h1>Welcome to Our Zoo</h1>
            <p>Learn about our diverse range of animals and their habitats</p>
          </div>
        </section>

        {/* Second Section: Fun Facts */}
        <section className="fun-facts-section">
          <h2>Fun Facts</h2>
          <div className="fun-facts">
            <div className="fun-fact">
              <h3>Giraffes</h3>
              <p>"Giraffes have long necks that can reach<br/>
              up to 6 feet in length!"</p>
            </div>
            <div className="fun-fact">
              <h3>Parrots</h3>
              <p>"Parrots are known for their ability to<br/>
              mimic human speech
              and other sounds."</p>
            </div>
            <div className="fun-fact">
              <h3>Red Pandas</h3>
              <p>"Red pandas are not closely related to giant<br/>
              pandas but share a similar name."</p>
            </div>
          </div>
        </section>

        {/* Third Section: Events */}
        <section className="events-section">
          <h2>Events</h2>
          <div className="events">
            <div className="event">
              <Link to="/home">
                <img src={giraffeImage} alt="Event 1" />
              </Link>
              <p>Event 1 Name</p>
            </div>
            <div className="event">
              <Link to="/home">
                <img src={parrotImage} alt="Event 2" />
              </Link>
              <p>Event 2 Name</p>
            </div>
            <div className="event">
              <Link to="/home">
                <img src={redPandaImage} alt="Event 3" />
              </Link>
              <p>Event 3 Name</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Animals;
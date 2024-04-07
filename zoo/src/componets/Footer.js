import React from 'react';
import './Footer.css'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>&copy; 2024 Riget Zoo Adventures. All rights reserved.</p>
          </div>
          <div className="col-md-6">
            <ul className="list-unstyled list-inline text-md-right">
              <li className="list-inline-item">
                <Link to= "/terms"> Terms and Condition</Link>
              </li>
              <li className="list-inline-item">
                <Link to= "/policy"> Privacy Policy</Link>
              </li>
              <li className="list-inline-item">
                <Link to= "/access"> Accessbility</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

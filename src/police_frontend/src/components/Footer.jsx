import React from 'react';
import '../Footer.css';
import logo from '../../public/logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagramSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <>
      <div className='footer'>
        <div className="top">
          <div>
            <img src={logo} alt="logo" />
          </div>
          <div>
            <p>The first step toward change is awareness. Speak out against injustice.</p>
          </div>
          <div className='ic'>
            <a href="/"><FontAwesomeIcon icon={faFacebookSquare} /></a>
            <a href="/"><FontAwesomeIcon icon={faInstagramSquare} /></a>
            <a href="/"><FontAwesomeIcon icon={faTwitterSquare} /></a>
          </div>
        </div>

        <div className="bottom">
          <div>
            <h4>Contact us</h4>
            <a href="#">Mail</a>
            <a href="#">Call</a>
            <a href="#">whatsapp</a>
          </div>
          <div>
            <h4>Services</h4>
            <a href="#">Raise New Complaint</a>
            <a href="#">Retrieve with Actions and TimeStamp </a>
          </div>
          <div>
            <h4>Others</h4>
            <a href="#">Terms and Conditions</a>
            <a href="#">Privacy & Policy</a>
            <a href="#">License</a>
          </div>
        </div>
        <div className='c'>
        <span>&copy; All Rights Reserved</span>
      </div>
      </div>
      
    </>
  );
}

export default Footer;

import React from 'react';
import logo from '../../public/logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagramSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

const Foter = () => {
  return (
    <div className="container-fluid" style={{ padding: '20px', height: '600px' }}>
      <div className='footer1' style={{ backgroundColor: '#333', color: '#fff', padding: '20px 0', height: '100%' }}>
        <div className="top">
          <div className='container-fluid text-white text-center'>
            <img className='logob' src={logo} alt="logo" style={{ maxWidth: '200px', marginBottom: '20px' }} />
            <p style={{ fontSize: '16px' }}>In our Police Complaint Management system, every grievance is a call for justice, met with diligence and dedication, shaping a safer tomorrow.</p>
          </div>
        </div>
        <div className='social-icons  d-flex justify-content-end me-5'>
          <a href="/" style={{ color: 'skyblue', marginLeft: '10px' }}><FontAwesomeIcon icon={faFacebookSquare} /></a>
          <a href="/" style={{ color: 'skyblue', marginLeft: '10px' }}><FontAwesomeIcon icon={faInstagramSquare} /></a>
          <a href="/" style={{ color: 'skyblue', marginLeft: '10px' }}><FontAwesomeIcon icon={faTwitterSquare} /></a>
        </div>

        <div className="bottom container" style={{ height: 'calc(100% - 150px)', overflowY: 'auto' }}>
          <div className="row">
            <div className="col">
              <h4 style={{ marginBottom: '15px' }}>Contact us</h4>
              <a href="#" className="d-block" style={{ color: '#fff', textDecoration: 'none', marginBottom: '10px' }}>Mail</a>
              <a href="#" className="d-block" style={{ color: '#fff', textDecoration: 'none', marginBottom: '10px' }}>Call</a>
              <a href="#" className="d-block" style={{ color: '#fff', textDecoration: 'none', marginBottom: '10px' }}>WhatsApp</a>
            </div>
            <div className="col">
              <h4 style={{ marginBottom: '15px' }}>Services</h4>
              <a href="#" className="d-block" style={{ color: '#fff', textDecoration: 'none', marginBottom: '10px' }}>Donation</a>
              <a href="#" className="d-block" style={{ color: '#fff', textDecoration: 'none', marginBottom: '10px' }}>Transplantation</a>
            </div>
            <div className="col">
              <h4 style={{ marginBottom: '15px' }}>Others</h4>
              <a href="#" className="d-block" style={{ color: '#fff', textDecoration: 'none', marginBottom: '10px' }}>Terms and Conditions</a>
              <a href="#" className="d-block" style={{ color: '#fff', textDecoration: 'none', marginBottom: '10px' }}>Privacy & Policy</a>
              <a href="#" className="d-block" style={{ color: '#fff', textDecoration: 'none', marginBottom: '10px' }}>License</a>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p className="copy" style={{ marginTop: '20px', textAlign: 'center', color: '#fff' }}>&copy; All Rights Reserved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Foter;

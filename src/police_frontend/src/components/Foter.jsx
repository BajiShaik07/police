import React from 'react';
import logo from '../../public/logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagramSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Footer.css'
const Foter = () => {
  return (
    <div className="container-fluid" style={{ padding: '20px', minHeight: '450px' }}>
      <div className='footer1' style={{ backgroundColor: '#333', color: '#fff', padding: '20px 0', minHeight: '100%' }}>
        <div className="top">
          <div className='container-fluid text-white text-center'>
            <img src={logo} alt="logo" className="logob" style={{ marginBottom: '20px' }} />
            <p style={{ fontSize: '16px' }}>In our Police Complaint Management system, every grievance is a call for justice, met with diligence and dedication, shaping a safer tomorrow.</p>
          </div>
        </div>
        <div className='social-icons d-flex justify-content-end'>
          <a href="/" style={{ color: 'skyblue', marginLeft: '20px' }}><FontAwesomeIcon icon={faFacebookSquare} /></a>
          <a href="/" style={{ color: 'skyblue', marginLeft: '20px' }}><FontAwesomeIcon icon={faInstagramSquare} /></a>
          <a href="/" style={{ color: 'skyblue', marginLeft: '20px', marginRight:'30px' }}><FontAwesomeIcon icon={faTwitterSquare} /></a>
        </div>

        <div className="bottom container" style={{ overflowY: 'auto' }}>
          <div className="row">
            <div className="col-md-4">
              <h4>Contact us</h4>
              <a href="#" className="d-block" style={{ color: '#fff', textDecoration: 'none', marginBottom: '10px' }}>Mail</a>
              <a href="#" className="d-block" style={{ color: '#fff', textDecoration: 'none', marginBottom: '10px' }}>Call</a>
              <a href="#" className="d-block" style={{ color: '#fff', textDecoration: 'none', marginBottom: '10px' }}>WhatsApp</a>
            </div>
            <div className="col-md-4">
              <h4>Services</h4>
              <a href="#" className="d-block" style={{ color: '#fff', textDecoration: 'none', marginBottom: '10px' }}>Donation</a>
              <a href="#" className="d-block" style={{ color: '#fff', textDecoration: 'none', marginBottom: '10px' }}>Transplantation</a>
            </div>
            <div className="col-md-4">
              <h4>Others</h4>
              <a href="#" className="d-block" style={{ color: '#fff', textDecoration: 'none', marginBottom: '10px' }}>Terms and Conditions</a>
              <a href="#" className="d-block" style={{ color: '#fff', textDecoration: 'none', marginBottom: '10px' }}>Privacy & Policy</a>
              <a href="#" className="d-block" style={{ color: '#fff', textDecoration: 'none', marginBottom: '10px' }}>License</a>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p className="copy" style={{ marginTop: '20px', textAlign: 'center' }}>&copy; All Rights Reserved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Foter;

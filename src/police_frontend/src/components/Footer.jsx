import React from 'react'
import './Footer.css'
// import logo from '../../public/svglogo.svg';

const Footer = () => {
  return (
    <div className='footer'>
        <div className="top">
            <div>
                <img src={logo} alt="logo" />
            </div>
            <div>
            <p>Organ donation is a gift that can change the world.</p>
            </div>
            <div>
                <a href="/"><i class="fa-brands fa-facebook-square"></i></a>
                <a href="/"><i class="fa-brands fa-instagram-square"></i></a>
                <a href="/"><i class="fa-brands fa-twitter-square"></i></a>
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
          <h4>Servicers</h4>
          <a href="#">Donation</a>
          <a href="#">Transplantation</a>
        </div>
        <div>
          <h4>Others</h4>
          <a href="#">Term and Conditions</a>
          <a href="#">Privacy & Policy</a>
          <a href="#">License</a>
        </div>
        <div>
          <span>&copy;All Rights Reserved</span>
        </div>
      </div>
    </div>
  )
}

export default Footer
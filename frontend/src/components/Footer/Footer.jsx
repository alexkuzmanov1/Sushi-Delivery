import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets.js'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>&copy; 2024 Friends. All rights reserved. | Crafted with love and the freshest ingredients.</p>
            <div className="footer-social-icons">
            <a href="https://www.facebook.com/yourfrirndstoday" target="_blank" rel="noopener noreferrer">
                    <img src={assets.facebook_icon} alt="Facebook" />
                </a>                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>0882744019</li>
                <li>alexkuzmnov5@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024</p>
    </div>
  )
}

export default Footer

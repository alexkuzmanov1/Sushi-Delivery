import React from 'react'
import './Header.css'
import { assets } from '../../assets/assets'

const Header = () => {
  return (
    <div className='header'>
      <img src={assets.header_img} alt="" />
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>Craving sushi? Experience the art of Japanese cuisine with our fresh, handcrafted sushi, delivered straight to you. From classic rolls to chef specials, our menu is designed to satisfy every palate. Order now and enjoy the perfect blend of tradition and flavor in the comfort of your home. Fast, fresh, and delicious – that’s our promise.</p>        <button>View Menu</button>
        
      </div>
    </div>
  )
}

export default Header
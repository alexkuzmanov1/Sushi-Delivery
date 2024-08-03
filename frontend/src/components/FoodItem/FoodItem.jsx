import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import DetailsPopup from '../DetailsPopup/DetailsPopup'

const FoodItem = ({id, name, price, description, image}) => {
  
    const {cartItems, addToCart, removeFromCart, url} = useContext(StoreContext);

        const [showPopup, setShowPopup] = useState(false);

        const handleItemClick = () => {
        setShowPopup(true);
    } 

        const handleClosePopup = () => {
        setShowPopup(false);
    }
  
  return (
    <div className='food-item' onClick={handleItemClick}>
        <div className="food-item-img-container">
            <img className='food-item-image' src={url + '/images/' + image} alt='' />
            {!cartItems[id]
                ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} />
                :<div className='food-item-counter'>
                    <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red}/>
                    <p>{cartItems[id]}</p>
                    <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
                  </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">${price}</p>
        </div>
        {showPopup && <DetailsPopup id={id} name={name} price={price} description={description} image={image} onClose={handleClosePopup} />}
    </div>
  )
}

export default FoodItem

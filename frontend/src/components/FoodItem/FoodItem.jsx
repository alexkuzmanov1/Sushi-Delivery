import React, { useContext, useEffect, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import DetailsPopup from '../DetailsPopup/DetailsPopup'
import Rating from '@mui/material/Rating';

const FoodItem = ({id, name, price, description, image}) => {
  
    const {cartItems, addToCart, removeFromCart, url, fetchAverageRating} = useContext(StoreContext);

    const [showPopup, setShowPopup] = useState(false);
    const [rating, setRating] = useState(0);

    useEffect(() => {
      const fetchRating = async () => {
      const averageRating = await fetchAverageRating(id);
      setRating(averageRating);
      }

      fetchRating();
    }, [id, fetchAverageRating]);

    const handleItemClick = () => {
      setShowPopup(true);
      console.log("Item clicked, showPopup set to true");
    }
  
    const handleClosePopup = () => {
      console.log("Popup closed");
      setShowPopup(false);
    }
  
    const handleAddToCart = (event) => {
      event.stopPropagation();
      addToCart(id);
    }
  
    const handleRemoveFromCart = (event) => {
      event.stopPropagation();
      removeFromCart(id);
    }
  
  return (
    <div className='food-item' onClick={handleItemClick}>
        <div className="food-item-img-container">
            <img className='food-item-image' src={url + '/images/' + image} alt='' />
            {!cartItems[id]
                ?<img className='add' onClick={handleAddToCart} src={assets.add_icon_white} />
                :<div className='food-item-counter'>
                    <img onClick={handleRemoveFromCart} src={assets.remove_icon_red}/>
                    <p>{cartItems[id]}</p>
                    <img onClick={handleAddToCart} src={assets.add_icon_green} alt="" />
                  </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <Rating 
                  name="simple-controlled"
                  precision={0.5}
                  value={rating}
                  readOnly
                />            
        </div>
            <p className="food-item-price">${price}</p>
        </div>
        {showPopup && <DetailsPopup id={id} name={name} price={price} description={description} image={image} onClose={handleClosePopup} isVisible={showPopup} />}
    </div>
  )
}

export default FoodItem

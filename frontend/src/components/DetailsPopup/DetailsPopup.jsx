import React, { useContext, useEffect, useState } from 'react'
import './DetailsPopup.css'
import { useRef } from 'react';
import { StoreContext } from '../../context/StoreContext';
import Rating from '@mui/material/Rating';

const DetailsPopup = ({ id, name, price, description, image, onClose , isVisible}) => {
  const {url, fetchAverageRating, handleRatingChange} = useContext(StoreContext);
  const containerRef = useRef(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const fetchRating = async () => {
      const averageRating = await fetchAverageRating(id);
      setRating(averageRating);
    };

    fetchRating();
  }, [id, fetchAverageRating]);

  const handleRatingChangeWrapper = async (event, newValue) => {
    
    setRating(newValue);
    await handleRatingChange(id, newValue);
  }

  if (!isVisible) return null;


  return (
    <div className="details-popup-overlay">
      <div className="details-popup-container" ref={containerRef}>
        <img className="details-popup-image" src={url + '/images/' + image} alt={name} />
        <h2 className="details-popup-name">{name}</h2>
        <p className="details-popup-description">{description}</p>
        <Rating 
        name="simple-controlled"
        precision={0.5}
         value={rating}
         onChange={handleRatingChangeWrapper}
        />
        <p className="details-popup-price">Price: ${price}</p>
      </div>
    </div>
  )
}

export default DetailsPopup
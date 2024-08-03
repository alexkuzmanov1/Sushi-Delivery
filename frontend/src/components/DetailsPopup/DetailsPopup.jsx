import React, { useState } from 'react'
import './DetailsPopup.css'

const DetailsPopup = ({ id, name, price, description, image, onClose }) => {
  if (!id) return null;
  const [isVisible, setIsVisible] = useState(!!id);

  const handleOverlayClick = (e) => {
    if (e.target.className === 'details-popup-overlay') {
        setIsVisible(false);
        onClose();
    }
  };

  if (!isVisible) return null;


  return (
    <div className="details-popup-overlay" onClick={handleOverlayClick}>
      <div className="details-popup-container">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{name}</h2>
        <p>{description}</p>
        <p>Price: {price}</p>
        {/* Add more item details as needed */}
      </div>
    </div>
  )
}

export default DetailsPopup
import React from 'react'
import './DetailsPopup.css'

const DetailsPopup = ({ id, name, price, description, image, onClose , isVisible}) => {

  const handleOverlayClick = (e) => {
        onClose();
  };

  const handleContainerClick = (e) => {
    e.stopPropagation();
  };

  const handleCloseClick = () => {
    onClose();
  };

  if (!isVisible) return null;


  return (
    <div className="details-popup-overlay" onClick={handleOverlayClick}>
      <div className="details-popup-container" onClick={handleContainerClick}>
        <button className="close-button" onClick={handleCloseClick}>X</button>
        <h2>{name}</h2>
        <p>{description}</p>
        <p>Price: {price}</p>
        {/* Add more item details as needed */}
      </div>
    </div>
  )
}

export default DetailsPopup
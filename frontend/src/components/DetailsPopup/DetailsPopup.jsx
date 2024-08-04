import React, { useContext, useEffect } from 'react'
import './DetailsPopup.css'
import { useRef } from 'react';
import { StoreContext } from '../../context/StoreContext';

const DetailsPopup = ({ id, name, price, description, image, onClose , isVisible}) => {
  const {url} = useContext(StoreContext);
  const containerRef = useRef(null);

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

  if (!isVisible) return null;


  return (
    <div className="details-popup-overlay">
      <div className="details-popup-container" ref={containerRef}>
        <img className="details-popup-image" src={url + '/images/' + image} alt={name} />
        <h2 className="details-popup-name">{name}</h2>
        <p className="details-popup-description">{description}</p>
        <p className="details-popup-price">Price: ${price}</p>
      </div>
    </div>
  )
}

export default DetailsPopup
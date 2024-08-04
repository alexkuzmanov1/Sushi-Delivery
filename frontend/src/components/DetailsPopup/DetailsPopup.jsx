import React, { useEffect } from 'react'
import './DetailsPopup.css'
import { useRef } from 'react';

const DetailsPopup = ({ id, name, price, description, image, onClose , isVisible}) => {

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
        <h2>{name}</h2>
        <p>{description}</p>
        <p>Price: {price}</p>
        {/* Add more item details as needed */}
      </div>
    </div>
  )
}

export default DetailsPopup
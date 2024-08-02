// frontend/src/components/Loading/Loading.jsx
import React from 'react';
import './Loading.css';

const Loading = () => {
  const skeletonItems = Array(6).fill(0); // Adjust the number of skeleton items as needed

  return (
    <div className="food-display-list">
      {skeletonItems.map((_, index) => (
        <div key={index} className="loading-food-item">
          <div className="loading-food-item-image"></div>
          <div className="loading-food-item-info">
            <div className="loading-food-item-name-rating"></div>
            <div className="loading-food-item-desc"></div>
            <div className="loading-food-item-price"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
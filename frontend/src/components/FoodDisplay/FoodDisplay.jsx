import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import Loading from '../Loading/Loading';

const FoodDisplay = ({category}) => {

    let {food_list, loading} = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      {loading ? (
        <Loading/>
      ) : (
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if(category==="all" || category===item.category){
            return( 
            <FoodItem 
              key={index} 
              id={item._id} 
              name={item.name} 
              description={item.description} 
              price={item.price} 
              image={item.image} 
            />
          )
          }
        })}
      </div>

      )}
    </div>
  )
}

export default FoodDisplay

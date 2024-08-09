import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {
  
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>Explore our menu and discover a world of flavors. From fresh sashimi to signature rolls and delectable appetizers, each dish is crafted with the finest ingredients to bring you an unforgettable sushi experience.</p>
      <div className='explore-menu-list'>
        {menu_list.map((item, index)=>{
            return (
                <div onClick={() => setCategory(prev=>prev===item.menu_name?"all":item.menu_name)} key={index} className='explore-menu-list-item'>
                    <img className={category===item.menu_name?"active":""} src={item.menu_image}/>
                    <p>{item.menu_name}</p>    
                </div>
            )
        })}
      </div>
      <hr/>
    </div>
  )
}

export default ExploreMenu

import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import { onChangeHandler, onSubmitHandler } from '../../utils/handlers.js';

const Add = () => {
    const url = import.meta.env.VITE_BACKEND_URL;

    let [image, setImage] = useState(false);
    let [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Salad'
    });

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={(e) => onSubmitHandler(e, data, image, setData, setImage, url)}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={(e) => onChangeHandler(e, setData)} value={data.name} type="text" name='name' placeholder='Type here' />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={(e) => onChangeHandler(e, setData)} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={(e) => onChangeHandler(e, setData)} name="category">
                            <option value="Combo-Sushi">Combo Sushi</option>
                            <option value="Chickem">Chicken</option>
                            <option value="California">California</option>
                            <option value="Philadelphia">Philadelphia</option>
                            <option value="Hokomaki">Hokomaki</option>
                            <option value="Sushi-Sauces">Sushi Sauces</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input onChange={(e) => onChangeHandler(e, setData)} value={data.price} type="number" name='price' placeholder='$20' />
                    </div>
                </div>
                <button type='submit' className='add-button'>ADD</button>
            </form>
        </div>
    );
};

export default Add;
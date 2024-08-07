// admin/src/pages/Orders/Orders.jsx
import React, { useState, useEffect } from 'react';
import './Orders.css';
import { assets } from '../../assets/assets';
import { fetchAllOrders, statusHandler, archiveOrderHandler } from '../../utils/orderUtils.js';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchAllOrders(setOrders);
  }, []);

  return (
    <div className='order add'>
      <h3>Orders Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + ' x ' + item.quantity;
                  } else {
                    return item.name + ' x ' + item.quantity + ', ';
                  }
                })}
              </p>
              <p className='order-item-name'>{order.address.firstName + ' ' + order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street + ','}</p>
                <p>{order.address.city + ', ' + order.address.state + ', ' + order.address.country + ', ' + order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id, () => fetchAllOrders(setOrders))} value={order.status}>
              <option value="Food processing">Food processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
            <button onClick={() => archiveOrderHandler(order._id, () => fetchAllOrders(setOrders))}>Archive</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
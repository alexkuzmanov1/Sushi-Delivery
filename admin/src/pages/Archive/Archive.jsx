// admin/src/pages/Archive/Archive.jsx
import React, { useState, useEffect } from 'react';
import './Archive.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Archive = () => {
  const [orders, setOrders] = useState([]);
  const url = import.meta.env.VITE_BACKEND_URL;

  const fetchArchivedOrders = async () => {
    const response = await axios.get(url + '/api/order/archivedorders');
    if (response.data.success) {
      const sortedOrders = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOrders(sortedOrders);
      console.log(sortedOrders);
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchArchivedOrders();
  }, []);

  return (
    <div className='archive'>
      <h3>Archived Orders</h3>
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
            <p>Status: {order.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Archive;
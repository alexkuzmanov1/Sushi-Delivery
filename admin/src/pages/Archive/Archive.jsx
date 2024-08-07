// admin/src/pages/Archive/Archive.jsx
import React, { useState, useEffect } from 'react';
import './Archive.css';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import { fetchArchivedOrders } from '../../utils/orderUtils.js';

const Archive = () => {
  const [orders, setOrders] = useState([]);
  const [groupedOrders, setGroupedOrders] = useState({});

  useEffect(() => {
    fetchArchivedOrders(setOrders, setGroupedOrders);
  }, []);

  return (
    <div className='archive'>
      <h3>Archived Orders</h3>
      <div className="order-list">
        {Object.entries(groupedOrders).map(([date, { orders, totalPrice, itemCounts }]) => (
          <div key={date} className='order-group'>
            <div className='order-group-header'>
              <span>{date}</span>
              <span>Total Price: ${totalPrice.toFixed(2)}</span>
            </div>
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
        ))}
      </div>
    </div>
  );
};

export default Archive;
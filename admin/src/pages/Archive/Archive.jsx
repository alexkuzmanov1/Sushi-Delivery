// admin/src/pages/Archive/Archive.jsx
import React, { useState, useEffect } from 'react';
import './Archive.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import { format } from 'date-fns';

const Archive = () => {
  const [orders, setOrders] = useState([]);
  const [groupedOrders, setGroupedOrders] = useState({});
  const url = import.meta.env.VITE_BACKEND_URL;

  const fetchArchivedOrders = async () => {
    const response = await axios.get(url + '/api/order/archivedorders');
    if (response.data.success) {
      const sortedOrders = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOrders(sortedOrders);
      groupOrdersByDate(sortedOrders);
    } else {
      toast.error(response.data.message);
    }
  };

  const groupOrdersByDate = (orders) => {
    const grouped = orders.reduce((acc, order) => {
      const date = format(new Date(order.date), 'dd MMMM yyyy');
      if (!acc[date]) {
        acc[date] = { orders: [], totalPrice: 0, itemCounts: {} };
      }
      acc[date].orders.push(order);
      acc[date].totalPrice += order.amount;

      order.items.forEach(item => {
        if (!acc[date].itemCounts[item.name]) {
          acc[date].itemCounts[item.name] = 0;
        }
        acc[date].itemCounts[item.name] += item.quantity;
      });

      return acc;
    }, {});
    setGroupedOrders(grouped);
  };

  useEffect(() => {
    fetchArchivedOrders();
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
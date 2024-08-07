// admin/src/utils/orderUtils.js
import { format } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-toastify';

const url = import.meta.env.VITE_BACKEND_URL;

export const fetchArchivedOrders = async (setOrders, setGroupedOrders) => {
  try {
    const response = await axios.get(url + '/api/order/archivedorders');
    if (response.data.success) {
      const sortedOrders = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOrders(sortedOrders);
      setGroupedOrders(groupOrdersByDate(sortedOrders));
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error('Failed to fetch archived orders');
  }
};

export const groupOrdersByDate = (orders) => {
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
  return grouped;
};

export const fetchAllOrders = async (setOrders) => {
  try {
    const response = await axios.get(url + '/api/order/listorders');
    if (response.data.success) {
      const sortedOrders = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOrders(sortedOrders);
      console.log(sortedOrders);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error('Failed to fetch orders');
  }
};

export const statusHandler = async (event, orderId, fetchAllOrders) => {
  try {
    const response = await axios.post(url + '/api/order/status', {
      orderId,
      status: event.target.value
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  } catch (error) {
    toast.error('Failed to update order status');
  }
};

export const archiveOrderHandler = async (orderId, fetchAllOrders) => {
  try {
    const response = await axios.post(url + '/api/order/archiveorder', { orderId });
    if (response.data.success) {
      toast.success('Order archived successfully');
      await fetchAllOrders();
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error('Failed to archive order');
  }
};
import dotenv from 'dotenv';
import userModel from "../models/userModel.js"; 
import Stripe from "stripe";
import archivedOrderModel from "../models/archivedOrderModel.js";

const stripe = Stripe('sk_test_51PhBLwRpnWmfYnVNWUyOvbLYLUZ0gTcyIcKfQuBXXd8Nz3bC1JsthEQ2DErrFtdtPMaSbDNXIUi2r5llozixahYl00VyjgG03U');

import orderModel from "../models/orderModel.js";

dotenv.config();

//place order
const placeOrder = async (req, res) => {
    const frontendUrl = process.env.FRONTEND_URL;


    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: []});

        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency: 'bgn',
                product_data:{
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data:{
                currency:'bgn',
                product_data:{
                    name:'Delivery Charges'
                },
                unit_amount: 2 * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontendUrl}/verify?success=false`,      
        })

        res.json({
            success: true,
            session_url: session.url
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success==='true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true});
            res.json({
                success: true,
                message: 'Payment Successful'
            }) 
        } else {
            await orderModel.findByIdAndDelete(orderId);
                res.json({
                    success: false,
                    message: 'Payment Failed'
                })
            }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Payment error'
        })
    }
}

//user orders
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({userId: req.body.userId});
        res.json({
            success: true,
            data: orders
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Orders error'
        })        
    }
}

//admin orders list
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({
            success: true, 
            data: orders
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Orders error'
        })
    }
}

//update order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        res.json({
            success: true,
            message: 'Status updated'
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Status update error'
        })
    }
};

const getArchivedOrders = async (req, res) => {
    try {
      const orders = await archivedOrderModel.find(); // Assuming 'Delivered' status means archived
      res.json({
        success: true,
        data: orders
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: 'Internal Server Error'
      });
    }
  };

  const archiveOldOrders = async () => {
    try {
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
  
      const oldOrders = await orderModel.find({ date: { $lt: oneDayAgo } });
  
      if (oldOrders.length > 0) {
        await archivedOrderModel.insertMany(oldOrders);
        await orderModel.deleteMany({ date: { $lt: oneDayAgo } });
        console.log(`Archived ${oldOrders.length} orders.`);
      }
    } catch (error) {
      console.error('Error archiving old orders:', error);
    }
  };

  const archiveOrder = async (req, res) => {
    try {
      const { orderId } = req.body;
      const order = await orderModel.findById(orderId);
  
      if (order) {
        await archivedOrderModel.create(order.toObject());
        await orderModel.findByIdAndDelete(orderId);
        res.json({ success: true, message: 'Order archived successfully' });
      } else {
        res.json({ success: false, message: 'Order not found' });
      }
    } catch (error) {
      console.error('Error archiving order:', error);
      res.json({ success: false, message: 'Internal Server Error' });
    }
  };

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus, getArchivedOrders, archiveOldOrders, archiveOrder }
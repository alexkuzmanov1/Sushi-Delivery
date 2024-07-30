import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"; 
import Stripe from "stripe";

const stripe = Stripe('sk_test_51PhBLwRpnWmfYnVNWUyOvbLYLUZ0gTcyIcKfQuBXXd8Nz3bC1JsthEQ2DErrFtdtPMaSbDNXIUi2r5llozixahYl00VyjgG03U');


//place order
const placeOrder = async (req, res) => {

    const frontendUrl = 'http://localhost:5173';

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

export { placeOrder, verifyOrder, userOrders, listOrders }
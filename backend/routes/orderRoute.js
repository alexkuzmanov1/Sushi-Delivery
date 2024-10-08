import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {listOrders, placeOrder, updateStatus, userOrders, verifyOrder, getArchivedOrders, archiveOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/userorders', authMiddleware, userOrders);
orderRouter.get('/listorders', listOrders);
orderRouter.post('/status', updateStatus);
orderRouter.get('/archivedorders', getArchivedOrders);
orderRouter.post('/archiveorder', archiveOrder);



export default orderRouter;
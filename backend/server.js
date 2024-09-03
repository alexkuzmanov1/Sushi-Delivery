import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import ratingRouter from './routes/ratingRouter.js';
import cron from 'node-cron';
import { archiveOldOrders } from './controllers/orderController.js';
import fs from 'fs';

// app config
let app = express();
let port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());

// Ensure upload directory exists
const uploadDir = '/var/data/';
if (!fs.existsSync(uploadDir)) {
}

// db connection
connectDB();

// api endpoints
app.use('/api/food', foodRouter);
app.use('/images', express.static(path.join(__dirname, 'uploads')));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/ratings', ratingRouter);

// archive orders
cron.schedule('3 0 * * *', archiveOldOrders);

app.get('/', (req, res) =>{
    res.send('API Working');
})

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})
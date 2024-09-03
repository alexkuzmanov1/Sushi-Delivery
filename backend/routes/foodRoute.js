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
import path from 'path'; // Import the path module
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app config
let app = express();
let port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// db connection
connectDB();

// api endpoints
app.use('/api/food', foodRouter);
app.use('/images', express.static(uploadDir));
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
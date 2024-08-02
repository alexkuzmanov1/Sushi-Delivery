import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();


export let connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI).then(()=>console.log('db connected'))
}
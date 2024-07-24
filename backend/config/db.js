import mongoose from "mongoose";

export let connectDB = async () => {
    await mongoose.connect('mongodb+srv://alexkuzmanov:Alex0449!@cluster0.rdw8agg.mongodb.net/sushi').then(()=>console.log('db connected'))
}
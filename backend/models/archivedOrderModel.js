import mongoose from 'mongoose';

const archivedOrderSchema = new mongoose.Schema({
    userId: { 
        type: String, 
        required: true 
    },
    items: { 
        type: Array,
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    address: { 
        type: Object, 
        required: true 
    },
    status: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    payment: { 
        type: Boolean, 
        required: true 
    }
});

const archivedOrderModel = mongoose.models.archivedOrder || mongoose.model('archivedOrder', archivedOrderSchema);

export default archivedOrderModel;
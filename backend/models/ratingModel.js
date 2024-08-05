import mongoose from 'mongoose';

const ratingSchema = mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
});

const RatingModel = mongoose.model('Rating', ratingSchema);

export default RatingModel;
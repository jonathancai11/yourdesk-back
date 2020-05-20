import mongoose, { Schema } from 'mongoose';

const DeskScheme = new Schema({
    name: {
        type: String,
        required: true
    },
    use: {
        type: String,
        required: true
    },
    favorite: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        default: new Date
    },
    id: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product',
    }]
});

export default mongoose.model('Desk', DeskScheme);

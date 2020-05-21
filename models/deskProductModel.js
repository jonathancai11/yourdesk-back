import mongoose, { Schema } from 'mongoose';

const DeskProductScheme = new Schema({
    coordX: {
        type: Number,
        required: true,
    },
    coordY: {
        type: Number,
        required: true,
    },
    id: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product',
        required: true
    },
    pros: {
        type: String,
        required: false
    },
    cons: {
        type: String,
        required: false
    },
    saved: {
        type: Boolean,
        required: true
    },
    selected: {
        type: Boolean,
        required: true
    }
});

export default mongoose.model('DeskProduct', DeskProductScheme);

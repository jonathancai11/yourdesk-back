import mongoose, { Schema } from 'mongoose';

const Categories = Object.freeze({
    Computer: "Computer",
    Keyboard: "Keyboard",
    Mouse: "Mouse",
    Monitor: "Monitor",
    Desk: "Desk",
    Chair: "Chair",
    Accessory: "Accessory",
    Decoration: "Decoration",
    Other: "Other"
});

const ProductScheme = new Schema({
    img: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true,
    }, 
    category: {
        type: String,
        enum: Object.values(Categories),
        required: true,
    },
});

export default mongoose.model('Product', ProductScheme);

import mongoose, {
    Schema
} from 'mongoose';

/**
 * Create database scheme for notes
 */
const ListScheme = new Schema({
    author: {
        type: String,
        required: "Who's list is this?"
    },
    title: {
        type: String,
        required: "What is the lists's title?"
    },
    text: {
        type: [String],
        required: "What is the list itself?"
    },
    date: {
        type: Date,
        default: new Date
    }
});

export default mongoose.model('List', ListScheme);

import mongoose, { Schema } from 'mongoose';

const UserScheme = new Schema({
    username: {
        type: String,
        required: "What is their username?"
    },
    firstname: {
        type: String,
        required: "What is their first name?"
    },
    lastname: {
        type: String,
        required: "What is their username?"
    },
    email: {
        type: String,
        required: "What is their email?"
    }
});

export default mongoose.model('User', UserScheme);

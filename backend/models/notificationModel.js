const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the notification model
const notificationSchema = new Schema({
    userId: {
        type: String, 
        ref: 'User', 
        required: true
    },
    message: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24 * 30 
    }
}, { timestamps: true });

const notificationModel = mongoose.model("Notification", notificationSchema);
module.exports = notificationModel;

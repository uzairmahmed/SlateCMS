import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    type: { type: String, required: true },
    message: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);

export { Notification }
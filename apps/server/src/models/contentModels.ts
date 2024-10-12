import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    message: { type: String }, // Optional message content
    documentURL: { type: String, required: true }, // URL to the document
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to Teacher or Admin
}, {
    timestamps: true,
})

const Content = mongoose.model('Content', contentSchema); 

export { Content };
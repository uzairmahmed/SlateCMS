import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to Teacher or Admin
}, {
    timestamps: true,
})

const Announcement = mongoose.model('Announcement', announcementSchema);

export { Announcement };
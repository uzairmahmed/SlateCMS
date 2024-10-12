import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    courseCode: { type: String, required: true },
    description: { type: String, required: false },
    announcements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Announcement' }], // List of announcements
    content: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }], // List of content
    discussions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DiscussionThread' }], // List of discussions
}, {
    timestamps: true,
})

const Course = mongoose.model('Course', courseSchema);

export { Course };
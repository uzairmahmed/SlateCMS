import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    announcements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Announcement' }], // List of announcements
    content: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Content' }], // List of content
    discussions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DiscussionThread' }], // List of discussions
}, {
    timestamps: true,
})

const announcementSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to Teacher or Admin
}, {
    timestamps: true,
})

const discussionThreadSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to Teacher or Student
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DiscussionReply' }], // List of replies
}, {
    timestamps: true,
})

const discussionReplySchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    thread: { type: mongoose.Schema.Types.ObjectId, ref: 'DiscussionThread' }, // Reference to the parent thread
    message: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to Teacher or Student
}, {
    timestamps: true,
})

const contentSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    message: { type: String }, // Optional message content
    documentURL: { type: String, required: true }, // URL to the document
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to Teacher or Admin
}, {
    timestamps: true,
})

const Course = mongoose.model('Course', courseSchema);
const Announcement = mongoose.model('Announcement', announcementSchema);
const DiscussionThread = mongoose.model('DiscussionThread', discussionThreadSchema);
const DiscussionReply = mongoose.model('DiscussionReply', discussionReplySchema);
const Content = mongoose.model('Content', contentSchema);

export { Course, Announcement, DiscussionThread, DiscussionReply, Content };
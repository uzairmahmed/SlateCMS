import mongoose from "mongoose";


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


const DiscussionThread = mongoose.model('DiscussionThread', discussionThreadSchema);
const DiscussionReply = mongoose.model('DiscussionReply', discussionReplySchema);

export { DiscussionThread, DiscussionReply };
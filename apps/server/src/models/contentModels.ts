import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    document: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to Teacher or Admin
    embeddings: { type: [[Number]] }, // Array of embeddings 
    files: { type: [String] },
    links: { type: [String] },
    parsedFiles: [{ fileName: String, fileType: String, fileData: String }],
    parsedLinks: [{ linkDomain: String, linkUrl: String, linkData: String }],
}, {
    timestamps: true,
})

const Content = mongoose.model('Content', contentSchema);

export { Content };
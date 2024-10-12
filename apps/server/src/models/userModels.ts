import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: false },
    name: { type: String, required: true },
    usertype: { type: String, required: true, default: "student"},
    uid: { type: String, required: true },
}, {
    timestamps: true,
    discriminatorKey: 'usertype'
})

const adminSchema = new mongoose.Schema({})

const teacherSchema = new mongoose.Schema({
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }] // Reference to Course
})
const studentSchema = new mongoose.Schema({
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }] // Reference to Course
})

const User = mongoose.model('User', userSchema);
const Admin = User.discriminator('admin', adminSchema);
const Teacher = User.discriminator('teacher', teacherSchema);
const Student = User.discriminator('student', studentSchema);


export { User, Admin, Teacher, Student };
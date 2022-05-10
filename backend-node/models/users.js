import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    isProfileCompleted: {
        type: Boolean,
        default: false,
    },
    profile_image: String,
    aadhar_image: String,
    pancard_image: String,
    salary: {
        type: Number,
    },
    bank_name: String,
    customer_name: String,
    Account_no: Number,

    cibil: {
        type: Number,
        default: 600,
    },
})

export const User = mongoose.model('User', userSchema)

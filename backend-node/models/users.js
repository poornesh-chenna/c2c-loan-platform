import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
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
  },
});

export const User = mongoose.model("User", userSchema);

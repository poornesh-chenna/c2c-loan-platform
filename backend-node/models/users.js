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
  photo: {
    data: Buffer,
    type: String,
  },
  aadhar: {
    data: Buffer,
    type: String,
  },
  pan: {
    data: Buffer,
    type: String,
  },
  salary: {
    type: Number,
  },
  bankDetails: {
    bank_name: {
      type: String,
    },
    customer_name: {
      type: String,
    },
    Account_no: {
      type: Number,
    },
  },
  cibil: {
    type: Number,
  },
});

export const User = mongoose.model("User", userSchema);

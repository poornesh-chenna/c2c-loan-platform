import mongoose from "mongoose";
import { User } from "./users.js";
const Schema = mongoose.Schema;

const loanSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  Amount: {
    type: Number,
    required: true,
  },
  Tenure: {
    type: String,
    required: true,
  },
  Interest_Rate: {
    type: Number,
    required: true,
  },
  modified: [
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      Tenure: {
        type: String,
      },
      IR: {
        type: Number,
      },
    },
  ],
});

export const Loan = mongoose.model("loan", loanSchema);

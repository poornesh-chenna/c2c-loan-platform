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
  },
  Tenure: {
    type: Number,
  },
  Interest_Rate: {
    type: Number,
    max: 100,
  },
  status: {
    type: String,
    default: "Pending",
  },
  modified: [
    {
      modified_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      Tenure: {
        type: String,
      },
      Interest_Rate: {
        type: Number,
      },
      status: {
        type: String,
        default: "Pending",
      },
    },
  ],
});

export const Loan = mongoose.model("Loan", loanSchema);

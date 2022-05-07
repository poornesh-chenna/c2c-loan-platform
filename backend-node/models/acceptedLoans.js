import mongoose from "mongoose";
import { User } from "./users";
import { Loan } from "./loans";

const Accepted_loans_Schema = new mongoose.Schema(
  {
    borrower_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    lender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    loan_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loan",
    },
  },
  { timestamps: true }
);

export const AcceptedLoans = mongoose.model(
  "AcceptedLoans",
  Accepted_loans_Schema
);

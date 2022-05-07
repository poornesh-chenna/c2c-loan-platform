import { Router } from "express";
import { authorizeUser } from "../middlewares/authorizeUser.js";
import { User } from "../models/users.js";
import { Loan } from "../models/loans.js";
import { isValidAmount } from "../utils/getCibilscore.js";
import { BadRequestError } from "../CustomErrors/BadRequestError.js";
const router = Router();

router.post("/apply-loan", authorizeUser, async (req, res) => {
  if (!(await isValidAmount(req.body.amount))) {
    throw new BadRequestError("Amount limit is exceeded");
  }
  const newLoan = new Loan({
    user_id: req.userId,
    Amount: req.body.amount,
    Tenure: req.body.Tenure,
    Interest_Rate: req.body.Interest_Rate,
  });
  await newLoan.save();
  res.status(200).send("successfully applied for loan");
});

router.post("/accept-modified-loans", (req, res) => {});

router.get("/loan-requests", async (req, res) => {
  const allLoans = await Loan.find({});
  res.status(200).send(allLoans);
});

router.get("/myloans", authorizeUser, async (req, res) => {
  const myloans = await Loan.find({ user_id: req.userId });
  res.status(200).send(myloans);
});

export const LoanTakerRoutes = router;

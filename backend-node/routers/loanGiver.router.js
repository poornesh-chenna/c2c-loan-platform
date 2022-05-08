import { Router } from "express";
import { authorizeUser } from "../middlewares/authorizeUser.js";
import { AcceptedLoans } from "../models/acceptedLoans.js";
import { Loan } from "../models/loans.js";
import { User } from "../models/users.js";

const router = Router();
/**
 * @swagger
 *
 */
router.get("/lending-loans", authorizeUser, async (req, res) => {
  const lending_loans = await AcceptedLoans.find({
    lender_id: req.userId,
  }).populate("loan_id");
  res.status(200).send(lending_loans);
});

router.post("/reject-loan", (req, res) => {});

router.post("/accept-loan", authorizeUser, async (req, res) => {
  const loan = await Loan.findOne({ _id: req.body.loanId });
  const acceptedLoans = new AcceptedLoans({
    borrower_id: loan.user_id,
    lender_id: req.userId,
    loan_id: req.body.loanId,
  });
  Loan.updateOne({ _id: req.body.loanId }, { status: "Sanctioned" }, (err) => {
    if (!err) {
      res.status(200).send("Successfully accepted the loan");
    }
  });
  await acceptedLoans.save();
  res.status(200).send({
    message: "You are now Successfully accepted the loan",
  });
});

router.patch("/modify-loan", authorizeUser, async (req, res) => {
  Loan.updateOne(
    { _id: req.body.loanId },
    {
      $addToSet: {
        modified: {
          modified_user_id: req.userId,
          Tenure: req.body.Tenure,
          Interest_Rate: req.body.Interest_Rate,
        },
      },
    },
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "cannot modify the loan" });
      } else {
        res.status(200).send({
          message: "successfully modified loan is updated",
        });
      }
    }
  );
});

export const LoanGiverRoutes = router;

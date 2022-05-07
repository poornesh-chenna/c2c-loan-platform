import { Router } from "express";
import { authorizeUser } from "../middlewares/authorizeUser.js";
import { User } from "../models/users.js";
import { Loan } from "../models/loans.js";
const router = Router();

router.post("/apply-loan", authorizeUser, (req, res) => {
  req.userId;
});

router.post("/accept-modified-loans", (req, res) => {});

router.get("/loan-requests", (req, res) => {});

router.get("/myloans", (req, res) => {});

export const LoanTakerRoutes = router;

import { Router } from "express";

const router = Router();

router.get("/lending-loans", (req, res) => {});

router.post("/reject-loan", (req, res) => {});

router.post("accept-loan", (req, res) => {});

router.post("/modify-loan", (req, res) => {});

export const LoanGiverRoutes = router;

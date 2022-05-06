import { Router } from 'express'

const router = Router()

router.post('/apply-loan', (req, res) => {})

router.post('/accept-modified-loans', (req, res) => {})

router.get('/loan-requests', (req, res) => {})

router.get('/myloans', (req, res) => {})

export const LoanTakerRoutes = router

import { Router } from 'express'
import { authorizeUser } from '../middlewares/authorizeUser.js'
import { User } from '../models/users.js'
import { Loan } from '../models/loans.js'
import { isValidAmount } from '../utils/getCibilscore.js'
import { AcceptedLoans } from '../models/acceptedLoans.js'
import { BadRequestError } from '../CustomErrors/BadRequestError.js'
const router = Router()

router.post('/apply-loan', authorizeUser, async (req, res) => {
    if (!(await isValidAmount(req.body.amount))) {
        throw new BadRequestError('Amount limit is exceeded')
    }
    const newLoan = new Loan({
        user_id: req.userId,
        Amount: req.body.amount,
        Tenure: req.body.Tenure,
        Interest_Rate: req.body.Interest_Rate,
    })
    await newLoan.save()
    res.status(200).send('successfully applied for loan')
})

// router.get("/modified-loans",(req,res)=>{
//   Loan.find({})
// })

router.post('/accept-modified-loan', authorizeUser, async (req, res) => {
    const loan = await Loan.findOne({ _id: req.body.loanId })
    const acceptedLoans = await new AcceptedLoans({
        borrower_id: loan.user_id,
        lender_id: req.userId,
        loan_id: req.body.loanId,
    }).save()
    const modified_id = req.body.modified_id
    const modifiedDoc = loan.modified.find((doc) => {
        return doc._id.toString() === modified_id
    })

    modifiedDoc.status = 'Accepted'
    loan.Tenure = req.body.tenure
    loan.Interest_Rate = req.body.interest_rate
    loan.status = 'Sanctioned'
    await loan.save()
    res.status(200).send({
        message: 'You are now Successfully accepted the loan',
    })
})

router.get('/loan-requests', authorizeUser, async (req, res) => {
    const allLoans = await Loan.find({ user_id: { $ne: req.userId } })
        .populate('user_id', 'username email _id salary profile_image')
        .select('-modified')
    res.status(200).send(allLoans)
})

router.get('/myloans', authorizeUser, async (req, res) => {
    const myloans = await Loan.find({ user_id: req.userId }).populate(
        'modified.modified_user_id',
        'username _id profile_image cibil'
    )
    res.status(200).send({ myloans })
})

export const LoanTakerRoutes = router

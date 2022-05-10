import { Router } from 'express'
import { authorizeUser } from '../middlewares/authorizeUser.js'
import { User } from '../models/users.js'
import { Loan } from '../models/loans.js'
import { isValidAmount, maxLoan } from '../utils/getCibilscore.js'
import { AcceptedLoans } from '../models/acceptedLoans.js'
import { BadRequestError } from '../CustomErrors/BadRequestError.js'
import { MailService } from '../controllers/nodemailer/sendMails.js'
const router = Router()

router.post('/apply-loan', authorizeUser, async (req, res) => {
    if (!(await isValidAmount(req.body.amount))) {
        throw new BadRequestError('Amount limit is exceeded')
    }
    const newLoan = await new Loan({
        user_id: req.userId,
        Amount: req.body.amount,
        Tenure: req.body.Tenure,
        Interest_Rate: req.body.Interest_Rate,
    }).save()

    const user = await User.findOne({ _id: req.userId }).select(
        'email username'
    )
    await MailService.loanApply(
        user.email,
        newLoan.Amount,
        newLoan.Tenure,
        newLoan.Interest_Rate
    )
    res.status(200).send('successfully applied for loan')
})

router.post('/accept-modified-loan', authorizeUser, async (req, res) => {
    const loan = await Loan.findOne({ _id: req.body.loanId })
    const modified_id = req.body.modified_id
    const modifiedDoc = loan.modified.find((doc) => {
        return doc._id.toString() === modified_id
    })

    const acceptedLoans = await new AcceptedLoans({
        borrower_id: req.userId,
        lender_id: modifiedDoc.modified_user_id,
        loan_id: req.body.loanId,
    }).save()

    modifiedDoc.status = 'Accepted'
    loan.Tenure = req.body.tenure
    loan.Interest_Rate = req.body.interest_rate
    loan.status = 'Sanctioned'
    await loan.save()
    res.status(200).send({
        message: 'You are now Successfully accepted the loan',
    })
})

router.post('/reject-modified-loan', authorizeUser, async (req, res) => {
    const loan = await Loan.updateOne(
        { _id: req.body.loanId },
        {
            $pull: {
                modified: {
                    _id: req.body.modified_id,
                },
            },
        }
    )
    res.send({ message: 'modified request is rejected' })
    // const modifiedDoc = loan.modified.find((doc) => {
    //   return doc._id.toString() === modified_id;
    // });
    // modifiedDoc.status = 'Rejected';
})

router.get('/loan-requests', authorizeUser, async (req, res) => {
    const allLoans = await Loan.find({
        user_id: { $ne: req.userId },
        status: 'Pending',
    }).populate('user_id', 'username email cibil')
    res.status(200).send(allLoans)
})

router.get('/myloans', authorizeUser, async (req, res) => {
    const myloans = await Loan.find({ user_id: req.userId }).populate(
        'modified.modified_user_id',
        'username _id profile_image cibil'
    )
    res.status(200).send({ myloans })
})

router.get('/maxEligibleLoan', authorizeUser, async (req, res) => {
    const maxEligibleLoan = await maxLoan(req.userId)
    res.status(200).send({ maxEligibleLoan })
})

export const LoanTakerRoutes = router

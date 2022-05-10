import { Router } from 'express'
import { MailService } from '../controllers/nodemailer/sendMails.js'
import { authorizeUser } from '../middlewares/authorizeUser.js'
import { AcceptedLoans } from '../models/acceptedLoans.js'
import { Loan } from '../models/loans.js'
import { User } from '../models/users.js'

const router = Router()
/**
 * @swagger
 *
 */

router.get('/lending-loans', authorizeUser, async (req, res) => {
    const lending_loans = await AcceptedLoans.find({
        lender_id: req.userId,
    })
        .populate('loan_id')
        .populate('borrower_id', '_id username email')
    res.status(200).send(lending_loans)
})

router.post('/reject-loan', authorizeUser, async (req, res) => {
    const loan = await Loan.findOneAndUpdate(
        { _id: req.body.loanId },
        { status: 'Rejected' }
    ).populate('user_id')
    const rejectedUser = await User.findOne({ _id: req.userId })
    await MailService.rejectLoanRequest(
        loan.user_id.email,
        req.body.loanId,
        loan.Amount,
        loan.Tenure,
        loan.Interest_Rate,
        rejectedUser.username,
        rejectedUser.email
    )
    res.status(200).send({ message: 'Rejected loan' })
})

router.post('/accept-loan', authorizeUser, async (req, res) => {
    const loan = await Loan.findOne({ _id: req.body.loanId })
    const acceptedLoans = await new AcceptedLoans({
        borrower_id: loan.user_id,
        lender_id: req.userId,
        loan_id: req.body.loanId,
    }).save()
    const acceptLoanDetails = await AcceptedLoans.findOne({
        load_id: req.body.loanId,
    }).populate('lender_id borrower_id')
    await Loan.updateOne({ _id: req.body.loanId }, { status: 'Sanctioned' })
    await MailService.acceptLoanRequest(
        [
            acceptLoanDetails.lender_id.email,
            acceptLoanDetails.borrower_id.email,
        ],
        req.body.loanId,
        loan.Amount,
        loan.Tenure,
        loan.Interest_Rate,
        acceptLoanDetails.lender_id.username,
        acceptLoanDetails.lender_id.email,
        acceptLoanDetails.borrower_id.username,
        acceptLoanDetails.borrower_id.email,
        1000
    )
    res.status(200).send({
        message: 'You are now Successfully accepted the loan',
    })
})

router.patch('/modify-loan', authorizeUser, async (req, res) => {
    const prevLoan = await Loan.findOne({ _id: req.body.loanId }).populate(
        'user_id'
    )
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
        async (err) => {
            if (err) {
                console.log(err)
                res.status(500).send({ message: 'cannot modify the loan' })
            } else {
                const user = await User.findOne({ _id: req.userId })
                await MailService.modifyLoanRequest(
                    prevLoan.user_id.email,
                    prevLoan.Amount,
                    prevLoan.Tenure,
                    req.body.Tenure,
                    prevLoan.Interest_Rate,
                    req.body.Interest_Rate,
                    user.username,
                    user.email,
                    req.body.loanId
                )
                res.status(200).send({
                    message: 'successfully modified loan is updated',
                })
            }
        }
    )
})

export const LoanGiverRoutes = router

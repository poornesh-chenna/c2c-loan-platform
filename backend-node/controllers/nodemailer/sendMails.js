import { transporter } from './transporter.js'
export class MailService {
    static endHtml = `
    <h5>Thank you.</h5>
    <p>C2C Platform</p>
        `
    static async loanApply(senderEmail, amount, tenure, interest_rate) {
        const res = await transporter.sendMail({
            from: 'partheev8@gmail.com',
            to: senderEmail,
            subject: 'Loan Application - C2C Platform ',

            html: `
            <h4>Loan Application</h4>
            <h6>Amount : ${amount}</h6>
            <h6> Tenure : ${tenure} Months</h6>
            <h6> Interest Rate : ${interest_rate}% </h6>
            ${this.endHtml}
            `,
        })
    }
    static async modifyLoanRequest(
        senderEmail,
        amount,
        prevTenure,
        currTenure,
        prevInterest,
        currInterest,
        username,
        modifiedUserEmail,
        loanId
    ) {
        const res = await transporter.sendMail({
            from: 'partheev8@gmail.com',
            to: senderEmail,
            subject: 'Modified Loan Request - C2C Platform ',

            html: `
            <h4>Loan Modification Request</h4>
            <p>Loan Id : ${loanId} </p>
            <h6>Amount : ${amount}</h6>
            <h6> Tenure : ${prevTenure} Months - Requested Tenure : ${currTenure}</h6>
            <h6> Interest Rate : ${prevInterest}% - Requested Interest Rate : ${currInterest}</h6>
            <hr/>
            <h5>Modified User Details</h5>
            <h6> Username : ${username} </h6>
            <h6> Email : ${modifiedUserEmail}
            ${this.endHtml}
            `,
        })
    }
    static async acceptLoanRequest(
        senderEmail,
        loanId,
        amount,
        tenure,
        interest_rate,
        lender_username,

        lender_email,
        borrower_username,
        borrower_email
    ) {
        const res = await transporter.sendMail({
            from: 'partheev8@gmail.com',
            to: senderEmail,
            subject: 'Loan Sanctioned - C2C Platform ',

            html: `
            <h4>Sanctioned Loan Details</h4>
            <p>Loan Id : ${loanId} </p>
            <h6>Amount : ${amount}</h6>
            <h6> Tenure : ${tenure} Months</h6>
            <h6> Interest Rate : ${interest_rate}%</h6>
            <hr/>
            <h5>Borrower Details</h5>
            <h6> Username : ${borrower_username}</h6>
            <h6> Email : ${borrower_email}</h6>
            <h5>Lender Details</h5>
            <h6> Username : ${lender_username} </h6>
            <h6> Email : ${lender_email}
            ${this.endHtml}
            `,
        })
    }
    static async rejectLoanRequest(
        senderEmail,
        loanId,
        amount,
        tenure,
        interest_rate,
        username,
        reject_user
    ) {
        const res = await transporter.sendMail({
            from: 'partheev8@gmail.com',
            to: senderEmail,
            subject: 'Loan Sanctioned - C2C Platform ',

            html: `
            <h4>Rejected Loan Details</h4>
            <p>Loan Id : ${loanId} </p>
            <h6>Amount : ${amount}</h6>
            <h6> Tenure : ${tenure} Months</h6>
            <h6> Interest Rate : ${interest_rate}%</h6>
            <hr/>
            <h5>Rejected User Details</h5>
            <h6> Username : ${username} </h6>
            <h6> Email : ${reject_user}
            ${this.endHtml}
            `,
        })
    }
}

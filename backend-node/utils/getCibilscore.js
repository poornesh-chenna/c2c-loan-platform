import { Loan } from '../models/loans.js'
import { User } from '../models/users.js'

export const generateCibil = async (userId, salary) => {
    // const userDetails = await User.findById({ userId })
    const totalLoans = await Loan.find({ user_id: userId })
    const len = totalLoans.length
    if (salary >= 100000 && len <= 2) {
        return 650
    } else if (salary >= 100000 && len > 2 && len <= 4) {
        return 550
    } else if (salary >= 100000 && len > 4) {
        return 450
    } else if (salary < 100000 && len <= 2) {
        return 500
    } else if (salary < 100000 && len > 2 && len <= 4) {
        return 400
    } else if (salary < 100000 && len > 4) {
        return 350
    }
}

export const isValidAmount = async (amount) => {
    let maxAmount
    const cibil = await generateCibil()
    if (cibil >= 300 && cibil <= 450) {
        maxAmount = 50000
    } else if (cibil >= 451 && cibil <= 600) {
        maxAmount = 100000
    } else {
        maxAmount = 200000
    }
    if (amount <= maxAmount) {
        return true
    } else {
        return false
    }
}

export const maxLoan = async (userId) => {
    const user = await User.findOne({ _id: userId })
    const cibil = await generateCibil(userId, user.salary)
    let maxLoan
    if (cibil >= 300 && cibil <= 450) {
        maxLoan = 50000
    } else if (cibil >= 451 && cibil <= 600) {
        maxLoan = 100000
    } else {
        maxLoan = 200000
    }
    return maxLoan
}

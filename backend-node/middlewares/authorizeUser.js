import { BadRequestError } from '../CustomErrors/BadRequestError'
import { UnAuthorizedError } from '../CustomErrors/UnAuthorizedError'
import { verifyTokenAndGetUserId } from '../utils/jwt'

export const authorizeUser = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) throw new UnAuthorizedError()
    try {
        const userId = verifyTokenAndGetUserId(token)
        req.userId = userId
        next()
    } catch (err) {
        throw new UnAuthorizedError()
    }
}

export class UnAuthorizedError extends Error {
    static statusCode = 401
    constructor() {
        super('Unauthorized Request.')
    }
}

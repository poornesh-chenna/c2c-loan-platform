export class BadRequestError extends Error {
    static statusCode = 400
    constructor(message) {
        super(message)
    }
}

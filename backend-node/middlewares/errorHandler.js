export const errorHandler = (error, req, res, next) => {
    const message = error.message
    const statusCode = error.statusCode || 500
    res.status(statusCode).send({
        message: message,
    })
}

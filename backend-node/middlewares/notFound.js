export const notFound = (req, res, next) => {
    res.status(400).send({
        message: 'Route not found.',
    })
}

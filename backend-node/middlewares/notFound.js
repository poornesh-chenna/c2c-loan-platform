export const notFound = (req, res, next) => {
    res.send({
        message: 'Route not found.',
    })
}

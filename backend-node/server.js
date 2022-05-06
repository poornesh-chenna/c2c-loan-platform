import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { notFound } from './middlewares/notFound.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { connectMongoDb } from './models/initMongoose.js'

const app = express()

// configure environmental variables of .env file
dotenv.config()

// middlewares
app.use(express.json())
app.use(cors())

try {
    await connectMongoDb()
    console.log('MongoDB connected.....')
} catch (err) {
    console.log('DATABASE NOT CONNECTED')
    console.log(err)
    process.exit()
}

app.get('/check', (req, res) => {
    res.send({ message: 'Server up and running....' })
})

app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})

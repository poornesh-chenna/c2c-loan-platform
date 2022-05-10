import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import 'express-async-errors'
import { notFound } from './middlewares/notFound.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { connectMongoDb } from './models/initMongoose.js'
import { AuthRouters } from './routers/auth.router.js'
import { LoanTakerRoutes } from './routers/loanTaker.router.js'
import { LoanGiverRoutes } from './routers/loanGiver.router.js'
import { checkEnvVariables } from './utils/checkEnvVariables.js'
import { routing } from './routers/routing.js'
import { MailService } from './controllers/nodemailer/sendMails.js'

const app = express()

// configure environmental variables of .env file
if (process.env.NODE_ENV !== 'production') {
    if (!fs.existsSync(path.join(path.resolve(), '.env'))) {
        console.error('.env file not exist')
        process.exit()
    }
    dotenv.config()
}

// CHECKS FOR ALL REQUIRED ENV VARIABLES
checkEnvVariables()

// MIDDLEWARES
// Request body parser middleware
app.use(express.json())
// Cors middleware to allow access from all sites (*)
app.use(cors())

// CONNECT TO MONGODB DATABASE SERVER
try {
    await connectMongoDb()
    console.log('MongoDB connected.....')
} catch (err) {
    console.log('DATABASE NOT CONNECTED')
    console.log(err)
    process.exit()
}
// CHECK SERVER HEALTH
app.get('/check', async (req, res) => {
    console.log('check')
    res.send({ message: 'Server up and running....' })
})

//AUTHENTICATION ROUTERS - LOGIN AND SIGNUP
app.use(AuthRouters)

//APIS TO BORROW LOANS
app.use(LoanTakerRoutes)

//APIS TO LEND LOANS
app.use(LoanGiverRoutes)

app.use(routing)
// REQUESTED ROUTE NOT FOUND
app.use(notFound)

// GLOBAL ERROR HANDLING FOR API REQUEST
app.use(errorHandler)

app.listen(process.env.PORT || 3005, () => {
    console.log(`Server running on port ${process.env.PORT || 3005}`)
})

import mongoose from 'mongoose'

export const connectMongoDb = async () => {
    await mongoose.connect(process.env.MONGO_URI)
}

import mongoose from "mongoose";


export const mongooseDbConnection = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017', {
            dbName: 'test'
        })

        console.log(`Mongoose db connected at :${conn.connection.id}`)
    } catch (error) {
        console.log({ error })
    }
}
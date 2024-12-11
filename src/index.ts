import express from 'express'
import { mongooseDbConnection } from './config/db.config';
import { userRouter } from './routes/user.routes';

const app = express()

const port = 3002;

app.use(express.json())

app.use('/api', userRouter)

mongooseDbConnection()

app.listen(port, () => {
    console.warn(`Server is up at port : ${port}`)
})
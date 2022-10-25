import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import gameRouter from './routes/game.js'
import roleRouter from './routes/role.js'
import profileRouter from './routes/profile.js'
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
app.disable('x-powered-by')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', authRouter)
app.use('/user', userRouter)
app.use('/profile', profileRouter)
app.use('/game', gameRouter)
app.use('/role', roleRouter)
app.use('/roles', roleRouter)


const port = 4001
app.listen(port, () => {
  console.log(`\n Server is running on port ${port}\n`)
})
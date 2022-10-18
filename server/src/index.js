import express from 'express'
import cors from 'cors'

const app = express()
app.disable('x-powered-by')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))




const port = 4001
app.listen(port, () => {
  console.log(`\n Server is running on port ${port}\n`)
})
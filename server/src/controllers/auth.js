import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getUserByEmailUtil } from './utils/utils.js'
const expiry = process.env.JWT_EXPIRY
const secret = process.env.JWT_SECRET

export const login = async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body

  if(!email || !password) {
    return res.status(400).json({
      error: 'Invalid email and/or password provided'
    })
  }

  try {
    const user = await getUserByEmailUtil(email)
    if (!user) {
      return res.status(400).json({
        error: 'Invalid email and/or password provided'
      })
    }
    
    const validCredentials = await compareCredentials(password, user)

    if (!validCredentials) {
      return res.status(400).json({
        error: 'Invalid email and/or password provided'
      })
    }
    const id = user.id

    const token = jwt.sign({ id }, secret, { expiresIn: expiry })

    return res.status(200).json({
      token,
      user
    })
  }
  catch (e) {
    return res.status(e.code).json({
      error: e.message
    })
  }
}

const compareCredentials = async (pass, user) => {
  const validPass = await bcrypt.compare(pass, user.password)

  return validPass ? true : false
}

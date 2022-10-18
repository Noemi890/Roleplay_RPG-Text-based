import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getUserByEmail } from './user'
const expiry = env('JWT_EXPIRY')
const secret = env('JWT_SECRET')

export const login = async (req, res) => {
  const { email, password } = req.body

  if(!email || !password) {
    return res.status(400).json({
      message: 'Invalid email and/or password provided'
    })
  }

  try {
    const user = await getUserByEmail(email)
    if (!user) {
      return res.status(404).json({
        message: 'Invalid email and/or password provided'
      })
    }
    
    const validCredentials = await compareCredentials(password, user)

    if (!validCredentials) {
      return res.status(400).json({
        message: 'Invalid email and/or password provided'
      })
    }
    const id = user.id

    const token = jwt.sign({ id }, secret, { expiresIn: expiry })

    return res.staus(200).json({
      token,
      ...user.toJson()
    })
  }
  catch (e) {
    res.staus(e.code).json({
      message: e.message
    })
    throw e
  }
}

const compareCredentials = async (pass, user) => {
  const validPass = await bcrypt.compare(pass, user.password)

  return validPass ? true: false
}
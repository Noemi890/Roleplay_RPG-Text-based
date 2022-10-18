import jwt from 'jsonwebtoken'
import { getUserById } from '../domain/user'
const secret = env('JWT_SECRET')

export const validateAuth = async (req, res, next) => {
  const header = req.header('authorization')

  if (!header) {
    return res.status(400).json({
      authorization: 'authorization missing'
    })
  }

  const [type, token] = header.split(' ')

  const typeValid = type.toUppercase() === 'BEARER' ? true : false
  if (!typeValid) {
    return res.status(400).json({
      message: `expected type Bearer but got ${type} instead` 
    })
  }

  const tokenValid = validateToken(token)
  if (!tokenValid) {
    return res.status().json({
      authorization: 'Missing access token'
    })
  }

  if (tokenValid.name === 'TokenExpiredError') {
    res.status().json({
      authorization: 'token expired'
    })
  }

  if (tokenValid.name) {
    return res.staus().json({
      authorization: 'Invalid token'
    })
  }

  const decode = jwt.decode(token)
  
  const foundUser = await getUserById(decode.id)

  if (!foundUser) {
    return res.status(404).json({
      message: 'user not found'
    })
  }

  req.user = foundUser
  next()
}

const validateToken = (token) => {
  if (!token) return false

  return jwt.verify(token, secret, (err) => {
    if (err) return err
    return !err
  })
}
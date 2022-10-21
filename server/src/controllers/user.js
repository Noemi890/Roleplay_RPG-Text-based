import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const createUser = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email or Password not provided'
    })
  }

  const passHash = await bcrypt.hash(password, 8)

  const foundUser = await prisma.user.findFirst({
    where: {
      email
    }
  })

  if (foundUser) {
    return res.status(400).json({
      error: "Email already in use"
    })
  }

  try {
    
    const createdUser = await prisma.user.create({
      data: {
        email,
        password: passHash
      }
    })

    return res.status(201).json({ 
      createdUser,
      message: 'Success. You can now login'
    })
  }
  catch (e) {
    res.status(500).json({
      error: 'Cannot create User'
    })
  }

}

export const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })

  if (!user) {
    return false
  }
  return user
}

export const getUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email
    },
    include: {
      profile: true
    }
  })

  if (!user) {
    return false
  }
  return user
}

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const createUser = async (req, res) => {
  const { email, password, name, surname, image, age, race, biography } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email or Password not provided'
    })
  }

  const passHash = await bcrypt.hash(password, 8)

  try {
    const createdUser = await prisma.user.create({
      data: {
        email,
        password: passHash,
        profile: {
          create: {
            name, 
            surname,
            image, 
            age, 
            race, 
            biography
          }
        }
      }
    })

    return res.status(201).json({ 
      message: 'Success. You can now login',
      createdUser 
    })
  }
  catch (e) {
    res.status(500).json({
      message: 'Cannot create User'
    })
    throw e
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
    }
  })

  if (!user) {
    return false
  }
  return user
}
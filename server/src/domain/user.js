import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

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
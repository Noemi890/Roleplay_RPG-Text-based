import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getUserByIdUtil = async (id) => {
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

export const getUserByEmailUtil = async (email) => {
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
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function seed() {
  const passHash = await bcrypt.hash('mysecurepassword', 8)

  const newUser = await prisma.user.create({
    data: {
      email: 'myemail@email.com',
      password: passHash,
      profile: {
        create: {
          name: 'Cat',
          surname: 'McCatson'
        }
      }
    },
    include: {
      profile: true
    }
  })

  console.log(newUser)
}

seed().catch(async (error) => {
  console.error(error)
  await prisma.$disconnect()
  process.exit(1)
})
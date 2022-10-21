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

  const game = await prisma.game.create({
    data: {
      title: 'Once Upon a Time'
    }
  })

  const profile = await prisma.profile.create({
    data: {
      userId: newUser.id,
      gameId: game.id,
      name: 'Sr. Cat',
      surname: 'Wilson',
      image: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80'
    }
  })

  console.log(newUser, profile, game)
}

seed().catch(async (error) => {
  console.error(error)
  await prisma.$disconnect()
  process.exit(1)
})
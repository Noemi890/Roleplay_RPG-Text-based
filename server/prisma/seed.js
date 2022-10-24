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
      title: 'Dawn of Cats'
    }
  })

  const profile = await prisma.profile.create({
    data: {
      userId: newUser.id,
      gameId: game.id,
      name: 'Sr. Cat',
      surname: 'Wilson',
      image: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
      roles: {
        create: [
          {
            gameId: game.id,
            title: 'It\'s always sunny in CatLand',
            content: 'It was a sunny day in CatLand. I woke up near my bowl of food as usual, with still one paw in it.'
          },
          {
            gameId: game.id,
            title: 'Another one bites my tail',
            content: 'I was minding my own business, laid on the couch like always, when, all of a sudden, an incredible pain spiraled through my spine. That damn dog has done it again!'
          }
        ]
      }
    },
    include: {
      roles: true
    }
  })

  console.log(newUser, profile, game)
}

seed().catch(async (error) => {
  console.error(error)
  await prisma.$disconnect()
  process.exit(1)
})
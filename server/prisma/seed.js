import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function seed() {
  const passHash = await bcrypt.hash('mysecurepassword', 8)

  const newUser = await prisma.user.create({
    data: {
      email: 'myemail@email.com',
      password: passHash
    }
  })

  const firstProfile = await prisma.profile.create({
    data: {
      name: 'Cat',
      surname: 'McCatson',
      userId: newUser.id
    }
  })

  const firstGame = await prisma.game.create({
    data: {
      authorId: firstProfile.id,
      title: 'Dawn of Cats'
    }
  })

  const updateFirstProfile = await prisma.profile.update({
    where: {
      id: firstProfile.id
    },
    data: {
      authorGameId: firstGame.id
    }
  })

  const secondUser = await prisma.user.create({
    data: {
      email: 'email@email.com',
      password: passHash
    }
  })

  const otherProfile = await prisma.profile.create({
    data: {
      userId: secondUser.id,
      gameId: firstGame.id,
      name: 'Sr. Dog',
      surname: 'Bone',
      image: 'https://images.unsplash.com/photo-1599586477491-f86db60c0c1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
    }
  })

  const profile = await prisma.profile.create({
    data: {
      userId: newUser.id,
      gameId: firstGame.id,
      name: 'Sr. Cat',
      surname: 'Wilson',
      image: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
      roles: {
        create: [
          {
            gameId: firstGame.id,
            title: 'It\'s always sunny in CatLand',
            content: 'I woke up near my bowl of food as usual, with still one paw in it. Opening my eyes I found that damn dog staring at me.',
            events: {
              create: [
                {
                  profileId: otherProfile.id,
                  content: 'Always the same with you, you can\'t help youself. *I\'ve commented with a poor attitude*'
                }
              ]
            }
          },
          {
            gameId: firstGame.id,
            title: 'Another one bites my tail',
            content: 'I was minding my own business, laid on the couch like always, when, all of a sudden, an incredible pain spiraled through my spine. That damn dog has done it again!',
            events: {
              create: [
                {
                  profileId: otherProfile.id,
                  content: 'What? What have I done? I\'ve done nothing!'
                }
              ]
            }
          }
        ]
      }
    },
    include: {
      roles: true
    }
  })

  console.log(newUser, profile, firstProfile, firstGame)
}

seed().catch(async (error) => {
  console.error(error)
  await prisma.$disconnect()
  process.exit(1)
})
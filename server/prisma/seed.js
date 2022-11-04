import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function seed() {
  const passHash = await bcrypt.hash("123", 8);

  const users = [];
  const profiles = [];
  const games = [];
  const roles = [];
  const profileImages = [
    "https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2944&q=80",
    "https://images.unsplash.com/photo-1484406566174-9da000fda645?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80",
    "https://images.unsplash.com/photo-1555169062-013468b47731?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2712&q=80",
    "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
    
  ];

  for (let i = 0; i < 2; i++) {
    const user = await prisma.user.create({
      data: {
        email: `test${i}@test.com`,
        password: passHash,
      },
      include: {
        profile: true
      }
    });

    users.push(user);
  }

  const firstProfile = await prisma.profile.create({
    data: {
      userId: users[0].id,
      name:'Lorem 1',
      surname:'Ipsum',
      image: profileImages[0]
    }
  })

  const secondProfile = await prisma.profile.create({
    data: {
      userId: users[0].id,
      name:'Lorem 2',
      surname:'Ipsum',
      image: profileImages[1]
    }
  })

  const thirdProfile = await prisma.profile.create({
    data: {
      userId: users[1].id,
      name:'Lorem 3',
      surname:'Ipsum',
      image: profileImages[2]
    }
  })

  const fourthProfile = await prisma.profile.create({
    data: {
      userId: users[1].id,
      name:'Lorem 4',
      surname:'Ipsum',
      image: profileImages[3]
    }
  })

  profiles.push(firstProfile, secondProfile, thirdProfile, fourthProfile)

  const game1 = await prisma.game.create({
    data: {
      authorId: firstProfile.id,
      title: 'Once Upon a Cat'
    }
  })

  const game2 = await prisma.game.create({
    data: {
      authorId: thirdProfile.id,
      title: 'Dawn of Dogs'
    }
  })

  games.push(game1, game2)

  const firstRole = await prisma.role.create({
    data: {
      authorId: firstProfile.id,
      gameId: game1.id,
      title: 'Damn Mice',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisi quis eleifend quam adipiscing vitae. Adipiscing diam donec adipiscing tristique.',
      events: {
        create: [
          {
            profileId: fourthProfile.id,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras pulvinar mattis nunc sed blandit libero volutpat sed.'
          },
          {
            profileId: firstProfile.id,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          }
        ]
      }
    },
    include: {
      events: true
    }
  })

  const secondRole = await prisma.role.create({
    data: {
      authorId: secondProfile.id,
      gameId: game2.id,
      title: 'What a beautiful day to walk!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisi quis eleifend quam adipiscing vitae. Adipiscing diam donec adipiscing tristique.',
      events: {
        create: [
          {
            profileId: thirdProfile.id,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras pulvinar mattis nunc sed blandit libero volutpat sed.'
          },
          {
            profileId: secondProfile.id,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          }
        ]
      }
    },
    include: {
      events: true
    }
  })

  roles.push(firstRole, secondRole)

  const updatedAuthor0 = await prisma.profile.update({
    where: {
      id: firstProfile.id
    },
    data: {
      authorGameId: game1.id
    }
  }) 
  const index = profiles.indexOf(firstProfile)
  profiles.splice(index, 1, updatedAuthor0)

  const updatedAuthor2 = await prisma.profile.update({
    where: {
      id: thirdProfile.id
    },
    data: {
      authorGameId: game2.id
    }
  }) 
  const index2 = profiles.indexOf(thirdProfile)
  profiles.splice(index2, 1, updatedAuthor2)

  const updateGameId1 = await prisma.profile.update({
    where: {
      id: fourthProfile.id
    },
    data: {
      gameId: game1.id
    }
  })
  const index3 = profiles.indexOf(fourthProfile)
  profiles.splice(index3, 1, updateGameId1)

  const updateGameId3 = await prisma.profile.update({
    where: {
      id: secondProfile.id
    },
    data: {
      gameId: game2.id
    }
  })
  const index4 = profiles.indexOf(secondProfile)
  profiles.splice(index4, 1, updateGameId3)

  console.log(users, profiles, games, roles)
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});

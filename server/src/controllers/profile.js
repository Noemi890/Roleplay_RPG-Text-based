import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const createProfile = async (req, res) => {
  const { name, surname, image, age, race, biography } = req.body.profile
  const userId = req.body.user.id
  

  if (!name || !surname) {
    return res.status(400).json({
      error: 'Missing information in the request'
    })
  }

  if (!userId) {
    return res.status(400).json({
      error: 'Profile must be linked to a User'
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    include: {
      profile: true
    }
  })

  if (!user) {
    return res.status(404).json({
      error: "User not found"
    })
  }
  
  try {

    const createdProfile = await prisma.profile.create({
      data: {
        userId,
        name, 
        surname,
        image, 
        age, 
        race, 
        biography
      }
    })

    return res.status(201).json({
      createdProfile,
      user,
      message: "profile created successfully"
    })

  }
  catch (e) {
    return res.status(500).json({
      error: e
    })
  }
}

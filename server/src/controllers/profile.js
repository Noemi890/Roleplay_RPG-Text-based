import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const createProfile = async (req, res) => {
  const { name, surname, image, age, race, biography } = req.body.profile
  const userId = req.body.user

  if (!name || !surname) {
    return res.status(400).json({
      error: 'Missing name/surname in the request'
    })
  }

  if (!userId) {
    return res.status(400).json({
      error: 'Profile must be linked to a User'
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
      message: "profile created successfully"
    })

  }
  catch (e) {
    return res.status(e.status).json({
      error: e
    })
  }
}

export const getAll = async(req, res) => {
  const userId = req.user.id

  if (!userId) {
    return res.status(400).json({
      error: 'Invalid ID'
    })
  }

  try { 
    const profiles = await prisma.profile.findMany({
      where: {
        userId
      }
    })

    return res.json({
      profiles
    })
  }
  catch (error) {
    return res.status(500).json({
      error: "Something went wrong"
    })
  }
}
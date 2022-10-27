import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getGame = async (req, res) => {
  const id = Number(req.params.id)
  
  if (!id) {
    return res.status(400).json({
      error: 'ID not valid'
    })
  }

  try {

    const gameFound = await prisma.game.findUnique({
      where: {
        id
      },
      include: {
        profiles: true,
        roles: {
          include: {
            events: {
              include: {
                profile: true
              }
            }
          }
        }
      }
    })

    if (!gameFound) {
      return res.status(404).json({
        error: "Game not found"
      })
    }

    return res.status(200).json({
      game: gameFound
    })
  }
  catch (e) {
    return res.status(500).json({
      error: 'Something went wrong'
    })
  }
}

export const createGame = async (req, res) => {
  const { profileId } = req.body
  const { title, story } = req.body.newGame

  if (!title || !story) {
    return res.status(400).json({
      error: 'Missing arguments'
    })
  }

  const foundProfile = await prisma.profile.findUnique({
    where: {
      id: profileId
    }
  })

  if (!foundProfile) {
    return res.status(404).json({
      error: 'Profile not found'
    })
  }

  try {
    const createdGame = await prisma.game.create({
      data: {
        authorId: foundProfile.id,
        title,
        story
      },
      include: {
        author: true,
        profiles: true,
        roles: {
          include: {
            events: {
              include: {
                profiles: true
              }
            }
          }
        }
      }
    })

    return res.status(201).json({
      createdGame
    })
  }
  catch (e) {
    return res.status(500).json({
      error: 'Unable to process request'
    })
  }
}

export const updateGamePartecipants = async (req, res) => {
  const profileId = req.body.partecipant.id
  const id = Number(req.params.id)

  if (!profileId || !id) {
    return res.status(400).json({
      error: 'Missing informations'
    })
  }

  try {

    const updatedGame = await prisma.game.update({
      where: {
        id
      },
      data: {
        profiles: {
          connect: [
            {id: profileId}
          ]
        }
      },
      include: {
        profiles: true
      }
    })

    return res.status(200).json({
      updatedGame
    })
  }
  catch (e) {
    return res.status(500).json({
      error: 'Something went wrong'
    })
  }
}
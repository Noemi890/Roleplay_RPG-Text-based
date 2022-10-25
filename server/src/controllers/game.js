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
        roles: {
          include: {
            events: true
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
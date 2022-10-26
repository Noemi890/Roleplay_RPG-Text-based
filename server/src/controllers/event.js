import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const createEvent = async (req, res) => {
  const { answer, profileId, roleId } = req.body

  if (!answer || !profileId || !roleId) {
    return res.status(400).json({
      error: 'Missing params'
    })
  }

  try {
    const createdEvent = await prisma.event.create({
      data: {
        roleId,
        profileId,
        content: answer
      }
    })

    return res.status(200).json({
      createdEvent
    })
  }
  catch (e) {
    return res.status(500).json({
      error: 'Unable to process request'
    })
  }
}
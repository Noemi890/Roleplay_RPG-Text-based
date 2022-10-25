import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const createRole = async (req, res) => {
  const { profileId, gameId, title, content } = req.body

  if (!profileId || !gameId || !title || !content) {
    return res.status(400).json({
      message: 'Missing information in the request'
    })
  }

  try {

    const createdRole = await prisma.role.create({
      data: {
        gameId,
        title,
        content,
        profile: {
          connect: {
            id: profileId
          }
        }
      }
    })

    return res.status(201).json({ 
      message: "Role created successfully",
      role: createdRole 
    })
  }
  catch (e) {
    return res.status(500).json({
      message: "Unable to process the request"
    })
  }
}
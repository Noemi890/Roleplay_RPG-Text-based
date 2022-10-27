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
        authorId: profileId
        }
      }
    )

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

export const getAll = async (req, res) => {
  const gameId = Number(req.params.id)

  if (!gameId) {
    return res.status(401).json({
      error: 'Missing params'
    })
  }

  try {
    const roles = await prisma.role.findMany({
      where: {
        gameId
      },
      include: {
        profile: true,
        author: true,
        events: {
          include: {
            profile: true
          }
        }
      }
    })
    
    if(!roles) {
      return res.status(401).json({
        error: 'Roles not found'
      })
    }

    return res.status(200).json({
      roles
    })
  }
  catch (error) {
    return res.status(500).json({
      error: 'Something went wrong'
    })
  }
}

export const getRole = async (req, res) => {
  const id = Number(req.params.id)

  if (!id) {
    return res.status(401).json({
      error: 'Missing params'
    })
  }

  try {
    const role = await prisma.role.findUnique({
      where: {
        id
      },
      include: {
        author: true,
        events: {
          include: {
            profile: true
          }
        }
      }
    })

    if (!role) {
      return res.status(404).json({
        error: 'Role not found'
      })
    }

    return res.json({
      role
    })
  }
  catch (e) {
    return res.status(500).json({
      error: 'Something went wrong'
    })
  }
}

export const deleteRoleById = async (req, res) => {
  const id = Number(req.params.id)

  if (!id) {
    return res.status(400).json({
      error: 'Missing role information'
    })
  }

  try {

    const deletedRole = await prisma.role.delete({
      where: {
        id
      }
    })

    res.status(200).json({
      message: 'Role Deleted'
    })
  }
  catch (e) {
    return res.status(500).json({
      error: 'Something went wrong'
    })
  }
}
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email or Password not provided",
    });
  }

  const passHash = await bcrypt.hash(password, 8);

  const foundUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (foundUser) {
    return res.status(409).json({
      error: "Email already in use",
    });
  }

  try {
    const createdUser = await prisma.user.create({
      data: {
        email,
        password: passHash,
      },
    });

    return res.status(201).json({
      createdUser,
      message: "Success. You can now login",
    });
  } catch (e) {
    res.status(500).json({
      error: "Cannot create User",
    });
  }
};

export const getUserById = async (req, res) => {
  const id = req.user.id;

  try {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      profile: {
        include: {
          game: {
            include: {
              roles: {
                include: {
                  events: {
                    include: {
                      profile: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return res.json({
    user,
  });
  }
  catch (e) {
    return res.status(500).json({
      error: "something went wrong"
    })
  }
};

export const getAllProfiles = async (req, res) => {
  const userId = Number(req.params.id);

  if (!userId) {
    return res.status(400).json({
      error: "Invalid ID",
    });
  }

  try {
    const profiles = await prisma.profile.findMany({
      where: {
        userId,
      },
    });

    return res.json({
      profiles,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProfile = async (req, res) => {
  const { name, surname, image, age, race, biography } = req.body.profile;
  const userId = req.body.user.id;

  if (!name || !surname) {
    return res.status(400).json({
      error: "Missing information in the request",
    });
  }

  if (!userId) {
    return res.status(400).json({
      error: "Profile must be linked to a User",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      profile: true,
    },
  });

  if (!user) {
    return res.status(404).json({
      error: "User not found",
    });
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
        biography,
      },
    });

    return res.status(201).json({
      createdProfile,
      user,
      message: "profile created successfully",
    });
  } catch (e) {
    return res.status(500).json({
      error: e,
    });
  }
};

export const getProfileById = async (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(401).json({
      error: "Missing params",
    });
  }

  try {
    const profile = await prisma.profile.findUnique({
      where: {
        id,
      },
      include: {
        game: true,
        roles: true,
        events: true,
      },
    });

    if (!profile) {
      return res.status(404).json({
        error: "Profile not found",
      });
    }

    return res.status(200).json({
      profile,
    });
  } catch (error) {}
};

export const updateGameId = async (req, res) => {
  const id = Number(req.params.id);
  const { gameId } = req.body;

  if (!id || !gameId) {
    return res.status(400).json({
      error: "Missing params",
    });
  }

  try {
    const updatedProfile = await prisma.profile.update({
      where: {
        id,
      },
      data: {
        gameId,
      },
    });

    return res.status(200).json({
      updatedProfile,
    });
  } catch (e) {
    return res.status(500).json({
      error: "Unable to process request",
    });
  }
};

export const getAllPlatformProfiles = async (req, res) => {

  try {

  const profiles = await prisma.profile.findMany({
    where: {
      AND: [
        {
          gameId: null
        },
        {
          authorGameId: null
        }
      ]
    },
  });

  return res.status(200).json({
    profiles,
  });

  } catch (e) {
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

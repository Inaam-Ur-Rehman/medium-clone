"use server";

import prisma from "@/utils/prisma";

export const createUser = async (user) => {
  try {
    const res = await prisma.user.create({
      data: user,
    });

    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (id, user) => {
  try {
    const res = await prisma.user.update({
      where: { clerkId: id },
      data: user,
    });

    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await prisma.user.delete({
      where: { clerkId: id },
    });

    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async (id) => {
  try {
    const res = await prisma.user.findUnique({
      where: { clerkId: id },
    });

    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (id, profile) => {
  try {
    console.log(id, profile);
    const res = await prisma.user.update({
      where: { clerkId: id },
      data: {
        webiste: profile.website,
        bio: profile.bio,
      },
    });

    return JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.log(error);
  }
};

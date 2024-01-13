"use server";
import prisma from "@/utils/prisma";

export const getAllCategories = async () => {
  try {
    const data = await prisma.category.findMany();
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

import { Prisma, User } from "@prisma/client";
import { prisma } from "../../../db";

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
  const createdUser = await prisma.user.create({
    data: payload,
  });
  console.log("create user!!");
  return createdUser;
};

const getAllUsers = async () => {
  const allUsers = await prisma.user.findMany(
    {
      select: {
        id: true,
        name: true,
        email: true,
        picture: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      }
    }
  )
  return allUsers
}



export const UserServices = {
  createUser,
  getAllUsers
};

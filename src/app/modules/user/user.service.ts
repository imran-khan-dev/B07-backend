import httpStatus from 'http-status-codes';
import { Prisma, User } from "@prisma/client";
import { prisma } from "../../../db";
import AppError from "../../errorHelpers/AppError";

// const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
//   const createdUser = await prisma.user.create({
//     data: payload,
//   });
//   console.log("create user!!");
//   return createdUser;
// };

// const getAllUsers = async () => {
//   const result = await prisma.user.findMany(
//     {
//       select: {
//         id: true,
//         name: true,
//         email: true,
//         picture: true,
//         role: true,
//         createdAt: true,
//         updatedAt: true,
//         Blog: true,
//       },
//       orderBy: {
//         createdAt: "desc"
//       }
//     }
//   )
//   return result
// }

const getUserById = async (userId: number) => {

  const user = await prisma.user.findUnique(
    {
      where: {
        id: userId
      }
    }
  )

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }


  const result = await prisma.user.findUnique(
    {
      where: {
        id: userId
      },
      select: {
        id: true,
        name: true,
        email: true,
        picture: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        blogs: true,
      }
    }
  )
  return result
}


// const updateUserById = async (userId: number, payload: Partial<Prisma.UserCreateInput>) => {
//   const user = await prisma.user.findUnique(
//     {
//       where: {
//         id: userId
//       }
//     }
//   )

//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, "User not found");
//   }

//   const updatedUser = await prisma.user.update({
//     where: {
//       email: user.email,
//     },
//     data: payload
//   })

//   return updatedUser
// }

// const deleteuserById = async (userId: number) => {

//   const user = await prisma.user.findUnique(
//     {
//       where: {
//         id: userId
//       }
//     }
//   )

//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, "User not found");
//   }

//   const deletedUser = await prisma.user.delete({
//     where: {
//       id: userId,
//     },
//   })
//   return deletedUser
// }

export const UserServices = {
  // createUser,
  // getAllUsers,
  getUserById,
  // updateUserById,
  // deleteuserById
};

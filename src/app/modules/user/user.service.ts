import bcryptjs from 'bcryptjs';
import httpStatus from 'http-status-codes';
import { Prisma, User } from "@prisma/client";
import { prisma } from "../../../db";
import AppError from "../../errorHelpers/AppError";
import { envVars } from '../../config/env';

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {



  const { email, passwordHash, ...rest } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  // if (isUserExist) {
  //   throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist");
  // }

  const hashedPassword = await bcryptjs.hash(
    passwordHash as string,
    Number(envVars.BCRYPT_SALT_ROUND)
  );

  const createdUser = await prisma.user.create(
    {
      data: {
        email: email,
        passwordHash: hashedPassword,
        ...rest
      }
    }
  );


  return createdUser;
};

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
  createUser,
  // getAllUsers,
  getUserById,
  // updateUserById,
  // deleteuserById
};

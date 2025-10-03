import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";


const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.createUser(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Created Successfully",
      data: result,
    });
  }
);

// const getAllUsers = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const result = await UserServices.getAllUsers();
//     sendResponse(res, {
//       success: true,
//       statusCode: httpStatus.OK,
//       message: "Users Reterived Successfully",
//       data: result,
//     });
//   }
// );

const getUserById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const userId = Number(req.params.id)

    const result = await UserServices.getUserById(userId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Reterived Successfully",
      data: result,
    });
  }
)

// const updateUserById = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {

//     const userId = Number(req.params.id)
//     const payload = req.body

//     const result = await UserServices.updateUserById(userId, payload);
//     sendResponse(res, {
//       success: true,
//       statusCode: httpStatus.OK,
//       message: "User Updated Successfully",
//       data: result,
//     });
//   }
// )

// const deleteUserById = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {

//     const userId = Number(req.params.id)

//     const result = await UserServices.deleteuserById(userId);
//     sendResponse(res, {
//       success: true,
//       statusCode: httpStatus.OK,
//       message: "User Deleted Successfully",
//       data: result,
//     });
//   }
// )

export const UserController = {
  createUser,
  // getAllUsers,
  getUserById,
  // updateUserById,
  // deleteUserById
};

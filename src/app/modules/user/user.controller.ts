import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
// const createUser = async (req: Request, res: Response) => {
//   try {
//     const result = await UserService.createUser();
//   } catch (error) {
//     console.log(error);
//   }
// };

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Created Successfully",
      data: user,
    });
  }
);

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.getAllUsers();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Users Reterived Successfully",
      data: user,
    });
  }
);

export const UserController = {
  createUser,
  getAllUsers
};

import httpStatus from 'http-status-codes';
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { NextFunction, Request, Response } from "express";
import { BlogServices } from "./blog.service";



const createBlog = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const payload = req.body

        const result = await BlogServices.createBlog(payload);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Blog Created Successfully",
            data: result,
        });
    }
)


export const BlogControllers = {
    createBlog
}
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

const updateBlog = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const payload = req.body
        const blogId = Number(req.params.id)

        const result = await BlogServices.updateBlog(blogId, payload);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Blog Updated Successfully",
            data: result,
        });
    }
)

const getAllBlogs = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const result = await BlogServices.getAllBlogs();
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "All Blogs Retrived Successfully",
            data: result,
        });
    }
)

const deleteBlog = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const blogId = Number(req.params.id)

        const result = await BlogServices.deleteBlog(blogId);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Blog Deleted Successfully",
            data: result,
        });
    }
)

export const BlogControllers = {
    createBlog,
    getAllBlogs,
    updateBlog,
    deleteBlog
}
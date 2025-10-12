import httpStatus from 'http-status-codes';
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { NextFunction, Request, Response } from "express";
import { BlogServices } from "./blog.service";
import { features } from 'process';


const createBlog = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const payload = {
            ...req.body,
            tags: req.body.tags ? JSON.parse(req.body.tags) : undefined,
            isFeatured: req.body.isFeatured ? JSON.parse(req.body.isFeatured) : undefined,
            authorId: Number(req.body.authorId),
            thumbnail: req.file?.path
        };

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

        const payload = {
            ...req.body,
            tags: req.body.tags ? JSON.parse(req.body.tags) : undefined,
            isFeatured: req.body.isFeatured ? JSON.parse(req.body.isFeatured) : undefined,
            thumbnail: req.file?.path
        };

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

const getBlogById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const blogId = Number(req.params.id)

        const result = await BlogServices.getBlogById(blogId);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Blog Retrived Successfully",
            data: result,
        });
    }
)

const getAllBlogs = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = (req.query.search as string) || "";
        const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" : undefined
        const tags = req.query.tags ? (req.query.tags as string).split(",") : []
        const result = await BlogServices.getAllBlogs({ page, limit, search, isFeatured, tags });

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "All Blogs Retrived Successfully",
            data: result,
        });
    }
)

const getBlogStats = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const stats = await BlogServices.getBlogStats();
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Blog Stats Retrived Successfully",
            data: stats,
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
    getBlogById,
    getBlogStats,
    updateBlog,
    deleteBlog
}
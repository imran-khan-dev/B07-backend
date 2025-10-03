import httpStatus from 'http-status-codes';
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { NextFunction, Request, Response } from "express";
import { ProjectServices } from './project.service';

const createProject = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const payload = req.body

        const result = await ProjectServices.createProject(payload);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Project Created Successfully",
            data: result,
        });
    }
)

const updateProject = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const payload = req.body

        const result = await ProjectServices.updateProject(payload);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Project Created Successfully",
            data: result,
        });
    }
)

export const ProjectController = {
    createProject
}
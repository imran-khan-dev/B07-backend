import httpStatus from 'http-status-codes';
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { NextFunction, Request, Response } from "express";
import { ProjectServices } from './project.service';

const createProject = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const payload = {
            ...req.body,
            features: req.body.features ? JSON.parse(req.body.features) : undefined,
            ownerId: Number(req.body.ownerId),
            thumbnail: req.file?.path
        };

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

        const payload = {
            ...req.body,
            features: req.body.features ? JSON.parse(req.body.features) : undefined,
            thumbnail: req.file?.path
        };

        const projectId = Number(req.params.id)

        const result = await ProjectServices.updateProject(projectId, payload);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Project Updated Successfully",
            data: result,
        });
    }
)

const getAllProjects = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const result = await ProjectServices.getAllProjects();
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Projects Retreived Successfully",
            data: result,
        });
    }
)

const getProjectStats = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const result = await ProjectServices.getProjectStats();
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Project Stats Retreived Successfully",
            data: result,
        });
    }
)

const deleteProject = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const result = await ProjectServices.deleteProject(Number(req.params.id));
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Project Deleted Successfully",
            data: result,
        });
    }
)

export const ProjectController = {
    createProject,
    updateProject,
    getAllProjects,
    getProjectStats,
    deleteProject,
}
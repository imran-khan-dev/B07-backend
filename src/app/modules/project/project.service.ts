import { Project, Prisma } from "@prisma/client";
import { prisma } from "../../../db";

const createProject = async (payload: Prisma.ProjectCreateInput): Promise<Project> => {
    console.log("Payload in createProject:", payload);

    const result = await prisma.project.create({
        data: payload
    })

    return result
}


const updateProject = async (projectId: number, payload: Partial<Prisma.ProjectCreateInput>): Promise<Project> => {
    const result = await prisma.project.update({
        where: {
            id: projectId
        },
        data: payload
    })
    return result
}

const getAllProjects = async () => {
    const result = await prisma.project.findMany({
        orderBy: {
            createdAt: "desc",
        },
    })
    return result
}

const getProjectStats = async () => {

    return await prisma.$transaction(async (tx) => {
        const aggregates = await tx.project.aggregate({
            _count: true,
            _sum: { views: true },
            _avg: { views: true },
            _max: { views: true },
            _min: { views: true }
        })

        return {
            totalProject: aggregates._count ?? 0,
            totalViews: aggregates._sum.views ?? 0,
            avgViews: aggregates._avg.views ?? 0,
            minViews: aggregates._min.views ?? 0,
            maxViews: aggregates._max.views ?? 0,
        }
    })
}

const deleteProject = async (projectId: number) => {
    const result = await prisma.project.delete({
        where: {
            id: projectId
        }
    })

    return result
}

export const ProjectServices = {
    createProject,
    updateProject,
    getAllProjects,
    getProjectStats,
    deleteProject
}
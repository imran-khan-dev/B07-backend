import { Project, Prisma } from "@prisma/client";
import { prisma } from "../../../db";

const createProject = async (payload: Prisma.ProjectCreateInput): Promise<Project> => {
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

const getAllProject = async () => {
    const result = await prisma.project.findMany()
    return result
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
    getAllProject,
    deleteProject
}
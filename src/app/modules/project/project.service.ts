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

const getAllProjects = async ({
    page = 1,
    limit = 10,
    search,
    features,
}: {
    page?: number;
    limit?: number;
    search?: string;
    features?: string[];
}) => {
    const skip = (page - 1) * limit;


    const where: any = {
        AND: [
            search && {
                OR: [
                    { title: { contains: search, mode: "insensitive" } },
                    { description: { contains: search, mode: "insensitive" } },
                ],
            },
            features && features.length > 0 && { features: { hasEvery: features } },
        ].filter(Boolean),
    };


    const result = await prisma.project.findMany({
        skip,
        take: limit,
        where,
        include: {
            owner: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });


    const total = await prisma.project.count({ where });

    return {
        data: result,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};


const getProjectStats = async () => {

    return await prisma.$transaction(async (tx) => {
        const aggregates = await tx.project.aggregate({
            _count: true
        })

        return {
            totalProject: aggregates._count ?? 0
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
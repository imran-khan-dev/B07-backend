import { prisma } from './../../../db';
import { Blog, Prisma } from '@prisma/client';


const createBlog = async (payload: Prisma.BlogCreateInput): Promise<Blog> => {
    const newBlog = await prisma.blog.create({
        data: payload
    })

    return newBlog
}

const updateBlog = async (blogId: number, payload: Partial<Prisma.BlogCreateInput>): Promise<Blog> => {
    const result = await prisma.blog.update({
        where: {
            id: blogId
        },
        data: payload
    })


    return result
}

const getAllBlogs = async () => {
    const allBlogs = prisma.blog.findMany({
        orderBy: {
            createdAt: "desc",
        },
    })


    return allBlogs
}

const getBlogStats = async () => {

    return await prisma.$transaction(async (tx) => {
        const aggregates = await tx.blog.aggregate({
            _count: true,
            _sum: { views: true },
            _avg: { views: true },
            _max: { views: true },
            _min: { views: true }
        })

        return {
             totalBlogs: aggregates._count ?? 0,
                totalViews: aggregates._sum.views ?? 0,
                avgViews: aggregates._avg.views ?? 0,
                minViews: aggregates._min.views ?? 0,
                maxViews: aggregates._max.views ?? 0,
        }
    })
}

const deleteBlog = async (blogId: number) => {
    const result = await prisma.blog.delete({
        where: {
            id: blogId
        }
    })
    return result
}

export const BlogServices = {
    createBlog,
    getAllBlogs,
    getBlogStats,
    updateBlog,
    deleteBlog
}
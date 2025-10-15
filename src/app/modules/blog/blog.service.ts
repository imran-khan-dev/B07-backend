import httpStatus from 'http-status-codes';
import AppError from '../../errorHelpers/AppError';
import { prisma } from './../../../db';
import { Blog, Prisma } from '@prisma/client';


const createBlog = async (payload: Prisma.BlogCreateInput): Promise<Blog> => {
    const newBlog = await prisma.blog.create({
        data: payload
    })

    return newBlog
}

const updateBlog = async (blogId: number, payload: Partial<Prisma.BlogCreateInput>): Promise<Blog> => {

    const blog = await prisma.blog.findUnique({
        where: {
            id: blogId
        },
    })

    if (!blog) {
        throw new AppError(httpStatus.BAD_REQUEST, "Blog not found!");
    }


    const result = await prisma.blog.update({
        where: {
            id: blogId
        },
        data: payload
    })


    return result
}

const getBlogById = async (blogId: number): Promise<Blog> => {
    const blog = await prisma.blog.findUnique({
        where: {
            id: blogId
        },
        include: {
            author: true
        },
    })

    if (!blog) {
        throw new AppError(httpStatus.BAD_REQUEST, "Blog not found!");
    }

    await prisma.blog.update({
        where: { id: blogId },
        data: { views: { increment: 1 } },
    });


    return { ...blog, views: blog.views + 1 };
}

const getAllBlogs = async ({
    page = 1,
    limit = 10,
    search,
    isFeatured,
    tags
}: {
    page?: number,
    limit?: number,
    search?: string,
    isFeatured?: boolean,
    tags?: string[]
}) => {
    const skip = (page - 1) * limit;

    const where: any = {
        AND: [
            search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { content: { contains: search, mode: 'insensitive' } }
                ]

            },
            typeof isFeatured === "boolean" && { isFeatured },
            (tags && tags.length > 0) && { tags: { hasEvery: tags } }
        ].filter(Boolean)
    }

    const result = await prisma.blog.findMany({
        skip,
        take: limit,
        where,
        include: {
            author: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const total = await prisma.blog.count({ where })

    return {
        data: result,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
};

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

    const blog = await prisma.blog.findUnique({
        where: {
            id: blogId
        },
    })

    if (!blog) {
        throw new AppError(httpStatus.BAD_REQUEST, "Blog not found!");
    }


    const result = await prisma.blog.delete({
        where: {
            id: blogId
        }
    })
    return result
}

export const BlogServices = {
    createBlog,
    getBlogById,
    getAllBlogs,
    getBlogStats,
    updateBlog,
    deleteBlog
}
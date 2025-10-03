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
    updateBlog,
    deleteBlog
}
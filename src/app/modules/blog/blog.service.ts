import { prisma } from './../../../db';
import { Blog, Prisma } from '@prisma/client';


const createBlog = async (payload: Prisma.BlogCreateInput): Promise<Blog> => {
    const newBlog = await prisma.blog.create({
        data: payload
    })

    return newBlog
}


export const BlogServices = {
    createBlog
}
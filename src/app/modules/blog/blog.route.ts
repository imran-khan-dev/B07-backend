import { Router } from "express";
import { BlogControllers } from "./blog.controller";

const router = Router()

router.post("/create-blog", BlogControllers.createBlog)


export const BlogRoutes = router
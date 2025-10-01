import { Router } from "express";
import { BlogControllers } from "./blog.controller";

const router = Router()

router.post("/create-blog", BlogControllers.createBlog)
router.get("/get-blogs", BlogControllers.getAllBlogs)
router.post("/:id", BlogControllers.updateBlog)


export const BlogRoutes = router
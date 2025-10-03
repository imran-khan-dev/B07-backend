import { Router } from "express";
import { BlogControllers } from "./blog.controller";

const router = Router()

router.post("/create-blog", BlogControllers.createBlog)
router.get("/get-blogs", BlogControllers.getAllBlogs)
router.patch("/:id", BlogControllers.updateBlog)
router.delete("/:id", BlogControllers.deleteBlog)


export const BlogRoutes = router
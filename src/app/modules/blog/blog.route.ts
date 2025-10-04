import { Router } from "express";
import { BlogControllers } from "./blog.controller";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router()

router.post("/create-blog", checkAuth("ADMIN"), BlogControllers.createBlog)
router.get("/get-blogs", checkAuth("ADMIN"), BlogControllers.getAllBlogs)
router.patch("/:id", checkAuth("ADMIN"), BlogControllers.updateBlog)
router.delete("/:id", checkAuth("ADMIN"), BlogControllers.deleteBlog)


export const BlogRoutes = router
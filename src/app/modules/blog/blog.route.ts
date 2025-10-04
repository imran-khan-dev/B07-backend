import { Router } from "express";
import { BlogControllers } from "./blog.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { multerUpload } from "../../config/multer.config";

const router = Router()

router.post("/create-blog", checkAuth("ADMIN"), multerUpload.single("file"), BlogControllers.createBlog)
router.get("/get-blogs", checkAuth("ADMIN"), BlogControllers.getAllBlogs)
router.patch("/:id", checkAuth("ADMIN"), multerUpload.single("file"), BlogControllers.updateBlog)
router.delete("/:id", checkAuth("ADMIN"), BlogControllers.deleteBlog)


export const BlogRoutes = router
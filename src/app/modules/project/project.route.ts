import { Router } from "express"
import { ProjectController } from "./project.controller"
import { checkAuth } from "../../middlewares/checkAuth"
import { multerUpload } from "../../config/multer.config"

const router = Router()

router.post("/create", checkAuth("ADMIN"), multerUpload.single("file"), ProjectController.createProject)
router.patch("/:id", checkAuth("ADMIN"), multerUpload.single("file"), ProjectController.updateProject)
router.get("/all-projects", ProjectController.getAllProjects)
router.get("/get-project-stats", checkAuth("ADMIN"), ProjectController.getProjectStats)
router.delete("/:id", checkAuth("ADMIN"), ProjectController.deleteProject)


export const ProjectRoutes = router
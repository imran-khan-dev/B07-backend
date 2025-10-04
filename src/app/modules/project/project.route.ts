import { Router } from "express"
import { ProjectController } from "./project.controller"
import { checkAuth } from "../../middlewares/checkAuth"

const router = Router()

router.post("/create", checkAuth("ADMIN"), ProjectController.createProject)
router.patch("/:id", checkAuth("ADMIN"), ProjectController.updateProject)
router.get("/all-projects", checkAuth("ADMIN"), ProjectController.getAllProjects)
router.delete("/:id", checkAuth("ADMIN"), ProjectController.deleteProject)


export const ProjectRoutes = router
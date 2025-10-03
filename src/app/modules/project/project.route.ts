import { Router } from "express"
import { ProjectController } from "./project.controller"

const router = Router()

router.post("/create", ProjectController.createProject)
router.patch("/:id", ProjectController.updateProject)
router.get("/all-projects", ProjectController.getAllProjects)
router.delete("/:id", ProjectController.deleteProject)
import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

// router.post("/create", UserController.createUser);
// router.get("/all-users", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
// router.patch("/:id", UserController.updateUserById);
// router.delete("/:id", UserController.deleteUserById);

export const UserRoutes = router;

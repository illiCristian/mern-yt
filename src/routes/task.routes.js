// 1 Hora : 20 Minutos
import { Router } from "express";
import { authRequired } from "../middleware/validateToken.js";
import TaskController from "../controllers/task.controller.js";

const taskController = new TaskController();
const router = Router();
router.get("/task", authRequired, taskController.getTasks);
router.get("/task/:id", authRequired, taskController.getTaskId);
router.post("/task", authRequired, taskController.createTask);
export default router;

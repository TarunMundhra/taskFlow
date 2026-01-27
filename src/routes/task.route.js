import {Router} from "express";
import { createTask, getOrderedTasks } from "../controllers/task.controller.js";

const router = Router();

router.use((req, res, next) => {
  console.log(`Incoming request to task route: ${req.method} ${req.url}`);
  next();
});

router.post("/", createTask);
router.get("/ordered", getOrderedTasks);

export default router;

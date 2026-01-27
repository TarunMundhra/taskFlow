import {Router} from "express";
import { addDependency } from "../controllers/dependency.controller.js";

const router = Router();

router.use((req, res, next) => {
  console.log(`Incoming request to dependency route: ${req.method} ${req.url}`);
  next();
});

router.post("/", addDependency);

export default router;

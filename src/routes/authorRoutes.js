import { Router } from "express";
import {
  getAuthorByIdController,
  getAuthorsController,
} from "../controllers/authorsController.js";

const router = Router();

router.get("/", getAuthorsController);

router.get("/:id", getAuthorByIdController);

export default router;

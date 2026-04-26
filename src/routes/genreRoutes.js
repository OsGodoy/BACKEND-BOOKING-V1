import { Router } from "express";
import {
  getGenreByIdController,
  getGenresController,
} from "../controllers/genresController.js";

const router = Router();

router.get("/", getGenresController);

router.get("/:id", getGenreByIdController);

export default router;

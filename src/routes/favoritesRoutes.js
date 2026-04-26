import express from "express";
import {
  getFavoritesController,
  addFavoriteController,
  removeFavoriteController,
} from "../controllers/favoritesController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, getFavoritesController);
router.post("/:bookId", authenticate, addFavoriteController);
router.delete("/:bookId", authenticate, removeFavoriteController);

export default router;

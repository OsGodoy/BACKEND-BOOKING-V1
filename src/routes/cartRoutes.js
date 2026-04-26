import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import {
  addCartController,
  clearCartController,
  getCartController,
  removeCartController,
  updateCartController,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", authenticate, getCartController);
router.post("/:bookId", authenticate, addCartController);
router.patch("/:bookId", authenticate, updateCartController);
router.delete("/:bookId", authenticate, removeCartController);
router.delete("/", authenticate, clearCartController);

export default router;

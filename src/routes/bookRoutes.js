import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest.js";
import {
  createBookSchema,
  updateBookSchema,
} from "../validators/bookValidator.js";
import {
  createBookController,
  deleteBookController,
  getBookByIdController,
  getBooksController,
  recoverBookController,
  updateBookController,
} from "../controllers/bookController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = Router();

router.get("/", getBooksController);

router.get("/:id", getBookByIdController);

// protegidas
router.use(authenticate, authorize(ROLES.ADMIN));

router.post("/create", validateRequest(createBookSchema), createBookController);

router.put(
  "/update/:id",
  validateRequest(updateBookSchema),
  updateBookController,
);

// soft delete
router.put("/:id", deleteBookController);

router.put("/recover/:id", recoverBookController);

export default router;

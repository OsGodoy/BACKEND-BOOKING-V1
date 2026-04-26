import { Router } from "express";
import {
  deleteUserController,
  loginController,
  logoutController,
  registerController,
  updateUserController,
  getUsersController,
  getUserByIdController,
  recoverUserController,
  getMeController,
  refreshTokenController,
} from "../controllers/authController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import {
  loginSchema,
  registerSchema,
  updateUserSchema,
} from "../validators/authValidator.js";
import {
  authenticate,
  authorize,
  isOwnerOrAdmin,
} from "../middlewares/authMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = Router();

router.post("/login", validateRequest(loginSchema), loginController);

// protegidas
router.use(authenticate);

router.post("/register", validateRequest(registerSchema), registerController);

router.post("/logout", logoutController);

router.post("/refresh", refreshTokenController);

router.get("/me", getMeController);

router.get("/:id", isOwnerOrAdmin("id"), getUserByIdController);

// soft delete
router.put("/:id", isOwnerOrAdmin("id"), deleteUserController);

router.put("/recover/:id", isOwnerOrAdmin("id"), recoverUserController);

router.put(
  "/update/:id",
  isOwnerOrAdmin("id"),
  validateRequest(updateUserSchema),
  updateUserController,
);

router.get("/", authorize(ROLES.ADMIN), getUsersController);

export default router;

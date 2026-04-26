import { Router } from "express";
import { getImageController } from "../controllers/imagesController.js";

const router = Router();

router.get("/", getImageController);

export default router;

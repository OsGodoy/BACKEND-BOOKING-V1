import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import authorRoutes from "./routes/authorRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";
import imagesRoutes from "./routes/imagesRoutes.js";
import favoritesRoutes from "./routes/favoritesRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

import { pgConnection, pool } from "./config/postgreDatabase.js";
// import {mongoConnection, closeMongo } from "./config/mongoDatabase.js";
import { handleErrors } from "./utils/handleErrors.js";
import {
  authLimiter,
  globalLimiter,
  imageLimiter,
} from "./utils/rateLimiter.js";
import { verifyTokenOptional } from "./middlewares/authMiddleware.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5001;

app.set("trust proxy", 1);

app.use(express.static("public"));

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.use(verifyTokenOptional);

app.use(globalLimiter);

app.use("/auth", authLimiter, authRoutes);

app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/genres", genreRoutes);

app.use("/image", imageLimiter, imagesRoutes);

app.use("/favorites", favoritesRoutes);

app.use("/cart", cartRoutes);

app.use(handleErrors);

await pgConnection();
// await mongoConnection();

const server = app.listen(PORT, () => {
  console.log(`SERVIDOR CORRIENDO EN EL PUERTO ${PORT}`);
});

let shuttingDown = false;

const shutdown = async (signal) => {
  if (shuttingDown) return;
  shuttingDown = true;

  console.log(`\nRecibido ${signal}. Cerrando aplicación...`);

  try {
    await new Promise((resolve) => server.close(resolve));
    console.log("Servidor HTTP cerrado");

    await pool.end();
    console.log("PostgreSQL cerrado");

    // await closeMongo();
    // console.log("MongoDB cerrado");

    console.log("Cierre limpio completado");
    process.exit(0);
  } catch (error) {
    console.error("Error durante el cierre:", error);
    process.exit(1);
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

process.on("uncaughtException", (err) => {
  console.error("uncaughtException:", err);
  shutdown("uncaughtException");
});

process.on("unhandledRejection", (reason) => {
  console.error("unhandledRejection:", reason);
  shutdown("unhandledRejection");
});

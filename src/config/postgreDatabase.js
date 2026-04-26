import pkg from "pg";

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL error", err);
});

export const pgConnection = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("CONECTADO A LA DB POSTGRESQL");
  } catch (error) {
    console.error("ERROR DE CONEXIÓN A POSTGRESQL:", error);
    process.exit(1);
  }
};
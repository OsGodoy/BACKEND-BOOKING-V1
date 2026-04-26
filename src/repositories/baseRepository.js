import { pool } from "../config/postgreDatabase.js";
import { AppError } from "../utils/AppError.js";

const allowedTables = ["books", "users", "authors", "genres", "favorites"];

const validateTable = (table) => {
  if (!allowedTables.includes(table)) {
    throw new AppError("No permitido", 404);
  }
};

export const softDeleteByTable = (table) => {
  validateTable(table);

  return async (id) => {
    const result = await pool.query(
      `UPDATE ${table}
       SET deleted_at = NOW()
       WHERE id = $1
       AND deleted_at IS NULL
       RETURNING *`,
      [id],
    );

    return result;
  };
};

export const recoverByTable = (table) => {
  validateTable(table);

  return async (id) => {
    const result = await pool.query(
      `UPDATE ${table}
       SET deleted_at = NULL
       WHERE id = $1
       AND deleted_at IS NOT NULL
       RETURNING *`,
      [id],
    );
    return result;
  };
};

export const getAll = (table) => {
  validateTable(table);

  return async () => {
    const result = await pool.query(
      `SELECT *
       FROM ${table}`,
    );

    return result;
  };
};

export const getById = (table) => {
  validateTable(table);

  return async (id) => {
    const result = await pool.query(
      `SELECT *
       FROM ${table}
       WHERE id = $1`,
      [id],
    );
    return result;
  };
};

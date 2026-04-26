import { pool } from "../config/postgreDatabase.js";

export const favoritesRepository = {
  add: async (userId, bookId) => {
    const query = `
      INSERT INTO favorites (user_id, book_id)
      VALUES ($1, $2)
      ON CONFLICT (user_id, book_id) DO NOTHING
      RETURNING *;
    `;

    const { rows } = await pool.query(query, [userId, bookId]);
    return rows[0];
  },

  remove: async (userId, bookId) => {
    const query = `
      DELETE FROM favorites
      WHERE user_id = $1 AND book_id = $2
      RETURNING *;
    `;

    const { rows } = await pool.query(query, [userId, bookId]);
    return rows[0];
  },

  findByUser: async (userId) => {
    const query = `
      SELECT 
        b.id,
        b.title,
        b.cover,
        b.price
      FROM favorites f
      JOIN books b ON b.id = f.book_id
      WHERE f.user_id = $1
      AND b.deleted_at IS NULL;
    `;

    const { rows } = await pool.query(query, [userId]);
    return rows;
  },

  exists: async (userId, bookId) => {
    const query = `
      SELECT 1
      FROM favorites
      WHERE user_id = $1 AND book_id = $2;
    `;

    const { rows } = await pool.query(query, [userId, bookId]);
    return rows.length > 0;
  },

  bookExists: async (bookId) => {
    const query = `
      SELECT 1
      FROM books
      WHERE id = $1 AND deleted_at IS NULL;
    `;

    const { rows } = await pool.query(query, [bookId]);
    return rows.length > 0;
  },
};

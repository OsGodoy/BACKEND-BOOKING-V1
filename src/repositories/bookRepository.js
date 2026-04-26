import { pool } from "../config/postgreDatabase.js";
import { recoverByTable, softDeleteByTable } from "./baseRepository.js";

export const createBook = async ({ title, price, stock, cover }) => {
  return await pool.query(
    `INSERT INTO books (title, price, stock, cover)
    VALUES ($1, $2, $3, $4)
    RETURNING title, price, stock, cover`,
    [title, price, stock, cover || null],
  );
};

export const updateBook = async ({
  title,
  price,
  stock,
  cover,
  details,
  id,
}) => {
  return await pool.query(
    `UPDATE books 
      SET 
        title = COALESCE($1, title),
        price = COALESCE($2, price),
        stock = COALESCE($3, stock),
        cover = COALESCE($4, cover),
        details = COALESCE($5, details),
     WHERE id = $6
     RETURNING title, price, stock, cover`,
    [title, price, stock, cover, details, id],
  );
};

export const deleteBook = softDeleteByTable("books");
export const recoverBook = recoverByTable("books");

export const getBookById = async (id) => {
  const {rows} = await pool.query(
    `
    SELECT 
      b.*,
      COALESCE(json_agg(DISTINCT a) FILTER (WHERE a.id IS NOT NULL), '[]') AS authors,
      COALESCE(json_agg(DISTINCT g) FILTER (WHERE g.id IS NOT NULL), '[]') AS genres
    FROM books b
    LEFT JOIN book_authors ba ON ba.id_book = b.id
    LEFT JOIN authors a ON a.id = ba.id_author
    LEFT JOIN book_genres bg ON bg.id_book = b.id
    LEFT JOIN genres g ON g.id = bg.id_genre
    WHERE b.id = $1 AND b.deleted_at IS NULL
    GROUP BY b.id;
    `,
    [id],
  );

  return rows[0];
};

export const getBooks = async ({ author, genre, search, ids } = {}) => {
  const values = [];
  const filters = [];

  let baseQuery = `
    SELECT 
      b.*,
      COALESCE(json_agg(DISTINCT a) FILTER (WHERE a.id IS NOT NULL), '[]') AS authors,
      COALESCE(json_agg(DISTINCT g) FILTER (WHERE g.id IS NOT NULL), '[]') AS genres
    FROM books b
    LEFT JOIN book_authors ba ON ba.id_book = b.id
    LEFT JOIN authors a ON a.id = ba.id_author
    LEFT JOIN book_genres bg ON bg.id_book = b.id
    LEFT JOIN genres g ON g.id = bg.id_genre
  `;

  filters.push(`b.deleted_at IS NULL`);

  if (ids && ids.length > 0) {
    filters.push(`b.id = ANY($${values.length + 1}::uuid[])`);
    values.push(ids);
  } else {
    if (author) {
      values.push(author);
      filters.push(`a.id = $${values.length}`);
    }

    if (genre) {
      values.push(genre);
      filters.push(`g.id = $${values.length}`);
    }

    if (search) {
      values.push(`%${search}%`);
      filters.push(`
        (
          unaccent(b.title) ILIKE unaccent($${values.length})
          OR unaccent(a.name) ILIKE unaccent($${values.length})
          OR unaccent(a.lastname) ILIKE unaccent($${values.length})
          OR unaccent(CONCAT(a.name, ' ', a.lastname)) ILIKE unaccent($${values.length})
          OR unaccent(g.name) ILIKE unaccent($${values.length})
        )
      `);
    }
  }

  const whereClause = `WHERE ${filters.join(" AND ")}`;

  let finalQuery = `
    ${baseQuery}
    ${whereClause}
    GROUP BY b.id
  `;

  if (ids && ids.length > 0) {
    finalQuery += ` ORDER BY array_position($1, b.id)`;
  }

  const { rows } = await pool.query(finalQuery, values);

  return rows;
};

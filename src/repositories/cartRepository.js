import { pool } from "../config/postgreDatabase.js";

export const findCartByUserId = async (userId) => {
  const { rows } = await pool.query(
    `SELECT * FROM carts WHERE user_id = $1 LIMIT 1`,
    [userId],
  );

  return rows[0];
};

export const createCart = async (userId) => {
  const { rows } = await pool.query(
    `INSERT INTO carts (user_id)
     VALUES ($1)
     RETURNING *`,
    [userId],
  );

  return rows[0];
};

export const getCartItems = async (cartId) => {
  const { rows } = await pool.query(
    `
    SELECT 
      ci.id,
      ci.book_id,
      ci.quantity,
      ci.price_snapshot,
      b.title,
      b.price AS current_price,
      b.stock
    FROM cart_items ci
    JOIN books b ON b.id = ci.book_id
    WHERE ci.cart_id = $1
    AND b.deleted_at IS NULL
    `,
    [cartId],
  );

  return rows;
};

export const findCartItem = async (cartId, bookId) => {
  const { rows } = await pool.query(
    `
    SELECT * FROM cart_items
    WHERE cart_id = $1 AND book_id = $2
    LIMIT 1
    `,
    [cartId, bookId],
  );

  return rows[0];
};

export const createCartItem = async ({
  cartId,
  bookId,
  quantity,
  priceSnapshot,
}) => {
  const { rows } = await pool.query(
    `
    INSERT INTO cart_items (cart_id, book_id, quantity, price_snapshot)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [cartId, bookId, quantity, priceSnapshot],
  );

  return rows[0];
};

export const updateCartItemQuantity = async (itemId, quantity) => {
  const { rows } = await pool.query(
    `
    UPDATE cart_items
    SET quantity = $1
    WHERE id = $2
    RETURNING *
    `,
    [quantity, itemId],
  );

  return rows[0];
};

export const deleteCartItem = async (itemId) => {
  await pool.query(`DELETE FROM cart_items WHERE id = $1`, [itemId]);
};

export const clearCartItems = async (cartId) => {
  await pool.query(`DELETE FROM cart_items WHERE cart_id = $1`, [cartId]);
};

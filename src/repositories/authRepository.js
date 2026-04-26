import { pool } from "../config/postgreDatabase.js";
import { AppError } from "../utils/AppError.js";
import { recoverByTable, softDeleteByTable } from "./baseRepository.js";

export const createUser = async ({ name, lastname, email, password }) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const userResult = await client.query(
      `INSERT INTO users (name, lastname, email, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, lastname, email`,
      [name, lastname, email, password],
    );

    const user = userResult.rows[0];

    await client.query(
      `INSERT INTO profiles (user_id)
       VALUES ($1)`,
      [user.id],
    );

    await client.query("COMMIT");

    return user;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const updateUser = async ({ name, lastname, id }) => {
  return await pool.query(
    `UPDATE users 
     SET name = $1, lastname = $2
     WHERE id = $3 AND deleted_at IS NULL
     RETURNING name, lastname`,
    [name, lastname, id],
  );
};

export const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1 AND deleted_at IS NULL",
    [email],
  );

  return result.rows[0];
};

export const deleteUser = softDeleteByTable("users");

export const recoverUser = recoverByTable("users");

export const getUsers = async () => {
  const result = await pool.query(`
    SELECT 
      u.id,
      u.name,
      u.lastname,
      u.email,
      u.created_at,
      CASE 
        WHEN p.id IS NOT NULL THEN row_to_json(p)
        ELSE NULL
      END AS profile
    FROM users u
    LEFT JOIN profiles p ON p.user_id = u.id
    WHERE u.deleted_at IS NULL;
  `);

  return result;
};

export const getUserById = async (id) => {
  const result = await pool.query(
    `
    SELECT 
      u.id,
      u.name,
      u.lastname,
      u.email,
      u.created_at,
      CASE 
        WHEN p.id IS NOT NULL THEN row_to_json(p)
        ELSE NULL
      END AS profile
    FROM users u
    LEFT JOIN profiles p ON p.user_id = u.id
    WHERE u.id = $1 AND u.deleted_at IS NULL;
  `,
    [id],
  );

  return result;
};

export const getUserRoles = async (userId) => {
  const result = await pool.query(
    `SELECT r.name
     FROM roles r
     JOIN user_roles ur ON ur.role_id = r.id
     WHERE ur.user_id = $1`,
    [userId],
  );

  return result.rows.map((r) => r.name);
};

export const assignRoleToUser = async (userId, roleName) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const roleResult = await client.query(
      `SELECT id FROM roles WHERE name = $1`,
      [roleName],
    );

    if (roleResult.rowCount === 0) {
      throw new AppError("Rol no encontrado", 404);
    }

    const roleId = roleResult.rows[0].id;

    await client.query(
      `INSERT INTO user_roles (user_id, role_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, role_id) DO NOTHING`,
      [userId, roleId],
    );

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

import {
  findUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  getUserRoles,
  assignRoleToUser,
  getUsers,
  getUserById,
  recoverUser,
} from "../repositories/authRepository.js";
import bcrypt from "bcrypt";
import { signAccessToken, signRefreshToken } from "../utils/handleTokens.js";
import { AppError } from "../utils/AppError.js";
import jwt from "jsonwebtoken";

export const registerService = async ({ name, lastname, email, password }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
      name,
      lastname,
      email,
      password: hashedPassword,
    });

    // asignar rol por defecto
    await assignRoleToUser(user.id, "user");

    const roles = await getUserRoles(user.id);

    const safeUser = {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      roles,
    };

    const accessToken = signAccessToken({
      id: user.id,
      roles,
    });

    const refreshToken = signRefreshToken(user.id);

    return {
      user: safeUser,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    if (error.code === "23505") {
      throw new AppError("El usuario ya existe", 409);
    }
    throw error;
  }
};

export const loginService = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError("Correo o contraseña incorrectos", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    throw new AppError("Correo o contraseña incorrectos", 401);
  }

  const roles = await getUserRoles(user.id);

  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    roles,
  };

  const accessToken = signAccessToken({
    id: user.id,
    roles,
  });

  const refreshToken = signRefreshToken(user.id);

  return {
    user: safeUser,
    accessToken,
    refreshToken,
  };
};

export const updateUserService = async ({ name, lastname, id }) => {
  const result = await updateUser({ name, lastname, id });

  if (result.rowCount === 0) {
    throw new AppError("El usuario no existe", 404);
  }

  return result.rows[0];
};

// soft delete
export const deleteUserService = async (id) => {
  const result = await deleteUser(id);

  return result.rows;
};

// recover
export const recoverUserService = async (id) => {
  const result = await recoverUser(id);

  if (result.rowCount === 0) {
    throw new AppError(
      "El usuario no existe o ya se encuentra en la lista",
      404,
    );
  }

  return result.rows[0];
};

export const getUsersService = async () => {
  const result = await getUsers();

  if (result.rows.length === 0) {
    throw new AppError("No hay usuarios", 404);
  }

  return result.rows;
};

export const getUserByIdService = async (id) => {
  const result = await getUserById(id);

  if (result.rows.length === 0) {
    throw new AppError("Usuario no encontrado", 404);
  }

  return result.rows[0];
};

export const getMeService = async (userId) => {
  const result = await getUserById(userId);

  if (result.rows.length === 0) {
    throw new AppError("Usuario no encontrado", 404);
  }

  return result.rows[0];
};

export const refreshTokenService = async (refreshToken) => {
  if (!refreshToken) {
    throw new AppError("No refresh token", 401);
  }

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  const roles = await getUserRoles(decoded.id);

  const accessToken = signAccessToken({
    id: decoded.id,
    roles,
  });

  return { accessToken };
};

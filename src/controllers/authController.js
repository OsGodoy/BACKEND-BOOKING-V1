import {
  deleteUserService,
  getMeService,
  getUserByIdService,
  getUsersService,
  loginService,
  recoverUserService,
  refreshTokenService,
  registerService,
  updateUserService,
} from "../services/authService.js";
import { setAccessCookie, setRefreshCookie } from "../utils/handleCookies.js";

export const registerController = async (req, res, next) => {
  try {
    const result = await registerService(req.validated.body);

    setAccessCookie(res, result.accessToken);
    setRefreshCookie(res, result.refreshToken);

    return res.status(201).json({
      message: "Cuenta creada correctamente",
      data: result.user,
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const result = await loginService(req.validated.body);

    setAccessCookie(res, result.accessToken);
    setRefreshCookie(res, result.refreshToken);

    return res.status(200).json({
      message: "Sesión iniciada",
      data: result.user,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutController = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "lax",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "lax",
  });

  return res.status(200).json({
    message: "Sesión cerrada correctamente",
    data: null,
  });
};

export const updateUserController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await updateUserService({ ...req.validated.body, id });

    return res.status(200).json({
      message: "Modificación realizada correctamente",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserController = async (req, res, next) => {
  try {
    const { id } = req.params;

    await deleteUserService(id);

    return res.status(200).json({
      message: "Perfil eliminado correctamente",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const recoverUserController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await recoverUserService(id);

    res.status(200).json({
      message: "Usuario recuperado con éxito",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getUsersController = async (req, res, next) => {
  try {
    const users = await getUsersService();

    res.status(200).json({
      message: "Usuarios obtenidos correctamente",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await getUserByIdService(id);

    res.status(200).json({
      message: "Usuario obtenido correctamente",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getMeController = async (req, res, next) => {
  try {
    const user = await getMeService(req.user.id);

    res.status(200).json({
      message: "Usuario obtenido correctamente",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshTokenController = async (req, res, next) => {
  try {
    const { accessToken } = await refreshTokenService(req.cookies.refreshToken);

    setAccessCookie(res, accessToken);

    res.status(200).json({
      message: "Token refrescado correctamente",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

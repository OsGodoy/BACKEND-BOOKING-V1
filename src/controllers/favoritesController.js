import { favoritesService } from "../services/favoritesService.js";

export const getFavoritesController = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const favorites = await favoritesService.getFavorites(userId);

    res.status(200).json({
      message: "Favoritos obtenidos correctamente",
      data: favorites,
    });
  } catch (error) {
    next(error);
  }
};

export const addFavoriteController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.params;

    const result = await favoritesService.addFavorite(userId, bookId);

    res.status(201).json({
      message: "Favorito agregado",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const removeFavoriteController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.params;

    const result = await favoritesService.removeFavorite(userId, bookId);

    res.status(200).json({
      message: "Favorito eliminado",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
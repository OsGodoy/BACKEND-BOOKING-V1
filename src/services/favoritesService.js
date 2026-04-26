import { favoritesRepository } from "../repositories/favoritesRepository.js";
import { AppError } from "../utils/AppError.js";

export const favoritesService = {
  addFavorite: async (userId, bookId) => {
    if (!bookId) {
      throw new AppError("bookId requerido", 400);
    }

    const bookExists = await favoritesRepository.bookExists(bookId);
    if (!bookExists) {
      throw new AppError("El libro no existe", 404);
    }

    const alreadyExists = await favoritesRepository.exists(userId, bookId);

    if (alreadyExists) {
      throw new AppError("Ya está en favoritos", 409);
    }

    await favoritesRepository.add(userId, bookId);

    return { message: "Agregado a favoritos" };
  },

  removeFavorite: async (userId, bookId) => {
    if (!bookId) {
      throw new AppError("bookId requerido", 400);
    }

    const deleted = await favoritesRepository.remove(userId, bookId);

    if (!deleted) {
      throw new AppError("El favorito no existe", 404);
    }

    return { message: "Eliminado de favoritos" };
  },

  getFavorites: async (userId) => {
    return await favoritesRepository.findByUser(userId);
  },
};

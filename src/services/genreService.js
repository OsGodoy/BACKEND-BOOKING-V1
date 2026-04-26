import { getGenreById, getGenres } from "../repositories/genreRepository.js";

export const getGenresService = async () => {
  const result = await getGenres();

  if (result.rows.length === 0) {
    throw new AppError("No hay géneros", 404);
  }

  return result.rows;
};

export const getGenreByIdService = async (id) => {
  const result = await getGenreById(id);

  if (result.rows.length === 0) {
    throw new AppError("Género no encontrado", 404);
  }

  return result.rows[0];
};

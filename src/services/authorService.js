import { getAuthorById, getAuthors } from "../repositories/authorRepository.js";

export const getAuthorsService = async () => {
  const result = await getAuthors();

  if (result.rows.length === 0) {
    throw new AppError("No hay autores", 404);
  }

  return result.rows;
};

export const getAuthorByIdService = async (id) => {
  const result = await getAuthorById(id);

  if (result.rows.length === 0) {
    throw new AppError("Author no encontrado", 404);
  }

  return result.rows[0];
};

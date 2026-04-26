import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  recoverBook,
  updateBook,
} from "../repositories/bookRepository.js";
import { AppError } from "../utils/AppError.js";

export const createBookService = async ({
  title,
  price,
  stock,
  cover,
  details,
}) => {
  const result = await createBook({ title, price, stock, cover, details });
  return result.rows[0];
};

export const updateBookService = async ({
  title,
  price,
  stock,
  cover,
  details,
  id,
}) => {
  const result = await updateBook({ title, price, stock, cover, details, id });

  if (result.rowCount === 0) {
    throw new AppError("El libro no existe", 404);
  }

  return result.rows[0];
};

// soft delete
export const deleteBookService = async (id) => {
  const result = await deleteBook(id);

  if (result.rowCount === 0) {
    throw new AppError("El libro no existe o ya ha sido eliminado", 404);
  }

  return result.rows;
};

// recover
export const recoverBookService = async (id) => {
  const result = await recoverBook(id);

  if (result.rowCount === 0) {
    throw new AppError("El libro no existe o ya se encuentra en la lista", 404);
  }

  return result.rows[0];
};

export const getBooksService = async ({ author, genre, search, ids }) => {
  let parsedIds = null;

  if (ids) {
    parsedIds = ids
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);
  }

  return await getBooks({
    author,
    genre,
    search,
    ids: parsedIds,
  });
};

export const getBookByIdService = async (id) => {
  const book = await getBookById(id);

  if (!book) {
    throw new AppError("Libro no encontrado", 404);
  }

  return book;
};

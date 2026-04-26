import {
  createBookService,
  deleteBookService,
  getBookByIdService,
  getBooksService,
  recoverBookService,
  updateBookService,
} from "../services/bookService.js";

export const createBookController = async (req, res, next) => {
  try {
    const book = await createBookService(req.validated.body);

    res.status(201).json({
      message: "Libro subido correctamente",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBookController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await updateBookService({ ...req.validated.body, id });

    res.status(200).json({
      message: "Libro modificado correctamente",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

// soft delete
export const deleteBookController = async (req, res, next) => {
  try {
    const { id } = req.params;

    await deleteBookService(id);

    res.status(200).json({
      message: "Libro eliminado correctamente",
      data: null, 
    });
  } catch (error) {
    next(error);
  }
};

// recover
export const recoverBookController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await recoverBookService(id);

    res.status(200).json({
      message: "Libro recuperado con éxito",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

export const getBooksController = async (req, res, next) => {
  try {
    const { author, genre, search, ids } = req.query;

    const filters = {
      author,
      genre,
      search,
      ids,
    };

    const books = await getBooksService(filters);

    res.status(200).json({
      message: "Libros obtenidos correctamente",
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

export const getBookByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await getBookByIdService(id);

    res.status(200).json({
      message: "Libro obtenido correctamente",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};
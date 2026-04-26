import {
  getAuthorByIdService,
  getAuthorsService,
} from "../services/authorService.js";

export const getAuthorsController = async (req, res, next) => {
  try {
    const authors = await getAuthorsService();

    res.status(200).json({
      message: "Autores obtenidos correctamente",
      data: authors ,
    });
  } catch (error) {
    next(error);
  }
};

export const getAuthorByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const author = await getAuthorByIdService(id);

    res.status(200).json({
      message: "Autor obtenido correctamente",
      data: author 
    });
  } catch (error) {
    next(error);
  }
};

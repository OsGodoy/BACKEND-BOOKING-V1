import {
  getGenreByIdService,
  getGenresService,
} from "../services/genreService.js";

export const getGenresController = async (req, res, next) => {
  try {
    const genres = await getGenresService();

    res.status(200).json({
      message: "Géneros obtenidos correctamente",
      data: genres,
    });
  } catch (error) {
    next(error);
  }
};

export const getGenreByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const genre = await getGenreByIdService(id);

    res.status(200).json({
      message: "Género obtenido correctamente",
      data: genre,
    });
  } catch (error) {
    next(error);
  }
};

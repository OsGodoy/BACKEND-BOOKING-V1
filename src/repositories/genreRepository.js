import { getAll, getById } from "./baseRepository.js";

export const getGenres = getAll("genres");
export const getGenreById = getById("genres");

import { getAll, getById } from "./baseRepository.js";

export const getAuthors = getAll("authors");
export const getAuthorById = getById("authors");

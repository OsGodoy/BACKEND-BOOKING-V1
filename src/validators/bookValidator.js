import { z } from "zod";

const titleSchema = z
  .string()
  .trim()
  .min(2, "El título debe tener mínimo 2 caracteres");

const coverSchema = z.string().url().optional();

const priceSchema = z
  .number({
    required_error: "El precio es requerido",
  })
  .positive("El precio debe ser mayor a 0");

const detailsSchema = z
  .string()
  .trim()
  .min(2, "El detalle debe tener mínimo 2 carateres");

const stockSchema = z.number().int().min(0, "El stock no puede ser negativo");

export const createBookSchema = z.object({
  body: z.object({
    title: titleSchema,
    cover: coverSchema,
    price: priceSchema,
    details: detailsSchema,
    stock: stockSchema,
  }),
});

export const updateBookSchema = z.object({
  body: z.object({
    title: titleSchema,
    cover: coverSchema,
    price: priceSchema,
    details: detailsSchema,
    stock: stockSchema,
  }),
});

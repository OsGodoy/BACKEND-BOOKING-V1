import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .email("Ingrese un email válido")
  .toLowerCase();

const passwordSchema = z
  .string()
  .min(6, "La contraseña debe tener al menos 6 caracteres");

export const registerSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, "El nombre debe tener mínimo 2 caracteres"),
    lastname: z
      .string()
      .trim()
      .min(2, "El apellido debe tener mínimo 2 caracteres")
      .optional(),
    email: emailSchema,
    password: passwordSchema,
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: emailSchema,
    password: passwordSchema,
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, "El nombre debe tener mínimo 2 caracteres"),
    lastname: z
      .string()
      .trim()
      .min(2, "El apellido debe tener mínimo 2 caracteres")
      .optional(),
  }),
});

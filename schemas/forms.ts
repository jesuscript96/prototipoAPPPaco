import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Escribe tu correo").email("Usa un correo válido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export const profileSchema = z.object({
  name: z.string().min(3, "Escribe tu nombre completo"),
  phone: z.string().min(10, "Incluye lada y número"),
  role: z.string().min(1, "Selecciona un rol"),
});

export const recordSchema = z.object({
  client: z.string().min(3, "El cliente es obligatorio"),
  amount: z.string().min(1, "Captura el monto estimado"),
  description: z.string().min(20, "Agrega al menos 20 caracteres"),
  acceptsTerms: z.boolean().refine((value) => value, "Debes confirmar que revisaste los datos"),
});

export type LoginValues = z.infer<typeof loginSchema>;
export type ProfileValues = z.infer<typeof profileSchema>;
export type RecordValues = z.infer<typeof recordSchema>;

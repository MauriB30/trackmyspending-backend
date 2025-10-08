import z from 'zod';

export const userRegisterSchema = z.object({
    name: z
        .string('Nombre no valido')
        .min(1, 'El nombre es obligatorio')
        .max(255, 'El nombre no puede exceder los 255 caracteres.')
        .trim(),
    email: z
        .email('Correo no valido')
        .trim()
        .toLowerCase()
        .max(255, 'El nombre no puede exceder los 255 caracteres.'),
    password: z.string().min(8).trim(),
}).strict();

export const userLoginSchema = z.object({
    email: z
        .email('Correo no valido')
        .trim()
        .toLowerCase()
        .max(255, 'El correo no puede exceder los 255 caracteres.'),
    password: z
        .string('Contraseña no valida')
        .min(8, 'La contraseña debe tener al menos 8 caracteres.')
        .trim(),
}).strict();

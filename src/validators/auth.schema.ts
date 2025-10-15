import z from 'zod';

export const RegisterSchema = z
    .object({
        name: z
            .string('Nombre no valido')
            .min(1, 'El nombre es obligatorio')
            .max(255, 'El nombre no puede exceder los 255 caracteres.')
            .trim(),
        email: z
            .email('Correo no valido')
            .min(1, 'El correo es obligatorio')
            .trim()
            .toLowerCase()
            .max(255, 'El nombre no puede exceder los 255 caracteres.'),
        password: z
            .string('Contraseña no valida')
            .min(8, 'La contraseña debe tener al menos 8 caracteres')
            .trim(),
    })
    .strict();

export const LoginSchema = z
    .object({
        email: z
            .email('Correo no valido')
            .min(1, 'El correo es obligatorio')
            .trim()
            .toLowerCase()
            .max(255, 'El correo no puede exceder los 255 caracteres.'),
        password: z
            .string('Contraseña no valida')
            .min(8, 'La contraseña debe tener al menos 8 caracteres.')
            .trim(),
    })
    .strict();

export const changePasswordSchema = z.object({
    password: z
        .string('Contraseña no valida')
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .trim(),
    newPassword: z
        .string('Contraseña no valida')
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .trim(),
});

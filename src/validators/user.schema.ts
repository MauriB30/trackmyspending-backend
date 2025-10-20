import z from 'zod';

export const userUpdateSchema = z.object({
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
        .max(255, 'El correo no puede exceder los 255 caracteres.'),
});

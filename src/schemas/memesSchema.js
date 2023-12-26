import { z } from 'zod'


const memesSchema = z.object({
    id: z.number({
        required_error: 'El id es requerido'
    }).int().positive(),

    title: z.string({
        required_error: 'Titulo es requerido'
    }),

    description: z.string({
        required_error: 'Descripcion es requerido'
    }),

    banner: z.string({
        required_error: 'Banner es requerido'
    }).url(),

    score: z.number({
        required_error: 'La puntuación es requerida'
    }).int().min(1).max(10)
})


export const validateMeme = (input) => {
    return memesSchema.safeParse(input)
}

export const validatePartialMeme = (input) => {
    return memesSchema.partial().safeParse(input)
}

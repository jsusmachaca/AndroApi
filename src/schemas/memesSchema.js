const zod = require('zod')


const memesSchema = zod.object({
    id: zod.number({
        required_error: 'El id es requerido'
    }).int().positive(),

    title: zod.string({
        required_error: 'Titulo es requerido'
    }),

    description: zod.string({
        required_error: 'Descripcion es requerido'
    }),

    banner: zod.string({
        required_error: 'Banner es requerido'
    }).url(),

    score: zod.number({
        required_error: 'La puntuación es requerida'
    }).int().min(1).max(10)
})


const validateMeme = (input) => {
    return memesSchema.safeParse(input)
}

const validatePartialMeme = (input) => {
    return memesSchema.partial().safeParse(input)
}

module.exports = {
    validateMeme, 
    validatePartialMeme
}
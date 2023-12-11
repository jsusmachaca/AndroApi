const zod = require('zod')


const moviesSchema = zod.object({
    id: zod.number({
        required_error: 'El id es requerido'
    }).int().positive(),
    titulo: zod.string({
        required_error: 'Titulo es requerido'
    }),
    descripcion: zod.string({
        required_error: 'Descripcion es requerido'
    }),
    banner: zod.string({
        required_error: 'Banner es requerido'
    }).url(),
    actor_principal: zod.string({
        required_error: 'Actor principal es requerido'
    }),
    director: zod.string({
        required_error: 'Director es requerido'
    }),
    puntuacion: zod.number({
        required_error: 'La puntuación es requerida'
    }).int().min(1).max(10)
})


const validateMovie = (movie) => {
    return moviesSchema.safeParse(movie)
}

module.exports = validateMovie
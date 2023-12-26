import { Router } from 'express'
const router = Router()
import { writeFile } from 'node:fs'
import { validatePartialMeme } from '../schemas/memesSchema.js'
import { readFileSync } from 'node:fs'
const jsonData = JSON.parse(readFileSync('./memes.json', 'utf-8'))



router.put('/edit', (req, res) => {
    const id = parseInt(req.query.id)
    const result = validatePartialMeme(req.body)

    if (result.error) {
        return res.status(404).json(result.error)
    }
    const newData = jsonData.find(data => data.id === id)
    
    if (newData) {
        const index = jsonData.indexOf(newData)
        jsonData[index] = {
            ...jsonData[index],
            ...result.data
        }
        
        writeFile('./memes.json', JSON.stringify(jsonData, null, 1), () => {
            console.log('edit data')
        })
        res.json({message: 'editado'})
        
    } else {
        res.json({error: 'no se encontró la pelicula'})
    }
})


export default router
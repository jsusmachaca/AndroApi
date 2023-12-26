import { Router } from 'express'
import { writeFile } from 'node:fs'
import { validateMeme } from '../schemas/memesSchema.js'
import { readFileSync } from 'node:fs'
const jsonData = JSON.parse(readFileSync('./memes.json', 'utf-8'))



const router = Router()



router.post('/append', (req, res) => {
    const result = validateMeme(req.body)
    
    if (result.error) {
        return res.status(401).json(result.error)
    }
    else if (jsonData.find(datas => datas.id === result.data.id)) {
        return res.status(406).json({error: 'Error, dato ya existente', data_error: result.data})
        
    } else {
        jsonData.push(result.data)
        writeFile('./memes.json', JSON.stringify(jsonData, null, 1), () => {
            console.log('writing data')
        })   
        res.status(201).json({message: 'recived', data: result.data})
    }
})

export default router
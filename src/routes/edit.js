const express = require('express')
const router = express.Router()
const fs = require('node:fs')
const { validatePartialMeme} = require('../schemas/memesSchema')
const jsonData = require('../../memes.json')



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
        
        fs.writeFile('./memes.json', JSON.stringify(jsonData, null, 1), () => {
            console.log('edit data')
        })
        res.json({message: 'editado'})
        
    } else {
        res.json({error: 'no se encontró la pelicula'})
    }
})


module.exports = router
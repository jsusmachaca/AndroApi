const router = require('express').Router()
const fs = require('node:fs')
const {validateMeme } = require('../schemas/memesSchema')
const jsonData = require('../../memes.json')



router.post('/append', (req, res) => {
    const result = validateMeme(req.body)
    
    if (result.error) {
        return res.status(401).json(result.error)
    }
    else if (jsonData.find(datas => datas.id === result.data.id)) {
        return res.status(406).json({error: 'Error, dato ya existente', data_error: result.data})
        
    } else {
        jsonData.push(result.data)
        fs.writeFile('./memes.json', JSON.stringify(jsonData, null, 1), () => {
            console.log('writing data')
        })   
        res.status(201).json({message: 'recived', data: result.data})
    }
})

module.exports = router
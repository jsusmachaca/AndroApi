const router = require('express').Router()
const fs = require('node:fs')
const jsonData = require('../../memes.json')



router.delete('/del', (req, res) => {
    const id = parseInt(req.query.id)
    if (jsonData.find(datas => datas.id === id)) {
        const newData = jsonData.find(datas => datas.id === id)
        const i = jsonData.indexOf(newData)
        console.log('index', i)
        jsonData.splice(i, 1)
        fs.writeFile('./memes.json', JSON.stringify(jsonData, null, 1), () => {
            console.log('delete data')
        })   
        res.status(204)
        
    } else {
        res.json({error: 'Error, dato no existente'})
    }
})


module.exports = router
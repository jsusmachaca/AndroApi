const express = require('express')
const fs = require('node:fs')
const jsonData = require('../memes.json')
const validateMeme = require('./schemas/memesSchema')

const app = express()
const port = 5000

app.disable('x-powered-by')
app.use(express.json())



app.get('/', (req, res) => {
    res.json(jsonData)
})

app.get('/search', (req, res) => {
    const title = req.query.title
    const filtData = jsonData.find(data => data.title.toLowerCase() == title.toLowerCase())
    res.json(filtData)
})


app.post('/append', (req, res) => {
    const result = validateMeme(req.body)

    if (result.error) {
        res.status(401).json(result.error)
    }
    else if (jsonData.find(datas => datas.id === result.data.id)) {
        res.status(406).json({error: 'Error, dato ya existente', data_error: result.data})

    } else {
        jsonData.push(result.data)
        fs.writeFile('./memes.json', JSON.stringify(jsonData, null, 1), () => {
            console.log('writing data')
        })   
        res.status(201).json({message: 'recived', data: result.data})
    }
})

app.delete('/del', (req, res) => {
    const id = parseInt(req.query.id)
    if (jsonData.find(datas => datas.id === id)) {
        const newData = jsonData.find(datas => datas.id === id)
        const i = jsonData.indexOf(newData)
        console.log('index', i)
        jsonData.splice(i, 1)
        fs.writeFile('./memes.json', JSON.stringify(jsonData, null, 1), () => {
            console.log('writing data')
        })   
        res.status(204)
        
    } else {
        res.json({error: 'Error, dato no existente'})
    }
})

app.put('/edit', (req, res) => {
    const id = parseInt(req.query.id)

    if (jsonData.find(data => data.id === id)) {
        const newData = jsonData.find(data => data.id === id)
        const i = jsonData.indexOf(newData)
        newData.score = req.body.score

        jsonData[i] = newData

        fs.writeFile('./memes.json', JSON.stringify(jsonData, null, 1), () => {
            console.log('editado')
        })
        res.json({message: 'editado'})
        
    } else {
        res.json({error: 'no se encontró la pelicula'})
    }
})

app.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
})
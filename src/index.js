const express = require('express')
const fs = require('node:fs')
const jsonData = require('../memes.json')
const {validateMeme, validatePartialMeme} = require('./schemas/memesSchema')

const app = express()

app.disable('x-powered-by')
app.use(express.json())



app.get('/', (req, res) => {
    res.json(jsonData)
})

app.get('/search', (req, res) => {
    const title = req.query.title
    const filtData = jsonData.find(
        data => data.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() == title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
        )
    res.json(filtData)
})


app.post('/append', (req, res) => {
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

app.delete('/del', (req, res) => {
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

app.put('/edit', (req, res) => {
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

const port = process.env.PORT ?? 5000

app.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
})
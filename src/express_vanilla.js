const express = require('express')
const fs = require('node:fs')
const jsonData = require('../movies.json')

const app = express()
const port = 5000
app.disable('x-powered-by')
app.use(express.json())

const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:9000'
]


app.use((req, res, next) => {
    if (req.method != 'POST') {
        return next()
    } 
    if (req.headers['content-type'] != 'application/json') {
        return next()
    }
    let body = ''
    
    req.on('data', chunk => {
        body += chunk.toString()
    })
    
    req.on('end', () => {
        const dataReq = JSON.parse(body)
        req.body = dataReq
        next()
    })
    
})

app.get('/', (req, res) => {
    const origin = req.headers('origin')
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin)
    }
    res.json(jsonData)
})

app.post('/appends', (req, res) => {
    let body = ''

    req.on('data', chunk => {
        body += chunk.toString()
    })

    req.on('end', () => {
        const dataReq = JSON.parse(body)

        if (jsonData.find(datas => datas.id === dataReq.id)) {
            res.json({error: 'Error, dato ya existente'})

        } else {
            jsonData.push(dataReq)
            fs.writeFile('./movies.json', JSON.stringify(jsonData, null, 1), () => {
                console.log('writing data')
            })
            res.json({message: 'recived'})
        }
    })
})


app.get('/search', (req, res) => {
    const titulo = req.query.titulo
    const filtData = jsonData.find(data => data.titulo == titulo)
    res.json(filtData)
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

app.options('/del', (req, res) => {
    const origin = req.headers('origin')
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin)
        res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE')
    }
})


app.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
})
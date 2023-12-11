const express = require('express')
const fs = require('node:fs')
const jsonData = require('../movies.json')

const app = express()
const port = 5000
app.disable('x-powered-by')
app.use(express.json())



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
    const id = req.query.id
    const filtData = jsonData.find(data => data.id == id)
    res.json(filtData)
})



app.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
})
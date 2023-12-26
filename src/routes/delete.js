import { Router } from 'express'
import { writeFile } from 'node:fs'
import { readFileSync } from 'node:fs'
const jsonData = JSON.parse(readFileSync('./memes.json', 'utf-8'))


const router = Router()


router.delete('/del', (req, res) => {
    const id = parseInt(req.query.id)
    if (jsonData.find(datas => datas.id === id)) {
        const newData = jsonData.find(datas => datas.id === id)
        const i = jsonData.indexOf(newData)
        console.log('index', i)
        jsonData.splice(i, 1)
        writeFile('./memes.json', JSON.stringify(jsonData, null, 1), () => {
            console.log('delete data')
        })   
        res.status(204)
        
    } else {
        res.json({error: 'Error, dato no existente'})
    }
})


export default router
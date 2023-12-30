import { Router } from 'express'
import { readFileSync } from 'node:fs'
const jsonData = JSON.parse(readFileSync('./memes.json', 'utf-8'))

const router = Router()


router.get('/', (req, res) => {
    const { title } = req.query
    if (title) {
        const filtData = jsonData.find(
            data => data.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() == title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
        )
        return res.json(filtData)
    }    
    return res.json(jsonData)
})


export default router
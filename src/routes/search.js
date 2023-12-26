import { Router } from 'express'
import { readFileSync } from 'node:fs'
const jsonData = JSON.parse(readFileSync('./memes.json', 'utf-8'))

const router = Router()

router.get('/search', (req, res) => {
    const title = req.query.title
    const filtData = jsonData.find(
        data => data.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() == title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
        )
    res.json(filtData)
})

export default router
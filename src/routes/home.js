import { Router } from 'express'
import { readFileSync } from 'node:fs'
const jsonData = JSON.parse(readFileSync('./memes.json', 'utf-8'))

const router = Router()


router.get('/', (req, res) => {
    res.json(jsonData)
})


export default router
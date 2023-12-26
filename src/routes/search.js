const express = require('express')
const router = express.Router()
const jsonData = require('../../memes.json')



router.get('/search', (req, res) => {
    const title = req.query.title
    const filtData = jsonData.find(
        data => data.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() == title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
        )
    res.json(filtData)
})

module.exports = router
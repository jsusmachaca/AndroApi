const express = require('express')
const jsonData = require('../../memes.json')

const router = express.Router()


router.get('/', (req, res) => {
    res.json(jsonData)
})


module.exports = router
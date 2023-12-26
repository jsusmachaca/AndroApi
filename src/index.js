const express = require('express')
const routerHome = require('./routes/home')
const routerSearch = require('./routes/search')
const routerDel = require('./routes/delete')
const routerEdit = require('./routes/edit')
const corsMiddleware = require('./middlewares/cors')

const app = express()

app.disable('x-powered-by')
app.use(corsMiddleware())
app.use(express.json())


app.use('/', routerHome)
app.use('/', routerSearch)
app.use('/', routerDel)
app.use('/', routerEdit)

const port = process.env.PORT ?? 5000

app.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
})
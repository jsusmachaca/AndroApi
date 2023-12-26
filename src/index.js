import express, { json } from 'express'
import routerHome from './routes/home.js'
import routerSearch from './routes/search.js'
import routerDel from './routes/delete.js'
import routerEdit from './routes/edit.js'
import corsMiddleware from './middlewares/cors.js'

const app = express()

app.disable('x-powered-by')
app.use(corsMiddleware())
app.use(json())


app.use('/', routerHome)
app.use('/', routerSearch)
app.use('/', routerDel)
app.use('/', routerEdit)

const port = process.env.PORT ?? 5000

app.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
})
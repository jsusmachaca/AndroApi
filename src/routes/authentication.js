import jwt from 'jsonwebtoken'
import { Router } from 'express'

process.loadEnvFile()

const SECRET_KEY = process.env.SECRET_KEY

export const routerAuth = Router()

routerAuth.post('/auth', (req, res) => {
  const token = jwt.sign({ id: 1, username: 'jsus' }, SECRET_KEY)
  res.json(token)
})

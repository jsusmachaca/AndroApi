import { MemeModel } from '../models/MemeModel.js'
import { validateMeme, validatePartialMeme } from '../schemas/memesSchema.js'
import { readFileSync } from 'node:fs'

const jsonData = JSON.parse(readFileSync('./memes.json', 'utf-8'))

export class MemeController {
  static async getAll (req, res) {
    const meme = await MemeModel.getAll()
    res.json(meme)
  }

  static async getByName (req, res) {
    const { title } = req.query
    const meme = await MemeModel.getByName({ title })
    res.json(meme)
  }

  static async create (req, res) {
    const result = validateMeme(req.body)

    if (result.error) {
      return res.status(401).json(result.error)
    } else if (jsonData.find(datas => datas.id === result.data.id)) {
      return res.status(406).json({ error: 'Error, dato ya existente', data_error: result.data })
    } else {
      const data = await MemeModel.create(result)
      res.status(201).json({ message: 'recived', data })
    }
  }

  static async edit (req, res) {
    const id = parseInt(req.query.id)
    const result = validatePartialMeme(req.body)

    if (result.error) {
      return res.status(404).json(result.error)
    }

    if (jsonData.find(data => data.id === id)) {
      const data = await MemeModel.edit({ id, input: result.data })
      res.json({ message: 'editado', data })
    } else {
      res.json({ error: 'no se encontró la pelicula' })
    }
  }

  static async delete (req, res) {
    const id = parseInt(req.query.id)
    if (jsonData.find(data => data.id === id)) {
      MemeModel.delete({ id })
      return res.json({ message: 'deleted' })
    } else {
      return res.json({ error: 'Error, dato no existente' })
    }
  }
}

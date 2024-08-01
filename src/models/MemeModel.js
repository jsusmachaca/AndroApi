import { readFileSync, writeFile } from 'node:fs'

const jsonData = JSON.parse(readFileSync('./memes.json', 'utf-8'))

export class MemeModel {
  static async getAll () {
    return jsonData
  }

  static async getByName ({ title }) {
    if (title) {
      const filtData = jsonData.find(
        data => data.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() === title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
      )
      return filtData
    }
  }

  static async create ({ data }) {
    jsonData.push(data)
    writeFile('./memes.json', JSON.stringify(jsonData, null, 1), () => {
      console.log('writing data')
    })

    return data
  }

  static async edit ({ id, input }) {
    const newData = jsonData.find(data => data.id === id)

    const index = jsonData.indexOf(newData)
    jsonData[index] = {
      ...jsonData[index],
      ...input
    }

    writeFile('./memes.json', JSON.stringify(jsonData, null, 1), () => {
      console.log('edit data')
    })
    return jsonData[index]
  }

  static async delete ({ id }) {
    const newData = jsonData.find(datas => datas.id === id)
    const i = jsonData.indexOf(newData)
    jsonData.splice(i, 1)
    writeFile('./memes.json', JSON.stringify(jsonData, null, 1), () => {
      console.log('delete data')
    })
    return newData
  }
}

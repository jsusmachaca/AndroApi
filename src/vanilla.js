const http = require('node:http')
const fs = require('node:fs')
let jsonFile = require('../movies.json')

const server = http.createServer((req, res) => {
    const { method, url } = req

    res.setHeader('Content-Type', 'application/json; charset=utf-8')

    switch (method) {
      case 'GET':
        switch (url) {
          case '/':
            return res.end(JSON.stringify(jsonFile, null, 1))
          case '/bro':
            const datas = jsonFile.find(data => data.id === 1 )
            return res.end(JSON.stringify(datas, null, 1))
        }  
                      
      case 'POST':
        switch (url) {
          case '/append':
            let body = ''                        

            req.on('data', chunk => {
              body += chunk.toString()
            })

            req.on('end', () => {
                const data = JSON.parse(body)                

                res.writeHead(201, {'Content-Type': 'application/json; charset=utf-8'})
                jsonFile = [...jsonFile, data]
                fs.writeFile('./movies.json', JSON.stringify(jsonFile, null, 2), 'utf-8', (err) => {
                  if (err) {
                    console.error('Error al escribir en el archivo:', err);
                  } else {
                    console.log('Cambios guardados en el archivo correctamente.');
                  }
                });
                res.end(JSON.stringify({message: 'elementos agregados correctamente'}))
            })
        }
    }
})

server.listen(5000,() => {
    console.log('Servidor montado mi bro')
})
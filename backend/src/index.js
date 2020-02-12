const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http') // este modulo é direto do node
const routes = require('./routes')
const { setupWebSocket } = require('./websocket')

const app = express()
const server = http.Server(app) // extraindo o servidor http fora do express, sendo possível trabalhar diretamente

setupWebSocket(server) // esa função é disparada toda vez que salvar

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-svt4t.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex :  true,
}).catch(e => {
    const msg = 'ERRO! Não foi possível conectar com o MongoDB'
    console.log('\x1b[41m%s\x1b[337m', msg, '\x1b[0m', e)
})

// MongoDB local
// mongoose.connect('mongodb://localhost/omnistack10', { useNewUrlParser: true, /*useUnifiedTopology: true*/ })
//     .catch( e => {
//         const msg = 'ERRO! Não foi possível conectar com o MongoDB'
//         console.log('\x1b[41m%s\x1b[337m', msg, '\x1b[0m')        
//     })

// Essa declaração sinaliza ao express para entender todas as requsições que possuem o formato JSON
// se deixar apenas cors() as requisições podem vir de qualquer lugar
// origin: 'http://localhost:3000'
app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(3333)
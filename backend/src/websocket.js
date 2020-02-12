const socketio = require('socket.io')
const parseStringAsArray = require('./utils/parseStringAsArray')
const calculateDistance = require('./utils/calculateDistance')

let io
const connections = []

exports.setupWebSocket = (server) => {
    io = socketio(server)

    // Toda vez que houver uma conexão, recebera um objeto socket
    io.on('connection', socket => {
        console.log(socket.id)
        console.log(socket.handshake.query) //socket.handshake.query : recebe os parâmetros do front end, neste caso estamos recebendo latitude, longitude e techs

        // setTimeout(() => {
        //     // socket.emit() : emit() emite uma mensagem.
        //     socket.emit('message', 'Hellow Joel')
        // }, 3000)
        const { latitude, longitude, techs } = socket.handshake.query
        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude), // transformando a latitude em número
                longitude: Number(longitude), // transformando a longitude em número
            },
            techs: parseStringAsArray(techs) // transformando as techs e separando no array
        })
    })
}

// Essa função recebe coodenadas e as tecnologias do novo dev.
// Depois irá retornar as conexões que estão a 10km dentro das coordenadas e que trabalham com as tecnologias
exports.findConnections = (coordinates, techs) => {
    return connections.filter(connection => {
        return calculateDistance(coordinates, connection.coordinates) < 10 // verificando se o novo dev está dentro dos 10km
                // some(): retorna true se o dev possui uma das tecnologias solicitadas pelo front 
            && connection.techs.some(item => techs.includes(item)) // verificando se o novo dev possui as tecnologias que o usuário digitou no input em mobile
    })
}

// essa função irá enviar uma mensagem 
exports.sendMessage = (to, message, data) => {
    // Percorrendo todas as mensagems, neste caso irá retornar as conecções
    to.forEach(connetion => {
        // io.to() : será pra quem irá enviar a mensagem
        // emit(mensage, valor) : envia mensage e valor
        io.to(connetion.id).emit(message, data)
    })
}
import socketio from 'socket.io-client'

const socket = socketio('http://192.168.15.12:3333', {
    autoConnect: false, // proibindo conexão automatica
})

// função callback
function subscribeToNewDevs(subscribeFunction){
    // irá ouvir o novo dev disparado pelo backend
    socket.on('new-dev', subscribeFunction)
}

function connect(latitude, longitude, techs) {
    //enviando valores para o backend através do sockio
    //
    socket.io.opts.query = {
        latitude, longitude, techs
    }
    socket.connect()

    socket.on('message', text => {
        console.log(text)
    })
}

function disconnect() {
    if (socket.connected) {
        socket.disconnect()
    }
}

export { connect, disconnect, subscribeToNewDevs }
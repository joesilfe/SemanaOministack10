const axios = require('axios')
const Dev = require('./../models/Dev')
const parseStringAsArray = require('./../utils/parseStringAsArray')
const { findConnections, sendMessage } = require('./../websocket')

// Práticas com Controllers
// index : Quando quero mostrar uma lista do recurso que seria Devs
// show : Quando quero mostrar um unico Dev
// store : Quando quero criar um Dev
// update : Alterar Dev
// destroy : Deleta Dev

module.exports = {

    async destroy(request, response) {
        const { github_username } = await request.body
        
        await Dev.deleteOne({
            "github_username": github_username,
            function(err) {
                if (err) return handleError(err);
                console.log(err)
            }
        })

        return response.json('Usuário foi excluído')
    },

    // index : Quando quero mostrar uma lista do recurso que seria Devs
    async index(request, response) {

        //Encontre para mim todos os devs
        const devs = await Dev.find()

        // Caso precisar filtar todos os dev que possuir o nome Joel, considere o código abaixo
        // const devs = await Dev.find(
        //     {
        //         name: 'Joel'
        //     }
        // )

        return response.json(devs)
    },

    // store : Quando quero criar um Dev
    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body

        // findeOne : Verifica no mongoDB se existe o usuário cadastrado pegando o primeiro que possuir username
        let dev = await Dev.findOne({ github_username })


        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)

            const { name = login, avatar_url, bio } = apiResponse.data

            //split(',') : Cria um array separando sua posição por virgula. ex.: 'Joel, Samuel' para ['joel', 'Samuel']
            // trim(): retira todos os espaços.
            const techsArray = parseStringAsArray(techs)

            const location = {
                type: "Point", // Criando ponto
                coordinates: [longitude, latitude] // Coordenada
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })

            // Filtrar as conexões que estõa há no máximo 10 km de distância
            // e que o novo dev tenha pelo menos uma das tecnologias filtradas
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray
            )

            //Enviando a mensagem para o front
            sendMessage(sendSocketMessageTo, 'new-dev', dev)
        }

        return response.json(dev)
    }
}
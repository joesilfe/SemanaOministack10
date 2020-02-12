const Dev = require('./../models/Dev')
const parseStringAsArray = require('./../utils/parseStringAsArray')

module.exports = {
    async index(request, response) {
        const { latitude, longitude, techs } = request.query

        const techsArray = parseStringAsArray(techs)

        console.log(techsArray)

        const devs = await Dev.find({
            // Filtro
            techs: {
                $in: techsArray, // Quero encontrar os usuários que tiverem as tecnologias em $in
                // mais sobre operadores em: https://docs.mongodb.com/manual/reference/operator/query/
            },
            //Criando localização
            location: {
                $near: { // $near : Encontra objetos perto de uma localização
                    $geometry: { // Geolocalização
                        type: "Point", // Passando um ponto
                        coordinates: [longitude, latitude], // Coordenadas
                    },
                    $maxDistance: 10000, // Distância em 10000 metros = 10km
                },
            },
        })

        return response.json({ devs })
    }
}
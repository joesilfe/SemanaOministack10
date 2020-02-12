import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'

import api from '../services/api'
import { connect, disconnect, subscribeToNewDevs } from '../services/socket'

export default function Main(props) {
    const [devs, setDevs] = useState([])
    const [currentRegion, setCurrentRegion] = useState(null)
    const [techs, setTechs] = useState('')

    useEffect(() => {
        async function loadInitialPosition() {

            // requestPermissionsAsync : Solicita a permissão do usuário
            // ios : Se o usuário está no iOS
            // android : Se o usuário está no Android
            // status : O status da permissão, se deixou ou não.
            // granted : Se o usuário deu permissão ou não, retorna true ou false
            // expires : Quando vai expierar a permissão
            // canAskAgain : Se pode perguntar pela permissão de novo
            const { granted } = await requestPermissionsAsync();

            // Se o usuário permitiu
            if (granted) {
                // Pega a localização dele
                const location = await getCurrentPositionAsync({
                    // Pegando localização via GPS, se estiver quebrado passa FALSE
                    enableHighAccuracy: true,
                })

                // Acessando latitude e longitude de dentro das coordenada do usuário
                const { latitude, longitude } = location.coords

                // atribuindo ao useState ou criando estado
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.002, // Zoom
                    longitudeDelta: 0.002, // Zoom
                })
            }
        }

        loadInitialPosition()
    }, [])

    useEffect(() => {
        subscribeToNewDevs( dev => setDevs([...devs, dev]) )
    }, [devs])

    function setupWebSocket() {
        disconnect()

        const { latitude, longitude } = currentRegion

        connect(latitude, longitude, techs)
    }

    async function loadDevs() {
        const { latitude, longitude } = currentRegion

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs,
            }
        }).catch(e => console.log(e))

        setDevs(response.data.devs)
        setupWebSocket()
    }

    // Essa função retorna a posição onde o usuário está movendo o mapa
    function handleRegionChanged(region) {
        console.log(region)
        setCurrentRegion(region)
    }

    // se não tiver nada no meu estado currentRegion, retorna null
    if (!currentRegion) return null

    //MapView é o mapa
    return (
        <>
            <MapView
                // onRegionChangeComplete : passa para a função ' handleRegionChanged ' a posição do usuário no mapa
                onRegionChangeComplete={handleRegionChanged}
                // inicia com uma região caso tiver algo em currentRegion
                initialRegion={currentRegion}
                style={styles.map}
                onPress={() => { Keyboard.dismiss() }}
            >
                {devs.map(dev => (
                    // Marker: É a marcação no mapa
                    <Marker key={dev._id} coordinate={{
                        latitude: dev.location.coordinates[1],
                        longitude: dev.location.coordinates[0],
                    }}
                    >
                        {/* setando uma imagem na mesma posição que a marcação */}
                        <Image style={styles.avatar} source={{ uri: dev.avatar_url }} />

                        <Callout onPress={() => {
                            // Fazendo navegação quando clicar sobre as informações, sendo o primeiro parâmentro a tela que deve navegar e o segundo parâmentro o objeto(github_username) e valor('joesilfe').
                            props.navigation.navigate('Profile', { github_username: dev.github_username })
                        }} >
                            <View style={styles.callout}>
                                <Text style={styles.devName}>{dev.name}</Text>
                                <Text style={styles.devBio}>{dev.bio} </Text>
                                <Text style={styles.devTechs}>{dev.techs.join(', ')} </Text>
                            </View>
                        </Callout>
                    </ Marker>
                ))}
            </ MapView >
            <View style={styles.searchForm} >
                {/* [sentences: só a primeira letra da frase em caixa alta] [words: A primeira letra de cada palavra em maiusculo], [characters: Todas as letras caixa alta], [none: nenhuma letra em caixa alta]
                    autoCorrect: [ True: Permitindo que corrija palavras ], [ False: não deixar que seja corrigido o texto ]
                */}
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar devs por techs..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={text => setTechs(text)} // ou onChangeText={setTechs}
                />
                <TouchableOpacity onPress={loadDevs} style={styles.loadButton} >
                    <MaterialIcons name="my-location" size={20} color="#fff" />
                </ TouchableOpacity>
            </View>
        </>
    )
}

//Criando estilo para a página
const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#7159c1'
    },
    callout: {
        width: 260,
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    devBio: {
        color: '#666',
        marginTop: 5,
    },
    devTechs: {
        marginTop: 5,
    },
    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,

    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8E4DFF',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2, //Sombreamento no Android
    },
})
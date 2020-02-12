import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Main from './pages/Main'
import Profile from './pages/Profile'

 const Routes = createAppContainer(
    createStackNavigator({
        // Criando navegação para tela Main
        Main: {
            // Vinculando a tela Main
            screen: Main,
            // Configurando rota
            navigationOptions: {
                // Atribuindo um texto no header
                title: 'DevRadar',
                // Centralizando o texto do header ao centro
                headerTitleAlign: "center",
            }
        },
        // Criando navegação para tela Profile
        Profile: {
            // Vinculando a tela Profile
            screen: Profile,
            // Configurando rota
            navigationOptions: {
                // Atribuindo um texto no header
                title: 'Perfil no GitHub',
                // Centralizando o texto do header ao centro
                headerTitleAlign: "center",
            }
        }, 
    }, {
        //Configuração padrão
        defaultNavigationOptions: {
            // Deixando o texto do header em branco
            headerTintColor:'#fff',
            // troca a palavra da tela anterior por ' back ' ou 'voltar'
            headerBackTitle: null,
            //Ao passar false, anula a visibilidade do texto mostrando apenas a seta de voltar
            headerBackTitleVisible: false,
            // estilizando o header
            headerStyle:{
                // Aplicando a cor roxa no header
                backgroundColor: '#7159c1',
            }
        },
    })
)

export default Routes
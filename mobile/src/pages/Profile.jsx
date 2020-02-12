import React from 'react';
import { WebView } from 'react-native-webview';

export default function Profile(props){

    // props.navigation.getParam() : Ao chamar essa função e passando a chave, vocÊ captura o valor que veio da outra tela
    const githubUsername = props.navigation.getParam('github_username')
    
    // WebView : Carrega qualquer elemento na tela ao passa um caminho em source
    return <WebView style={{ flex: 1 }} source={{ uri: `https://github.com/${githubUsername}` }} />
}
import React from 'react'
import './DevItem.css'

export default function DevItem({ dev }) {
    console.log('Criar função de deletar o dev')
    return (
        <li className="dev-item">
            <header>
                <img src={dev.avatar_url} alt="Joel Silva" />
                <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                </div>
            </header>
            <p>{dev.bio}</p>
            <div className="navegacao">
                <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
                <a href="www.google.com.br">Remover</a>
            </div>
        </li>
    )
}
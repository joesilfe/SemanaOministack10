import React from 'react'
import './Aside.css'

import { useDispatch } from 'react-redux'

import DevForm from './../Templates/DevForm/DevForm'

export default function Aside({ api }) {
    const dispatch = useDispatch()

    async function handlerAddDev(data) {
        const response = await api.post('/devs', data)        
        dispatch({type: 'ADD_DEV', dev: response.data })
    }
    
    return (
        <aside>
            <strong>Cadastrar</strong>
            <DevForm onSubmit={handlerAddDev} />
        </aside>
    )
}
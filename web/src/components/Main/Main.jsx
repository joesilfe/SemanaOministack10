import React, { useState, useMemo } from 'react'
import './Main.css'
import { useSelector } from 'react-redux'
import DevItem from './../Templates/DevItem/DevItem'

export default function Main({ api }) {
    
    const [devs, setDevs] = useState([])
    const devStore = useSelector(store => store)
    
    useMemo(() => {
        async function loadDevs() {
            const response = await api.get('/devs')
            return devStore.dev.length === 0 ? setDevs(response.data) : setDevs(d => [...d, devStore.dev])
        }

        loadDevs()
    }, [api, devStore])

    return (
        <main>
            <ul>
                {devs.map((dev) => (
                    <DevItem dev={dev} key={dev._id} />
                ))}
            </ul>
        </main>
    )
}
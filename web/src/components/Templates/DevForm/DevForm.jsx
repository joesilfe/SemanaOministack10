import React, { useState, useEffect } from 'react'
import './DevForm.css'

export default function DevForm({ onSubmit }) {

    const [github_username, setGithub_username] = useState('')
    const [techs, setTechs] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    async function handlerSubmitAddDev(e) {
        e.preventDefault()

        onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        })

        setGithub_username('')
        setTechs('')
        setLatitude('')
        setLongitude('')
    }

    useEffect(() => {
        // navigator.geolocation.getCurrentPosition(): é uma função disponível no navegador que pega a localização caso o usuário permitir.
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords

                setLatitude(latitude)
                setLongitude(longitude)
            },
            (err) => {
                console.log(err)
            }, {
            timeout: 30000,
        }
        )
    }, [])

    return (
        <form onSubmit={handlerSubmitAddDev}>
            <div className="input-block">
                <label htmlFor="github_username">Usuário do Github</label>
                <input name="github_username"
                    id="github_username"
                    type="text"
                    value={github_username}
                    onChange={e => setGithub_username(e.target.value)}
                    required />
            </div>

            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input name="techs"
                    id="techs"
                    type="text"
                    value={techs}
                    onChange={e => setTechs(e.target.value)}
                    required />
            </div>

            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input name="latitude"
                        id="latitude"
                        type="number"
                        value={latitude}
                        onChange={e => setLatitude(e.target.value)}
                        required />
                </div>

                <div className="input-block">
                    <label htmlFor="Longitude">Longitude</label>
                    <input name="Longitude"
                        id="Longitude"
                        type="number"
                        value={longitude}
                        onChange={e => setLongitude(e.target.value)}
                        required />
                </div>
            </div>
            <button type="submit">Salvar</button>
        </form>
    )
}
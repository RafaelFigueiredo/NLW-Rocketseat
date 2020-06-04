import React, {useEffect, useState, ChangeEvent} from 'react'
import {Link} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import {Map, TileLayer, Marker} from 'react-leaflet'
import api from '../../services/api'

import axios from 'axios'


import './styles.css'

import logo from '../../assets/logo.svg'

interface Item{
    id: number
    title: string
    image_url: string

}

interface IBGEUFResponse{
    sigla: string
}
interface IBGECityResponse{
    nome: string
}

const CreatePoint = ()=>{
    const [items, setItems] = useState<Item[]>([])
    const [ufs, setUfs] = useState<string[]>([])
    const [cities, setCities] = useState<string[]>([])
    const [selectedUf, setSelectedUf] = useState<string>('0')
    const [selectedCity, setSelectedCity] = useState<string>('0')

    useEffect(()=>{
        api.get('items')
            .then(response =>{
                setItems(response.data)
            })
    }, [])

    useEffect(()=>{
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response =>{
                const ufInitials = response.data.map(uf=>uf.sigla).sort()
                setUfs(ufInitials)
            })
    }, [])

    useEffect(()=>{
        if(selectedUf ==='0') return
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then(response =>{
                const citieNames = response.data.map(city=>city.nome).sort()
                setCities(citieNames)
            })

    }, [selectedUf])


    function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>){
        const uf = event.target.value
        setSelectedUf(uf)
    }

    function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>){
        const city = event.target.value
        setSelectedCity(city)
    }

    return(
        <div id="page-create-point">
            <header>
                <img src={logo} alt=""/>
            <Link to="/">
                <FiArrowLeft />
                Voltar para home
            </Link>
            </header>

            <form action="">
                <h1>
                    Cadastro do<br/>ponto de coleta
                </h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                            />
                        </div>
                    </div>


                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço abaixo</span>
                    </legend>
                    <Map center={[-22.9071094,-43.1253929]} zoom={15} >
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[-22.9071094,-43.1253929]} />
                    </Map>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select
                                name="uf"
                                id="uf"
                                value={selectedUf}
                                onChange={handleSelectedUf}
                            >
                                    
                                <option value="0">Selecione uma UF</option>
                                {ufs.map( uf=>(
                                    <option
                                        key={uf}
                                        value={uf}
                                    >{uf}</option>
                                ))}
                            </select>
                        </div>
                    
                    
                        <div className="field">
                            <label htmlFor="cidade">Cidade</label>
                            <select name="cidade" id="cidade" value={selectedCity} onChange={handleSelectedCity}>
                                <option value="0">Selecione uma cidade</option>
                                {cities.map( city=>(
                                    <option
                                        key={city}
                                        value={city}
                                    >{city}</option>
                                ))}
                            </select>
                        </div>
                    
                    </div>

                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mis ítens abaixo</span>
                    </legend>
                    <ul className="items-grid">
                        {items.map(item =>(
                            <li key={item.id}>
                                <img src={item.image_url} alt={item.title}/>
                                <span>{item.title}</span>
                            </li>
                        ))}
                        
                    </ul>
                </fieldset>

                <button type="submit">
                    Cadastrar ponto de coleta
                </button>

            </form>
            
        </div>
    )
}

export default CreatePoint
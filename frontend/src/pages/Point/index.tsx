import React, { useState, useEffect, ChangeEvent, FormEvent} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { LeafletMouseEvent } from 'leaflet'
import { Map, TileLayer, Marker } from 'react-leaflet'

import api from '../../services/api'
import ibge from '../../services/ibge'

import logo from '../../assets/logo.svg'

import './styles.css'

interface Item {
  id: number
  title: string
  image_url: string
}

interface IBGEUFResponse {
  sigla: string
}

interface IBGECityResponse {
  nome: string
}

const Point = () => {
  const [items, setItems] = useState<Item[]>([])
  const [ufs, setUfs] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])

  const [initialPosition, setInicialPosition] = useState<[number, number]>([0, 0])
  const [inputData, setInputData] = useState({
    name: '',
    email: '',
    whatsapp: ''
  })

  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [selectedUf, setSelectedUf] = useState('0')
  const [selectedCity, setSelectedCity] = useState('0')
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])

  const history = useHistory()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords

      setInicialPosition([
        latitude,
        longitude
      ])
    })
  }, [])

  useEffect(() => {
    api.get('/items')
    .then(response => setItems(response.data))
  }, [])

  useEffect(() => {
    ibge.get<IBGEUFResponse[]>('/estados')
    .then(response => {
      const ufInitials = response.data.map(uf => uf.sigla)

      setUfs(ufInitials)
    })
  }, [])

  useEffect(() => {
    if (selectedUf === '0') return;

    ibge.get<IBGECityResponse[]>(`/estados/${selectedUf}/municipios`)
    .then(response => {
      const cityNames = response.data.map(city => city.nome)

      setCities(cityNames)
    })
  }, [selectedUf])

  function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value

    setSelectedUf(uf)
  }

  function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value

    setSelectedCity(city)
  }

  function handleSelectedItem(id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id)

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id)

      setSelectedItems(filteredItems)
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([
      event.latlng.lat,
      event.latlng.lng
    ])
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setInputData({ ...inputData, [name]: value })
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const { name, email, whatsapp } = inputData
    const [ latitude, longitude ] = selectedPosition
    const city = selectedCity
    const uf = selectedUf
    const items = selectedItems

    const data = {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    }

    await api.post('/points', data)

    history.push('/success')
  }

  return (
    <div id="page-create-point">
      <header>
        <Link to="/">
          <FiArrowLeft />

          Voltar para página inicial
        </Link>

        <img src={logo} alt="Ecoleta - Seu marketplace de coleta de resíduos"/>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Cadastro do <br /> ponto de coleta</h1>

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
            onChange={handleInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="name">E-mail</label>
              
              <input
              type="email"
              name="email"
              id="email"
              onChange={handleInputChange}
              />
            </div>

            <div className="field">
              <label htmlFor="name">Whatsapp</label>
              
              <input
              type="text"
              name="whatsapp"
              id="whatsapp"
              onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>

            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={initialPosition} zoom={15} onclick={handleMapClick}>
            <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={selectedPosition} />
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
                <option value="uf">Selecione uma UF</option>

                {ufs.map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>

              <select
              name="city"
              id="city"
              value={selectedCity}
              onChange={handleSelectedCity}
              >
                <option value="city">Selecione uma cidade</option>

                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>

            <span>Selecione um ou mais ítens abaixo</span>
          </legend>

          <ul className="items-grid">
            { items.map(item => (
            <li
            key={item.id}
            onClick={() => handleSelectedItem(item.id)}
            className={selectedItems.includes(item.id) ? 'selected' : ''}
            >
              <img src={item.image_url} alt={item.title}/>

              <span>{item.title}</span>
            </li>
            )) }
          </ul>
        </fieldset>

        <button type="submit">
          Cadastrar ponto de coleta
        </button>
      </form>
    </div>
  )
}

export default Point
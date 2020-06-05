import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet'

import logo from '../../assets/logo.svg'

import './styles.css'

const Point = () => {
  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta - Seu marketplace de coleta de resíduos"/>

        <Link to="/">
          <FiArrowLeft />

          Voltar para página inicial
        </Link>
      </header>

      <form>
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
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="name">E-mail</label>
              
              <input
              type="email"
              name="email"
              id="email"
              />
            </div>

            <div className="field">
              <label htmlFor="name">Whatsapp</label>
              
              <input
              type="text"
              name="whatsapp"
              id="whatsapp"
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>

            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={[-7.0084946, -37.2651076]} zoom={15}>
            <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[-7.0084946, -37.2651076]} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select name="uf" id="uf">
                <option value="uf">Selecione uma UF</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city">
                <option value="city">Selecione uma cidade</option>
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
            <li className="selected">
              <img src="http://localhost:3333/uploads/baterias.svg" alt="Pilhas e Baterias"/>
              <span>Pilhas e Baterias</span>
            </li>

            <li>
              <img src="http://localhost:3333/uploads/baterias.svg" alt="Pilhas e Baterias"/>
              <span>Pilhas e Baterias</span>
            </li>

            <li>
              <img src="http://localhost:3333/uploads/baterias.svg" alt="Pilhas e Baterias"/>
              <span>Pilhas e Baterias</span>
            </li>

            <li>
              <img src="http://localhost:3333/uploads/baterias.svg" alt="Pilhas e Baterias"/>
              <span>Pilhas e Baterias</span>
            </li>

            <li>
              <img src="http://localhost:3333/uploads/baterias.svg" alt="Pilhas e Baterias"/>
              <span>Pilhas e Baterias</span>
            </li>

            <li>
              <img src="http://localhost:3333/uploads/baterias.svg" alt="Pilhas e Baterias"/>
              <span>Pilhas e Baterias</span>
            </li>
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
import React, { useEffect} from 'react'
import { FiCheckCircle } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'

import './styles.css'

const Success = () => {
  const history = useHistory()

  useEffect(() => {
    setTimeout(() => history.push('/'), 1500)
  }, [])

  return (
    <div id="page-success-box">
      <div className="box">
        <FiCheckCircle size={75} color='#2FB86E' />
        <h1>Ponto de coleta <br /> cadastrado com sucesso</h1>
      </div>
    </div>
  )
}

export default Success
import React, { useEffect, useState } from 'react'
import api from '../../routes/api.js'

import { Container, Spinner } from 'react-bootstrap'

import EventosTabla from './_tablaEventos.jsx'
import NewEvento from './_newEvento.jsx'
import './eventos.css'
import { useGrupoContext } from '../../context/grupoContext/grupoContext.jsx'
import { useuserContext } from '../../context/userContext/userContext.jsx'
import { useEventoContext } from '../../context/eventosContext/eventoContext.jsx'

const Eventos = () => {


  const { dataGrupos, fetchData} = useGrupoContext();
  const { dataUsers , fetchUsers, usuario } = useuserContext();
  const { dataEventos, fetchEventos, updatePending} = useEventoContext();

     
  let user = JSON.parse(localStorage.getItem("user"));

  const [pending,setPending]=useState(true)

  useEffect(() => {
 
    setPending(true);

    fetchUsers()
    fetchEventos()   
    fetchData() 
    
    updatePending(false)
    setPending(false);

  }, []);

  if(pending){
    return(<Container className='min-vh-100 w-100 d-flex justify-content-center align-items-center'><Spinner animation="border" variant="primary" /></Container>)
  }else{
    return (
      <>
        <div className='Container m-3'>
            <nav className="navvertical mt-4 p-2">
              <ul>
                <li>
                </li>
                    <NewEvento  eventos={dataEventos} user={user} grupos={dataGrupos} />
              </ul>
            </nav>
            <div className='w-100 pt-5'>
              <EventosTabla eventos={dataEventos} user={user} grupos={dataGrupos} />
            </div>
        </div>
      </>
)}
}

export default Eventos
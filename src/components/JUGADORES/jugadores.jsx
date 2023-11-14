import React, { useEffect, useState } from 'react'

import { Container, Spinner } from 'react-bootstrap'

import api from '../../routes/api.js'
import JugadoresTabla from './_jugadoresTabla.jsx'

import './jugadores.css'
import NewJugador from './_newJugador.jsx'
import NewCarga from './_newCarga.jsx'
import NewRetiro from './_newRetiro.jsx'
import { useGrupoContext } from '../../context/grupoContext/grupoContext.jsx'
import { useuserContext } from '../../context/userContext/userContext.jsx'
import { useJugadoresContext } from '../../context/jugadoresContext/jugadoresContext.jsx'



const Jugadores = () => {

  const { dataGrupos, fetchData} = useGrupoContext();
  const { dataUsers , fetchUsers, usuario } = useuserContext();
  const { dataJugadores , fetchJugadores, updatePending } = useJugadoresContext();
  
  let user = JSON.parse(localStorage.getItem("user"));

  const [pending,setPending]=useState(true)

  useEffect(() => {
    setPending(true);

    fetchUsers()
    fetchJugadores()   
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
              <nav className="navvertical mt-4">
                <ul>
                  <li>
                      <NewJugador jugadores={dataJugadores} user={user} grupos={dataGrupos} />
                      <hr />
                  </li>
                  <li>
                      <NewCarga jugadores={dataJugadores} user={user} grupos={dataGrupos}/>                   
                      <hr />
                  </li>
                  <li>
                      <NewRetiro jugadores={dataJugadores} user={user} grupos={dataGrupos}/>                     
                      {/* <hr /> */}
                  </li>
                  {/* <li>
                      <a href=""></a>
                      <hr />
                  </li>
                  <li>
                      <a href=""></a>
                  </li> */}
                </ul>
              </nav>
              <div className='w-100 pt-5'>
                <JugadoresTabla jugadores={dataJugadores} user={user} grupos={dataGrupos} />
              </div>
          </div>
        </>
  )}
}

export default Jugadores
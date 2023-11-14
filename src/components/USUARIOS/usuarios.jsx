import React, { useEffect, useState } from 'react'
import TablaUsuarios from './_usuariosTabla'

import { Container, Spinner } from 'react-bootstrap'

import api from '../../routes/api.js'

import './usuarios.css'
import NewUsuario from './_newUsuario'
import { useGrupoContext } from '../../context/grupoContext/grupoContext.jsx'
import { useuserContext } from '../../context/userContext/userContext.jsx'


const Grupo = () => {


  let user = JSON.parse(localStorage.getItem("user"));

  const { dataUsers , fetchUsers, pending, usuario, updatePending } = useuserContext();

  useEffect(() => {
    fetchUsers()
    updatePending(false)
  }, []);

    if(pending){
      return(<Container className='min-vh-100 w-100 d-flex justify-content-center align-items-center'><Spinner animation="border" variant="primary" /></Container>)
    }else{
      return (
        <>
          <div className='Container m-3'>
              <nav className="navvertical mt-4">
                <ul>
                 {user.rol === "agente" ? <li><NewUsuario users={dataUsers} nombre={"User root"} tipo={"agente"} /><hr /></li> : <></> }
                 {user.rol === "agente" ? <li><NewUsuario users={dataUsers} nombre={"Agente"} tipo={"representante"} /><hr /></li> : <></> }
                  <li>
                      <NewUsuario users={dataUsers} tipo={"admin"} nombre={"Admin"}/>
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
                <TablaUsuarios users={dataUsers} usuario={user} />
              </div>
          </div>
        </>
  )}
}

export default Grupo
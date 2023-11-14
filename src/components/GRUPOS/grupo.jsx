import React, { useEffect, useState } from 'react'
import NewGrupo from './_newGrupo'
import TablaGrupo from './_grupoTabla'
import AddRepre from './_addRepresentante'
import AddAdmin from './_addAdmin'
import DeleteAdmin from './_deleteAdmin'
import DeleteRepre from './_deleteRepre'
import { Container, Spinner } from 'react-bootstrap'

import api from '../../routes/api.js'

import './grupo.css'
import { useGrupoContext } from '../../context/grupoContext/grupoContext.jsx'
import { useuserContext } from '../../context/userContext/userContext.jsx'


const Grupo = () => {

  let user = JSON.parse(localStorage.getItem("user"));

  const { dataGrupos, pending, fetchData, updatePending } = useGrupoContext();
  const { dataUsers , fetchUsers, usuario } = useuserContext();


  useEffect(()=>{
      fetchData()

      fetchUsers()

      updatePending(false)
    },[])


    if(pending){
      return(<Container className='min-vh-100 w-100 d-flex justify-content-center align-items-center'><Spinner animation="border" variant="primary" /></Container>)
    }else if(user.rol === "admin"){
      {window.location.href = "/home"}
    }else{
      return (
        <>
          <div className='Container m-3'>
              <nav className="navvertical">
                <ul>
                  {user.rol === "agente" ? <li><NewGrupo grupos={dataGrupos}/><hr /></li> : <></> }
                  {user.rol === "agente" ? <li><AddRepre grupo={dataGrupos} users={dataUsers} /><hr /></li> : <></> }
                  {user.rol === "agente" ? <li><DeleteRepre grupo={dataGrupos} users={dataUsers} /><hr /></li> : <></> }
                  <li>
                      <AddAdmin grupo={dataGrupos} users={dataUsers}  usuario={user} />
                      <hr />
                  </li>
                  <li>
                      <DeleteAdmin grupo={dataGrupos} users={dataUsers}  usuario={user}/>
                  </li>
                </ul>
              </nav>
              <div className='w-100 pt-5'>
                <TablaGrupo grupos={dataGrupos} usuario={user} />
              </div>
          </div>
        </>
  )}
}

export default Grupo
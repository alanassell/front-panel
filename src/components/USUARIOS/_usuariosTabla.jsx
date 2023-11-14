import React, { useEffect, useMemo, useState } from 'react'
import { Container, Spinner } from 'react-bootstrap';
import DataTable, { createTheme } from 'react-data-table-component'
import UsuariosInfo from './_usuariosInfo';
import UsuariosEdit from './_usuariosEdit';

import './usuarios.css'

const Tabla = ({users,usuario}) => {

  const [data, setData] = useState(users)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (usuario.rol === 'representante') {
      const usersTabla = users.filter((elem) => {
        if (elem.rol === 'admin') {
          return usuario.grupo.some((grups) => elem.grupo.length === 0 || elem.grupo[0].nombre === grups.nombre);
        }
        return false;
      });
      setData(usersTabla);
    } else {
      setData(users);
    }
  }, [users, usuario.rol, usuario.grupo]);
      
  function handleChangeSelect(evt) {
    setPending(true)
    const value = evt.target.value;
    if(value === ""){
      setData(users)
      setPending(false)
    }else{
      let usuarios = []
      users.map((elem)=>{
        if(elem.rol === value){
          usuarios.push(elem)
          setPending(false)
        }
      })
      setData(usuarios)
    }
  }

  const columns = [
      {
          name: 'Nombre',
          selector: row => row.name,
      },
      { 
          name: 'Rol',
          selector: row => {if(row.rol==="agente"){return "User root"}
          else if(row.rol==="representante"){return "Agente"} 
          else {return row.rol}},
      },
      { 
          name: 'Grupo',
          selector: row => {
            if(row.grupo.length === 0){
              return "Sin grupo"
          }else if(row.grupo.length === 1){
            return row.grupo[0].nombre
          }else{
            return row.grupo.length
          }},
      },
      { 
          name: 'Ingreso',
          selector: row => row.fechaCreacion
      },
      { 
          name: 'Operaciones',
          selector: row => <UsuariosEdit user={row} users={users} />,
        },
      { 
          name: 'Info',
          selector: row => <UsuariosInfo user={row} />,
        }
    ];

    
    
  const conditionalRowStyles = [
    {
      when: row => row,
      style: {
        backgroundColor: '#141e30',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#0d131e',
            cursor: 'pointer',
        },
      },
    }
  ];

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    


    function handleFilterChange(e) {
      const value = e.target.value || '';
      setFilterText(value);
    }
    
    const filteredData = useMemo(() => {
      if (!filterText) return data;
      return data.filter((row) =>
        row.name.toLowerCase().includes(filterText.toLowerCase())
      );
    }, [data, filterText]);    
    
    createTheme('solarized', {
        text: {
          primary: '#fff',
          secondary: '#fff',
        },
        background: {
          default: '#141e30',
        },
        context: {
          background: '#141e30',
          text: '#FFFFFF',
        },
        divider: {
          default: 'rgba(0,0,0,.6)',
        },
        action: {
          button: '#FFFFFF',
          hover: '#FFFFFF',
          disabled: '#FFFFFF',
        },
      }, 'dark');
  
  if(usuario.rol === "admin"){window.location.href = "/home"}
  else{
    return (
      <>
          <div className='w-100 d-flex flex-column justify-content-center align-items-center'>
              {usuario.rol !== "representante" ? (
                <div className='containerTableSelect w-75 d-flex justify-content-end'>
                <span className="material-symbols-outlined">visibility</span>   
                <select className='ms-2' name="nombreGrupo" id="cars" onClick={handleChangeSelect}>
                      <option value="">Todos</option>
                      <option value="admin">Admins</option>
                      <option value="representante">Agentes</option>
                      <option value="agente">User root</option>
                </select> 
              </div>
              ) : null}
                <div className='containerTableSearch w-75 d-flex justify-content-end'>
                  <span className="material-symbols-outlined">search</span>
                  <input
                          type="text"
                          placeholder="Buscar usuario"
                          value={filterText}
                          onChange={handleFilterChange}
                          className="w-50" 
                    /> 
              </div>
              <Container className='containerTableGrup m-0 p-0'>
              <DataTable theme="solarized"
                      columns={columns}
                      data={filteredData}
                      pagination
                      fixedHeader
                      conditionalRowStyles={conditionalRowStyles}
                      progressPending={pending}
                      progressComponent={<Container className='d-flex justify-content-center align-items-center'><Spinner animation="border" variant="primary" /></Container>}/>
              </Container>
          </div>
      </>
    )}
}

export default Tabla
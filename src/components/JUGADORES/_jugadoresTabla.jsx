   import React, { useEffect, useMemo, useState } from 'react'
  import { Container, Spinner } from 'react-bootstrap';
  import DataTable, { createTheme } from 'react-data-table-component'
  
  import './jugadores.css'
  
  const Tabla = ({jugadores,user,grupos}) => {
  
    const [pending, setPending] = useState(false)
  
    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
        },
        {
            name: 'Nombre',
            selector: row => row.nombre,
        },
        { 
            name: 'Saldo',
            selector: row => '$ '+row.saldo,
        },
        { 
            name: 'Puntos',
            selector: row => row.puntos
        },
        { 
            name: 'Grupo',
            selector: row => row.grupo[0].nombre
        },
        // { 
        //     name: 'Operaciones',
        //     selector: row => <UsuariosEdit user={row} users={users} />,
        //   },
        { 
            name: 'Info',
            selector: row => "info",
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
        if (!filterText) return jugadores;
        return jugadores.filter((row) =>
          row.nombre.toLowerCase().includes(filterText.toLowerCase())
        );
      }, [jugadores, filterText]);
      
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
  
    return (
      <>
          <div className='w-100 d-flex flex-column justify-content-center align-items-center'>
              {/* {user.rol !== "admin" ? (<div className='containerTableSelect w-75 d-flex justify-content-end'>
                  <span className="material-symbols-outlined">visibility</span>   
                  <select className='ms-2' name="nombreGrupo" id="cars" onChange={handleChangeSelect}>
                    <option value="">Todos</option>
                    {user.rol !== "agente" ? (
                      user.grupo.map((elem, i) => (
                        <option key={i+"userselect"} value={elem.nombre}>{elem.nombre}</option>
                      ))
                    ) : (
                      grupos.map((elem, i) => (
                        <option key={i+"gruposelect"} value={elem.nombre}>{elem.nombre}</option>
                      ))
                    )}
                  </select>
                </div>):null} */}
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
    )
  }
  
  export default Tabla
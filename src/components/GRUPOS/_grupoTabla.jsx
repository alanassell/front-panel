import React, { useEffect, useMemo, useState } from 'react'
import { Container } from 'react-bootstrap';
import DataTable, { createTheme } from 'react-data-table-component'
import DeleteGrupo from './_deleteGrupo.jsx';
import GrupoInfo from './_grupoInfo'

const Tabla = ({grupos, usuario}) => {

  const [data, setData] = useState([]) 

  useEffect(()=>{
    if(usuario.rol === "representante"){
      let grupo = []
      usuario.grupo.map((elem)=>{
        grupos.map((grup)=>{
          if(elem.nombre === grup.nombre){
            grupo.push(grup)
          }
        })
        setData(grupo);
      })
    }else{
      setData(grupos)
    }
  },[grupos])
  
  const columns = [
      {
          name: 'Nombre',
          selector: row => row.nombre,
      },
      { 
          name: 'Agente',
          selector: row => {
            if(row.representante.length > 0){
              return (row.representante[0].name)}
            else{
              return ("Sin agente")}},
      },
      { 
          name: 'Admins',
          selector: row => row.admins.length
      },
      { 
          name: 'Jugadores',
          selector: row => row.jugadores.length
      },
      // { 
      //     name: 'Operaciones',
      //     selector: row => <DeleteGrupo nombre={row.nombre} grupo={data} />,
      // },
      { 
          name: 'Info',
          selector: row => <GrupoInfo grupo={row} />,
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

	const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<input onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
		);
	}, [filterText, resetPaginationToggle]);

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
        <div className='w-100 d-flex justify-content-center align-items-center'>
            <Container className='containerTableGrup m-0 p-0'>
            <DataTable
                    theme="solarized"
                    columns={columns}
                    data={data}
                    pagination
                    fixedHeader  
                    fixedHeaderScrollHeight="50vh"
                    conditionalRowStyles={conditionalRowStyles}
                    />
            </Container>
        </div>
    </>
  )
}

export default Tabla
  import React, { useEffect, useState } from 'react';
  import api from '../../routes/api.js';
  import { Alert, Button, Col, Container, Row, Spinner } from 'react-bootstrap';
  import CardMesasOff from './_cardMesasOff.jsx';
  import './mesas.css'

  const MesasTotalesTerminadas = () => {

    let user = JSON.parse(localStorage.getItem("user"));
    
    const [mesasOff, setMesasOff] = useState();
    const [dataGrupos,setDataGrupos]=useState([])
    const [pending,setPending]=useState(false)
    const [grupo,setGrupo]=useState()
    const [show, setShow] = useState(true);

    const [fechaFiltro, setFechaFiltro] = useState('')

    useEffect(() => {
        if(user.rol === "admin" && user.grupo[0].nombre){
            setGrupo(user.grupo[0].nombre);
            const fetchMesasOff = async () => {
            try {
                const response = await api.get(`/api/mesas/totales/off/${user.grupo[0].nombre}`);
                if (response.data) {
                setMesasOff(response.data);
                }
            } catch (error) {
                console.error(error);
            }
            };

            fetchMesasOff();
        }else{
          setPending(true);
        Promise.all([
          api.get("/api/grupos").then((response) => response.data)
        ])
        .then(([grupos]) => {
            if (grupos) {
              setDataGrupos(grupos);
            }
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            setPending(false);
          });
        }
      }, []);

      const buscarMesas = async () =>{
      setPending(true);
      Promise.all([
        api.get(`/api/mesas/totales/off/${grupo}`).then((response) => response.data),
      ])
      .then(([mesasOff]) => {
      setPending(true);
        if (mesasOff) {
          console.log(mesasOff);
          setMesasOff(mesasOff);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setPending(false);
      });
    }
    async function handleChange(evt) {
      const grupo = evt.target.value;
      setGrupo(grupo);
    }

    const handleDateChange = (evt) => {
      const fecha = evt.target.value;
      setFechaFiltro(fecha);
    };
  
    function cambiarFormatoFecha(fecha) {
      const partes = fecha.split('-');
      const nuevaFecha = `${partes[2]}-${partes[1]}-${partes[0]}`;
      return nuevaFecha;
    }
  
    const mesasFiltradas = mesasOff
      ? mesasOff.filter((mesa) => {
        console.log(mesa.day);
        console.log(fechaFiltro);
          return fechaFiltro ? mesa.day === cambiarFormatoFecha(fechaFiltro) : true;
        })
      : [];

    if(user.rol !== "admin" && !mesasOff){
      return (
        <>
        <div className="d-flex align-items-center justify-content-center vh-100">

              {pending ? (
                <Container className='min-vh-100 w-100 d-flex justify-content-center align-items-center'>
                    <Spinner animation="border" variant="primary" />
                </Container>
                ):(
                <Alert show={show} variant="success" className='w-50'>
                    <Alert.Heading>Inserte un grupo</Alert.Heading>
                    <p>
                    <h6>Grupo:</h6>
                    {user.rol === "agente" ? (
                      <select name="nombreGrupo" id="cars" onClick={handleChange}>
                      <option value=""></option>
                      {dataGrupos.map((elem, i) => {
                          return <option value={elem.nombre} key={i}>{elem.nombre}</option>
                      })}
                      </select>):
                      ( 
                          <select name="nombreGrupo" id="cars" onClick={handleChange}>
                          <option value=""></option>
                          {user.grupo.map((elem, i) => {
                              return <option value={elem.nombre} key={i}>{elem.nombre}</option>
                          })}
                          </select>
                      )}
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => {buscarMesas(), setPending(true)}} variant="outline-success">
                          Ok
                        </Button>
                      </div>
                </Alert>
              )}

              
          </div>
        </>
      )
    }else{
          return (
              <div className='mx-3 d-flex flex-column align-items-center justify-content-center'>
                  <h3 className='text-white pt-3'>Filtrar mesas:</h3>
                  <div className='d-flex mt-3'>
                      <p className='text-white '>Seleccione la fecha:</p>
                      <input className='mx-2' type="date" onChange={handleDateChange} value={fechaFiltro} />
              </div>
              <div className='w-100 mt-2'>
                  <Container>
                            {mesasFiltradas.length > 0 ? (
                            <Row className="justify-content-md-center">
                                {mesasFiltradas.map((mesa, index) => { 

                                  return <Col xs lg="auto" className='m-2'><CardMesasOff mesa={mesa} /></Col>
                                })}
                            </Row>
                            ) : (
                              <h4 className='text-white '>No se encontraron en fecha seleccionada.</h4>
                            )}
                  </Container>
                </div>
              </div>
          );
      };
  }

  export default MesasTotalesTerminadas;

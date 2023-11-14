import React, { useEffect, useState } from 'react'
import ElegirMesa from './_elegirMesa'
import api from '../../routes/api.js'
import './mesas.css'

import { Alert, Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap'
import CardMesasOn from './_cardMesasOn'

     
export const MesasEnJuego = () => {

  let user = JSON.parse(localStorage.getItem("user"));

  const [dataEventos,setDataEventos]=useState([])
  const [dataGrupos,setDataGrupos]=useState([])
  const [dataJugadores,setDataJugadores]=useState([])
  const [usuario,setUsuario]=useState()
  const [mesasOn,setMesasOn]=useState()
  const [pending,setPending]=useState(true)
  const [grupo,setGrupo]=useState()

  const [show, setShow] = useState(true);

  useEffect(() => {
    if(user.rol === "admin" && user.grupo[0].nombre){
      setGrupo(user.grupo[0].nombre);
      Promise.all([
        api.get(`/api/mesas/on/${user.grupo[0].nombre}`).then((response) => response.data),
        api.get(`/api/eventos/${user.grupo[0].nombre}`).then((response) => response.data),
        api.get("/api/users").then((response) => response.data),
        api.get("/api/grupos").then((response) => response.data),
        api.get("/api/jugadores/tabla").then((response) => response.data),
      ])
      .then(([mesasOn , eventos, users, grupos, jugadores]) => {
        const foundUser = users.find((elem) => elem.name === user.name);
        let jugadoresTabla = [];
          if (foundUser) {
            setUsuario(foundUser);
          }
          if (grupos) {
            setDataGrupos(grupos);
          }
        if (mesasOn) {
          setMesasOn(mesasOn);
        }
        if (eventos) {
          setDataEventos(eventos);
        }
        if (user.rol === "admin") {
          jugadoresTabla = jugadores.filter(
            (juga) => juga.grupo[0].nombre === user.grupo[0].nombre
          );
        } else if (user.rol === "representante") {
          user.grupo.forEach((grupo) => {
            jugadoresTabla = jugadores.filter(
              (juga) => juga.grupo[0].nombre === grupo.nombre
            );
          });
        } else {
          jugadoresTabla = jugadores;
        }
        setDataJugadores(jugadoresTabla); 
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setPending(false);
      });
    }else{
      setPending(true);
      Promise.all([
        api.get("/api/users").then((response) => response.data),
        api.get("/api/grupos").then((response) => response.data)
      ])
      .then(([users, grupos]) => {
          const foundUser = users.find((elem) => elem.name === user.name);
          if (foundUser) {
            setUsuario(foundUser);
          }
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
      api.get(`/api/mesas/on/${grupo}`).then((response) => response.data),
      api.get(`/api/eventos/${grupo}`).then((response) => response.data)
    ])
    .then(([mesasOn , eventos]) => {
    setPending(true);
      if (mesasOn) {
        setMesasOn(mesasOn);
      }
      if (eventos) {
        setDataEventos(eventos);
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

  if(user.rol !== "admin" && !mesasOn){
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
      <>
      <div className='Container m-3'>
              <nav className="navvertical mt-4 p-2">
                <ul>
                  <li>
                      <ElegirMesa eventos={dataEventos} user={user} jugadores={dataJugadores}/>
                  </li>
                </ul>
              </nav>
              <div className='w-100 pt-5'>
              <h3 className='text-center text-white'>Grupo: {grupo.toUpperCase()} </h3>
                <Container>
                  <Row className="justify-content-md-center">
                      {mesasOn?.map((mesa)=>{
                        return <Col xs lg="auto" className='m-2'><CardMesasOn mesa={mesa} /></Col>
                      })}
                  </Row>
                </Container>
              </div>
          </div>
      </>
    )
  }

}

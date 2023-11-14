import React, { useEffect, useState } from 'react'
import api from '../../routes/api.js'
import moment from 'moment'
import { Alert, Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap'

import './balance.css'
     
export const Balance = () => {

  let user = JSON.parse(localStorage.getItem("user"));

  const [dataGrupos,setDataGrupos]=useState([])
  const [mesasBalance,setMesasBalance]=useState([])
  const [usuario,setUsuario]=useState()
  const [mesasOff,setMesasOff]=useState()
  const [pending,setPending]=useState(true)
  const [grupo,setGrupo]=useState()
  const [grupoBal,setGrupoBal]=useState()

  const [balanceDesde, setBalanceDesde] = useState();
  const [balanceHasta, setBalanceHasta] = useState();
  
  const [mamTotal, setMamTotal] = useState(0);
  const [torTotal, setTorTotal] = useState(0);
  const [campToal, setCampTotal] = useState(0);
  
  const [show, setShow] = useState(true);



  useEffect(() => {
      setPending(true);
      Promise.all([
        api.get("/api/users").then((response) => response.data),
        api.get("/api/grupos").then((response) => response.data),
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
  }, []);

  const buscarMesas = async () =>{
    setPending(true);
    setGrupoBal(grupo)
    Promise.all([
      api.get(`/api/mesas/totales/off/${grupo}`).then((response) => response.data),
    ])
    .then(([mesasOff]) => {
    setPending(true);
      if (mesasOff) {
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

  const handleBalanceDesdeChange = (evt) => {
    const fecha = evt.target.value;
    setBalanceDesde(fecha);
  }

  const handleBalanceHastaChange = (evt) => {
    const fecha = evt.target.value;
    
    setBalanceHasta(fecha);
  }

  function convertirFormatoFecha(fecha) {
    const partes = fecha.split('-');
    const nuevaFecha = `${partes[2]}-${partes[1]}-${partes[0]}`;
    return nuevaFecha;
  }
  
  function verificarFechaEnRango(fecha, fechaInicio, fechaFin) {
    const fechaTimestamp = new Date(fecha).getTime();
    const fechaInicioTimestamp = new Date(fechaInicio).getTime();
    const fechaFinTimestamp = new Date(fechaFin).getTime();

    return fechaTimestamp >= fechaInicioTimestamp && fechaTimestamp <= fechaFinTimestamp;
  }

  function filtrarFechasAntes() {
    let mesasBalance = []

    mesasOff?.map((elem)=>{
      let fechaMesa = convertirFormatoFecha(elem.day)
      if(verificarFechaEnRango(fechaMesa,balanceDesde,balanceHasta)){
        mesasBalance.push(elem)
      }
    })
    console.log(mesasBalance);
    setMesasBalance(mesasBalance)
  }

  function comicionTotalMesas(){
    let comicion = 0
    mesasBalance.map((elem)=>{
      comicion = comicion + elem.evento.comicion
      // if(elem.evento.categoria === "mam"){
      //   setMamTotal(mamTotal+1)
      // }
      // if(elem.evento.categoria === "tor"){
      //   setMamTotal(torTotal+1)
      // }
      // if(elem.evento.categoria === "camp"){
      //   setMamTotal(campToal+1)
      // }
    })
    return comicion
  }


  if(user.rol !== "admin" && !grupoBal){
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
        <div className='containerBalance m-3'>
          <h3>BALANCE DEL GRUPO: {grupo} </h3> 
          <div>
            <div>
              <h3>Balance Desde:</h3>
              <input className='mx-2' type="date" onChange={handleBalanceDesdeChange} value={balanceDesde}/>
            </div>
            <div>
              <h3>Balance Hasta:</h3>
              <input className='mx-2' type="date" onChange={handleBalanceHastaChange} value={balanceHasta}/>
            </div>
          </div>
          <button onClick={()=>{if(!balanceDesde || !balanceHasta){alert("Inserte ambas fechas")} else {filtrarFechasAntes()}}}>Cerrar Balance</button>
          <h3>MESAS TOTALES: {mesasBalance.length} </h3> 
          <h3>COMICION TOTAL POR MESA: ${comicionTotalMesas()} </h3> 
          <h3>M a M: {mamTotal} </h3>
          <h3>Torneos: {torTotal} </h3>
          <h3>Campeonatos: {campToal} </h3>
        </div>
      </>
    )
  }

}
// 
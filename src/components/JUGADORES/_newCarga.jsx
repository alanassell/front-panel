import React, { useState } from 'react'

import {Button, Container, Modal, Spinner} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './jugadores.css'

import api from '../../routes/api.js'
import { useJugadoresContext } from '../../context/jugadoresContext/jugadoresContext.jsx';
import { useNavigate } from 'react-router-dom';


const NewCarga = ({jugadores,user,grupos}) => {

  const { fetchJugadores } = useJugadoresContext();


  const navegar = useNavigate()


const notify = () => toast.success(`Carga de ${data.monto} realizada!`, {
  position: "bottom-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [showNewCarga, setShowNewCarga] = useState(false);
  const handleCloseShowNewCarga = () => setShowNewCarga(false);
  const handleShowNewCarga = () =>{
        let idExiste = false
        jugadores.map((elem)=>{
            if(elem.id === Number(data.id)){
                idExiste = true 
            }
        })   
        if(data.id === "" || data.monto === "" || data.nombreGrupo === ""){
            setMessage("Inserte todos los campos!")
        }
        else if(!idExiste){
            setMessage("Jugador no encontrado")
        }
        else{ 
            setShowNewCarga(true)  
        }
    }

    const [showMensajeSaldo, setShowMensajeSaldo] = useState(false);
    const handleCloseMensajeSaldo = () =>{setShowMensajeSaldo(false)};
    const handleShowMensajeSaldo = () => setShowMensajeSaldo(true);

  const [data, setData] = useState({
      id: "",
      monto: "",
      nombreGrupo: ""
  }) 
  
  const [message, setMessage] = useState();

  const [pending, setPending] = useState(false);

  function handleChange(evt) {
    setMessage("");
    const { name, value } = evt.target;
    let updatedData = { ...data, [name]: value };
  
    if (user.rol === "admin") {
      updatedData = { ...updatedData, nombreGrupo: user.grupo[0].nombre };
    }
  
    setData(updatedData);
  }

  const putCargar = async () =>{
    handleCloseShowNewCarga()
    handleClose()
    // handleShowMensajeSaldo()
    setPending(true)
    await api.put("/api/jugadores/cargar", data)
    .then((response) => {
        if(response){
            fetchJugadores()
            notify()
            navegar("/jugadores")
        }
        else(
            alert("Ocurrio un error vuelve a intentarlo")
        )
      })
    setPending(false)
  }
    if(pending){
        return(<Container className='d-flex justify-content-center align-items-center'><Spinner animation="border" variant="primary" /></Container>)
    }else{
        return (
            <>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                />

                <a onClick={()=>{handleShow()}}>Cargar saldo</a> 
                <Modal size="lg" centered show={show} onHide={handleClose} scrollable={true}>
                    <Modal.Header closeButton>
                    <Modal.Title className='w-100 text-center'>Nueva Carga de saldo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='' style={{scrollBehavior: "auto", overflowY: 'auto'}}> 
                        <div className="mt-3 d-flex flex-column">
                            <h6>Id:</h6>
                            <input type="number" name="id" autocomplete="off" placeholder='Ingrese nombre del usuario' value={data.id}  onChange={handleChange}/>
                            <h6>Monto:</h6>
                            <input type="number" name="monto" autocomplete="off" placeholder='Ingrese una contraseña' value={data.monto}  onChange={handleChange}/>
                            <h6>Grupo:</h6>
                            {user.rol === "agente" ? (
                                <select name="nombreGrupo" id="cars" onClick={handleChange}>
                                <option value=""></option>
                                {grupos.map((elem, i) => {
                                    return <option value={elem.nombre} key={i}>{elem.nombre}</option>
                                })}
                                </select>) : user.rol === "admin" ? (
                                    <input type="text" name="nombreGrupo" value={user.grupo[0].nombre} readOnly onChange={handleChange}/>
                                ):
                                ( 
                                    <select name="nombreGrupo" id="cars" onClick={handleChange}>
                                    <option value=""></option>
                                    {user.grupo.map((elem, i) => {
                                        return <option value={elem.nombre} key={i}>{elem.nombre}</option>
                                    })}
                                    </select>
                                )}
                            <h5 className='text-center m-3'>{message}</h5>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Container>
                        <div className='w-100 d-flex justify-content-center'>
                            <Button variant="outline-success" onClick={()=>{handleShowNewCarga(), console.log(data);}}>Cargar</Button>    
                            <Button variant="outline-primary" className='mx-2' onClick={handleClose}>
                                Cancelar
                            </Button>
                        </div>
                    </Container>
                    </Modal.Footer>
                </Modal>

                <Modal centered show={showNewCarga} onHide={handleCloseShowNewCarga} scrollable={true}>
                    <Modal.Header closeButton> 
                        <Modal.Title className='text-center'>Seguro desea cargar ${data.monto} al jugador {
                        jugadores.map((elem)=>{if(elem.id === Number(data.id) && elem.grupo[0].nombre === data.nombreGrupo){return elem.nombre}})} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='d-flex' style={{scrollBehavior: "auto", overflowY: 'auto'}}> 
                        <div className='w-100 d-flex justify-content-center'>
                            <Button variant="outline-success" className='px-3' onClick={()=>putCargar()}>
                            SI
                            </Button>
                            <Button variant="outline-danger" className='px-3 mx-2' onClick={handleCloseShowNewCarga}>
                            NO
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>

                {/* <Modal centered show={showMensajeSaldo} onHide={handleCloseMensajeSaldo} scrollable={true}>
                    <Modal.Header closeButton> 
                            {jugadores.map((jugador)=>{
                                if(jugador.id === Number(data.id) && jugador.grupo[0].nombre === data.nombreGrupo){
                                    return (
                                        <>
                                            <p>
                                            📥Ingreso de saldo
                                            <br/>
                                            <br/>
                                            💵Monto: ${data.monto}
                                            <br/>
                                            <br/>
                                            💰Tu saldo actual es: ${jugador.saldo + Number(data.monto)}
                                            </p>
                                        </>
                                    )
                                }
                            })}
                    </Modal.Header>
                    <Modal.Body className='d-flex' style={{scrollBehavior: "auto", overflowY: 'auto'}}> 
                        <div className='w-100 d-flex justify-content-center'>
                            <Button variant="outline-success" className='px-3'>
                            COPIAR
                            </Button>
                            <Button variant="outline-danger" className='px-3 mx-2' onClick={handleCloseMensajeSaldo}>
                            CERRAR
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal> */}
            </>
  )}
}

export default NewCarga
import React, { useState } from 'react'

import {Button, Container, Modal, Spinner} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './jugadores.css'

import api from '../../routes/api.js'
import { useNavigate } from 'react-router-dom';
import { useJugadoresContext } from '../../context/jugadoresContext/jugadoresContext.jsx';




const NewJugador = ({jugadores,user,grupos}) => {

  const { fetchJugadores } = useJugadoresContext();


  const navegar = useNavigate()

  const notify = () => toast.success(`Jugador creado!`, {
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
  
  const [showCrearJugador, setShowCrearJugador] = useState(false);
  const handleCloseShowCrearJugador = () => setShowCrearJugador(false);
  const handleShowCrearJugador = () =>{
        let nombreExiste = false
            jugadores.map((elem)=>{
                if(elem.nombre === data.nombre){
                    nombreExiste = true 
                }
            })   
        if(data.nombre === "" || data.password === "" || data.telefono === "" || data.nombreGrupo === ""){
            if(data.password.length < 6){
                setMessage("La contraseña es menor a 6 caracteres!")
            }else{
                setMessage("Inserte todos los campos!")
            }
        }
        else if(nombreExiste){
            setMessage("El nombre ya existe!")
        }
        else{ 
            setShowCrearJugador(true)  
        }

    }
  
  const [data, setData] = useState({
      nombre:"",
      usuario:"",
      password: "",
      telefono: "",
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

    
  function handleChangeSelect(evt) {
    setMessage("")

    const value = evt.target.value;
      
    setData({
        ...data,
        [evt.target.name]: value
    });
  }

  const crearJugador = async () =>{
    handleClose()
    handleCloseShowCrearJugador()
    setPending(true)
    await api.post("/api/jugadores", data)
      .then((response) => {
        if(response){
            notify()
            fetchJugadores()
            setPending(false)
            navegar("/jugadores")
        }
        else(
            alert("Ocurrio un error vuelve a intentarlo")
        )
      })
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

                <a onClick={()=>{handleShow()}}>Crear Jugador</a> 
                <Modal size="lg" centered show={show} onHide={handleClose} scrollable={true}>
                    <Modal.Header closeButton>
                    <Modal.Title className='w-100 text-center'>Crear nuevo Jugador</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='' style={{scrollBehavior: "auto", overflowY: 'auto'}}> 
                        <div className="mt-3 d-flex flex-column">
                            <h6>Nombre:</h6>
                            <input type="text" name="nombre" autocomplete="off" placeholder='Ingrese nombre del jugador' value={data.nombre}  onChange={handleChange}/>
                            <h6>Usuario:</h6>
                            <input type="text" name="usuario" autocomplete="off" placeholder='Ingrese nombre del usuario' value={data.usuario}  onChange={handleChange}/>
                            <h6>Contraseña:</h6>
                            <input type="text" name="password" autocomplete="off" placeholder='Ingrese una contraseña' value={data.password}  onChange={handleChange}/>
                            <h6>Telefono:</h6>
                            <input type="number" name="telefono" autocomplete="off" placeholder='Ingrese telefono del usuario' value={data.telefono}  onChange={handleChange}/>
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
                            <h5 className='text-center m-3 '>{message}</h5>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Container>
                        <div className='w-100 d-flex justify-content-center'>
                            <Button variant="outline-success" onClick={()=>{handleShowCrearJugador()}}>Crear</Button>    
                            <Button variant="outline-primary" className='mx-2' onClick={handleClose}>
                                Cancelar
                            </Button>
                        </div>
                    </Container>
                    </Modal.Footer>
                </Modal>

                <Modal centered show={showCrearJugador} onHide={handleCloseShowCrearJugador} scrollable={true}>
                    <Modal.Header closeButton> 
                        <Modal.Title className='text-center'>Seguro desea crear el nuevo jugador {data.nombre} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='d-flex' style={{scrollBehavior: "auto", overflowY: 'auto'}}> 
                        <div className='w-100 d-flex justify-content-center'>
                            <Button variant="outline-success" className='px-3' onClick={()=>crearJugador()}>
                            SI
                            </Button>
                            
                            <Button variant="outline-danger" className='px-3 mx-2' onClick={handleCloseShowCrearJugador}>
                            NO
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
  )}
}

export default NewJugador
import React, { useState } from 'react'

import {Button, Container, Modal, Spinner} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './eventos.css'

import api from '../../routes/api.js'
import { useNavigate } from 'react-router-dom';
import { useEventoContext } from '../../context/eventosContext/eventoContext.jsx';


const NewEvento = ({eventos,user, grupos}) => {

const navegar = useNavigate()
const { fetchEventos } = useEventoContext();



const notify = () => toast.success(`Evento creado!`, {
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
  
  const [showCrearUser, setShowCrearUser] = useState(false);
  const handleCloseShowCrearUser = () => setShowCrearUser(false);
  const handleShowCrearUser = () =>{
    console.log(data);
        let nombreExiste = false
            eventos.map((elem)=>{
                if(elem.nombre === data.nombre){
                    nombreExiste = true 
                }
            })   
        if(data.nombre === "" || data.grupo === "" || data.categoria === "" || data.color === "" || data.jugadores === "" 
        || data.entrada === "" || data.premio === "" || data.puntos === "" || data.comicion === ""){
            setMessage("Inserte todos los campos!")
        }
        else if(nombreExiste){
            setMessage("El nombre ya existe!")
        }
        else{ 
            setShowCrearUser(true)  
        }

    }
  
  const [data, setData] = useState({
      nombre:"",
      nombreGrupo: "",
      categoria: "",
      color: "",
      jugadores: "",
      entrada: "",
      premio: "",
      puntos: "",
      comicion: "",
      descripcion: ""
  }) 
  
  const [message, setMessage] = useState();

  const [pending, setPending] = useState(false);

    
  function handleChange(evt) {
    setMessage("")
    const value = evt.target.value;
    setData({
    ...data,
    [evt.target.name]: value
    });
  }   

  const crearEvento = async () =>{
    handleCloseShowCrearUser()
    handleClose()
    setPending(true)
    await api.post("/api/eventos", data)
      .then((response) => {
            if(response){
                console.log(response);
                notify()
                fetchEventos()
                setPending(false)
                navegar("/eventos")
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

                <a className='newEvento' onClick={()=>{handleShow()}}>Crear evento</a> 
                <Modal size="lg" centered show={show} onHide={handleClose} scrollable={true}>
                    <Modal.Header closeButton>
                    <Modal.Title className='w-100 text-center'>Crear evento</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='' style={{scrollBehavior: "auto", overflowY: 'auto'}}> 
                        <div className="mt-3 d-flex flex-column modalBody">
                            <h6>Nombre:</h6>
                            <input type="text" name="nombre" autocomplete="off" placeholder='Ingrese nombre del evento' value={data.nombre}  onChange={handleChange}/>
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
                            <h6>Categoria:</h6> 
                            <select name="categoria" id="cars" onClick={handleChange}>
                                <option value=""></option>
                                <option value="mam">Mano a mano</option>
                                <option value="tor">Torneo</option>
                                <option value="camp">Campeonato</option>
                            </select>
                            <h6>Color en Ingles:</h6>
                            <input type="text" name="color" autocomplete="off" placeholder='Ingrese color del evento' value={data.color}  onChange={handleChange}/>
                            <h6>jugadores:</h6>
                            <select name="jugadores" id="cars" onClick={handleChange}>
                                <option value=""></option>
                                <option value={2}>2</option>
                                <option value={4}>4</option>
                                <option value={8}>8</option>
                            </select>
                            <h6>Entrada:</h6>
                            <input type="number" name="entrada" autocomplete="off" placeholder='Ingrese valor de entrada' value={data.entrada}  onChange={handleChange}/>
                            <h6>Premio:</h6>
                            <input type="number" name="premio" autocomplete="off" placeholder='Ingrese valor del premio' value={data.premio}  onChange={handleChange}/>
                            <h6>Puntos:</h6>
                            <input type="number" name="puntos" autocomplete="off" placeholder='Ingrese los puntos del evento' value={data.puntos}  onChange={handleChange}/>
                            <h6>Comicion:</h6>
                            <input type="number" name="comicion" autocomplete="off" placeholder='Ingrese la comicion del evento' value={data.comicion}  onChange={handleChange}/>
                            <h6>Descripcion:</h6>
                            <input type="text" name="descripcion" autocomplete="off" placeholder='Ingrese descripcion del evento' value={data.descripcion}  onChange={handleChange}/>
                            <h5 className='text-center m-3 '>{message}</h5>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Container>
                        <div className='w-100 d-flex justify-content-center'>
                            <Button variant="outline-success" onClick={()=>{handleShowCrearUser()}}>Crear</Button>    
                            <Button variant="outline-primary" className='mx-2' onClick={handleClose}>
                                Cancelar
                            </Button>
                        </div>
                    </Container>
                    </Modal.Footer>
                </Modal>

                <Modal centered show={showCrearUser} onHide={handleCloseShowCrearUser} scrollable={true}>
                    <Modal.Header closeButton> 
                        <Modal.Title className='text-center'>Seguro desea crear el nuevo evento {data.nombre} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='d-flex' style={{scrollBehavior: "auto", overflowY: 'auto'}}> 
                        <div className='w-100 d-flex justify-content-center'>
                            <Button variant="outline-success" className='px-3' onClick={()=>crearEvento()}>
                            SI
                            </Button>
                            
                            <Button variant="outline-danger" className='px-3 mx-2' onClick={handleCloseShowCrearUser}>
                            NO
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
  )}
}

export default NewEvento
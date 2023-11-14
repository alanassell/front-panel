import React, { useState } from 'react'

import {Button, Container, Modal, Spinner} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './grupo.css'

import api from '../../routes/api.js'
import { useNavigate } from 'react-router-dom';
import { useGrupoContext } from '../../context/grupoContext/grupoContext.jsx';


const NewGrupo = ({grupos}) => {

    const { fetchData } = useGrupoContext();


    const navegar = useNavigate()

    const notify = () => toast.success(`Grupo creado!`, {
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
  
  const [showCrearGrupo, setShowCrearGrupo] = useState(false);
  const handleCloseShowCrearGrupo = () => setShowCrearGrupo(false);
  const handleShowCrearGrupo = () =>{
        if(data.nombre === ""){
          setMessage("Inserte un nombre!")
        }
        else if(grupos.length === 0){
            setShowCrearGrupo(true)
        }
        else{!grupos.map((elem)=>{
            if(elem.nombre === data.nombre){
                setMessage("El nombre ya existe!")
                setShowCrearGrupo(false)
            }
            else{setShowCrearGrupo(true)}
            })}
    }
  
  const [data, setData] = useState({
      nombre:"",
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

  const crearGrupo = async () =>{
    handleClose()
    handleCloseShowCrearGrupo()
    setPending(true)
    await api.post("/api/grupos", data)
    .then((response) => {
        if(response){
            notify()
            fetchData()
            setPending(false)
            navegar("/grupos")
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

                <a onClick={()=>{handleShow()}}>Crear grupo</a> 
                <Modal size="lg" centered show={show} onHide={handleClose} scrollable={true}>
                    <Modal.Header closeButton>
                    <Modal.Title className='w-100 text-center'>Crear grupo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='' style={{scrollBehavior: "auto", overflowY: 'auto'}}> 
                        <div className="mt-3 d-flex flex-column">
                            <h6>Nombre:</h6>
                            <input type="text" name="nombre" autocomplete="off" placeholder='Ingrese nombre del grupo' value={data.nombre}  onChange={handleChange}/>
                            <h5 className='text-center m-3 '>{message}</h5>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Container>
                        <div className='w-100 d-flex justify-content-center'>
                            <Button variant="outline-success" onClick={()=>{handleShowCrearGrupo()}}>Crear</Button>    
                            <Button variant="outline-primary" className='mx-2' onClick={handleClose}>
                                Cancelar
                            </Button>
                        </div>
                    </Container>
                    </Modal.Footer>
                </Modal>

                <Modal centered show={showCrearGrupo} onHide={handleCloseShowCrearGrupo} scrollable={true}>
                    <Modal.Header closeButton> 
                        <Modal.Title className='text-center'>Seguro desea crear el nuevo grupo {data.nombre} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='d-flex' style={{scrollBehavior: "auto", overflowY: 'auto'}}> 
                        <div className='w-100 d-flex justify-content-center'>
                            <Button variant="outline-success" className='px-3' onClick={()=>crearGrupo()}>
                            SI
                            </Button>
                            
                            <Button variant="outline-danger" className='px-3 mx-2' onClick={handleCloseShowCrearGrupo}>
                            NO
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
  )}
}

export default NewGrupo
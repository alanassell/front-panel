import React, { useState } from 'react'

import {Button, Container, Modal, Spinner} from 'react-bootstrap'

import './usuarios.css'


const UsuariosEdit = ({user,users}) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showEditarUser, setShowEditarUser] = useState(false);
  const handleCloseShowEditarUser = () => setShowEditarUser(false);
  const handleShowEditarUser = () =>{

    let nombreExiste = false
    users.map((elem)=>{
        if(elem.name === data.name && elem.name !== user.name){
            nombreExiste = true 
    }})

    if(data.name === "" || data.email === "" || data.password === "" || data.telefono === ""){
        if(data.password.length < 6){
            setMessage("La contraseña es menor a 6 caracteres!")
        }else{
            setMessage("Inserte todos los campos!")
        }
    }
    else if(nombreExiste) {
        setMessage("El nombre ya existe!")
    }
    else{

        setShowEditarUser(true)  
    }

        
}

  const [message, setMessage] = useState();
  const [pending, setPending] = useState(false)
  const [data, setData] = useState({
    name:"",
    rol: "",
    email: "",
    password: "",
    telefono: ""
  }) 

  function handleChange(evt) {
    setMessage("")
    const value = evt.target.value;
    setData({
    ...data,
    [evt.target.name]: value
    });
  } 
    
  function handleChangeSelect(evt) {
    const value = evt.target.value;
    setData({
        ...data,
        [evt.target.name]: value
    })
  }

  if(pending){
    return(<Container className='d-flex justify-content-center align-items-center'><Spinner animation="border" variant="primary" /></Container>)
    }else{
        return (
            <>
                <a onClick={()=>{handleShow()}}><span className="material-symbols-outlined">edit_note</span></a> 
                <Modal className='modalInfo' centered show={show} onHide={handleClose} scrollable={true}>
                    <Modal.Header closeButton>
                    <Modal.Title className='w-100 text-center'>Editar {user.rol} {user.name} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='' style={{scrollBehavior: "auto", overflowY: 'auto'}}> 
                        <div className="mt-3 d-flex flex-column">
                            <h6>Nombre:</h6>
                            <input type="text" name="name" autocomplete="off" placeholder={user.name}   value={data.name}  onChange={handleChange}/>
                            <h6>Contraseña:</h6>
                            <input type="text" name="password" autocomplete="off" placeholder="..."  value={data.password}  onChange={handleChange}/>
                            <h6>Rol:</h6>
                            <select name="rol" id="cars" onClick={handleChangeSelect}>
                                <option value=""></option>
                                <option value="admin">Admin</option>
                                <option value="representante">Reprecentante</option>
                                <option value="agente">Agente</option>
                            </select>  
                            <h6>Email:</h6>
                            <input type="email" name="email" autocomplete="off" placeholder={user.email}   value={data.email}  onChange={handleChange}/>
                            <h6>Telefono:</h6>
                            <input type="number" name="telefono" autocomplete="off" placeholder={user.telefono}   value={data.telefono}  onChange={handleChange}/>
                            <h5 className='text-center m-3 '>{message}</h5>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Container>
                        <div className='w-100 d-flex justify-content-center'>
                            <Button variant="outline-success" onClick={()=>{handleShowEditarUser()}}>Editar</Button>    
                            <Button variant="outline-primary" className='mx-2' onClick={handleClose}>
                                Cancelar
                            </Button>
                        </div>
                    </Container>
                    </Modal.Footer>
                </Modal>
                <Modal centered show={showEditarUser} onHide={handleCloseShowEditarUser} scrollable={true}>
                    <Modal.Header closeButton> 
                        <Modal.Title className='text-center'>Seguro desea Editar el usuario {user.name} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='d-flex' style={{scrollBehavior: "auto", overflowY: 'auto'}}> 
                        <div className='w-100 d-flex justify-content-center'>
                            <Button variant="outline-success" className='px-3' >
                            SI
                            </Button>
                            
                            <Button variant="outline-danger" className='px-3 mx-2' onClick={handleCloseShowEditarUser}>
                            NO
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
    )}
    
}

export default UsuariosEdit 
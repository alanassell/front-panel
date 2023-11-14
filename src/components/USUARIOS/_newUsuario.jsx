import React, { useState } from 'react'

import {Button, Container, Modal, Spinner} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './usuarios.css'

import api from '../../routes/api.js'
import { useNavigate } from 'react-router-dom';
import { useuserContext } from '../../context/userContext/userContext.jsx';


const NewUsuario = ({users, tipo, nombre}) => {

  const { fetchUsers } = useuserContext();
  const navegar = useNavigate()

  const notify = () => toast.success(`Usuario ${tipo} creado!`, {
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
        let nombreExiste = false
            users.map((elem)=>{
                if(elem.name === data.name){
                    nombreExiste = true 
                }
            })   
        if(data.name === "" || data.email === "" || data.password === "" || data.telefono === ""){
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
            setShowCrearUser(true)  
        }

    }
  
  const [data, setData] = useState({
      name:"",
      rol: tipo,
      email: "",
      password: "",
      telefono: ""
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

  const crearUser = async () =>{
      handleCloseShowCrearUser()
      handleClose()
      setPending(true)
    await api.post("/api/users", data)
      .then((response) => {
        if(response){
            notify()
            setPending(false)
            fetchUsers()
            navegar("/usuarios")
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

                <a onClick={()=>{handleShow()}}>Crear {nombre}</a> 
                <Modal size="lg" centered show={show} onHide={handleClose} scrollable={true}>
                    <Modal.Header closeButton>
                    <Modal.Title className='w-100 text-center'>Crear {nombre}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='' style={{scrollBehavior: "auto", overflowY: 'auto'}}> 
                        <div className="mt-3 d-flex flex-column">
                            <h6>Nombre:</h6>
                            <input type="text" name="name" autocomplete="off" placeholder='Ingrese nombre del usuario' value={data.name}  onChange={handleChange}/>
                            <h6>Contraseña:</h6>
                            <input type="text" name="password" autocomplete="off" placeholder='Ingrese una contraseña' value={data.password}  onChange={handleChange}/>
                            <h6>Email:</h6>
                            <input type="email" name="email" autocomplete="off" placeholder='Ingrese email del usuario' value={data.email}  onChange={handleChange}/>
                            <h6>Telefono:</h6>
                            <input type="number" name="telefono" autocomplete="off" placeholder='Ingrese telefono del usuario' value={data.telefono}  onChange={handleChange}/>
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
                        <Modal.Title className='text-center'>Seguro desea crear el nuevo {nombre} {data.name} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='d-flex' style={{scrollBehavior: "auto", overflowY: 'auto'}}> 
                        <div className='w-100 d-flex justify-content-center'>
                            <Button variant="outline-success" className='px-3' onClick={()=>crearUser()}>
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

export default NewUsuario
import React, { useState } from 'react'

import {Button, Container, Modal} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './grupo.css'

import api from '../../routes/api';
import { useNavigate } from 'react-router-dom';
import { useGrupoContext } from '../../context/grupoContext/grupoContext';
import { useuserContext } from '../../context/userContext/userContext';

const AddAdmin= ({grupo,users,usuario}) => {

  const { fetchData } = useGrupoContext();
  const { fetchUsers } = useuserContext();
    
  const navegar = useNavigate()

  const notify = () => toast.success(`Admin añadido a ${data.nombreGrupo} !`, {
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
  
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const handleCloseShowAddAdmin = () => setShowAddAdmin(false);
  const handleShowAddAdmin = () =>{
    if(data.nombreAdmin === "" || data.nombreGrupo === ""){setMessage("Inserte todos los datos!")}
    else{setShowAddAdmin(true)}};
  
  const [data, setData] = useState({
    nombreAdmin: "",
    nombreGrupo: ""
  }) 
  
  const [message, setMessage] = useState();

    
  function handleChangeSelect(evt) {
      const value = evt.target.value;
      setData({
        ...data,
        [evt.target.name]: value
    });
  }
  
  const addAdmin = async () =>{
    handleClose()
    handleCloseShowAddAdmin()
    await api.put("/api/grupos/nuevoadmin", data)
      .then(async(response) => {
        
          await api.put("/api/users/addGrupo", {
              nombre: data.nombreAdmin,
              nombreGrupo: data.nombreGrupo
          })
            .then((response) => {
                if(response){
                    notify()
                    fetchData()
                    fetchUsers()
                    navegar("/grupos")
                }
                else(
                    alert("Ocurrio un error vuelve a intentarlo")
                )
            })
      })

  }
   if(grupo.length !== 0){
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

                <a onClick={()=>{handleShow()}}>Añadir Admin</a> 
                <Modal size="lg" centered show={show} onHide={handleClose} scrollable={true}>
                    <Modal.Header closeButton>
                    <Modal.Title className='w-100 text-center'>Añadir administrador</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='' style={{scrollBehavior: "auto", overflowY: 'auto'}}> 
                            <div className="mt-3 d-flex flex-column">
                                <h6>Grupo:</h6>
                                <select name="nombreGrupo" id="cars" onClick={handleChangeSelect}>
                                     <option value=""></option>
                                     {usuario.rol === "representante" ? (
                                        grupo.map((elem, i) => {
                                            if (elem.admins.length < 3 && usuario.grupo.some(userGrupo => userGrupo.nombre === elem.nombre)) {
                                            return <option value={elem.nombre} key={i}>{elem.nombre}</option>;
                                            }
                                            return null;
                                        })
                                        ) : (
                                        grupo.map((elem, i) => (
                                            <option value={elem.nombre} key={i}>{elem.nombre}</option>
                                        ))
                                     )}
                                </select>   
                                 <h6 className='mt-2'>Admin:</h6>
                                 <select name="nombreAdmin" id="cars" onClick={handleChangeSelect}>
                                    <option value=""></option>
                                    {users.map((elem,i)=>{
                                        if(elem.rol === "admin" && elem.grupo.length === 0){
                                            return <option value={elem.name} key={i}>{elem.name}</option>
                                        }
                                    })}
                                </select>   
                                <h5 className='text-center m-3 '>{message}</h5>
                            </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Container>
                        <div className='w-100 d-flex justify-content-center'>
                            <Button variant="outline-success" onClick={()=>{handleShowAddAdmin()}}>Añadir</Button>    
                            <Button variant="outline-primary" className='mx-2' onClick={handleClose}>
                                Cancelar
                            </Button>
                        </div>
                    </Container>
                    </Modal.Footer>
                </Modal>

                <Modal centered show={showAddAdmin} onHide={handleCloseShowAddAdmin} scrollable={true}>
                    <Modal.Header closeButton> 
                        <Modal.Title className='text-center'>Seguro desea añadir {data.nombreAdmin} al grupo {data.nombreGrupo} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='d-flex' style={{scrollBehavior: "auto", overflowY: 'auto'}}> 
                        <div className='w-100 d-flex justify-content-center'>
                            <Button variant="outline-success" className='px-3' onClick={()=>addAdmin()}>
                            SI
                            </Button>
                            
                            <Button variant="outline-danger" className='px-3 mx-2' onClick={handleCloseShowAddAdmin}>
                            NO
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
  )}else{
    return <>
            <a onClick={()=>{handleShow()}}>Añadir Admin</a> 
            <Modal size="lg" centered show={show} onHide={handleClose} scrollable={true}>
                <Modal.Header closeButton>
                <Modal.Title className='w-100 text-center'>No existen grupos</Modal.Title>
                </Modal.Header>
            </Modal>
    </>
}
}

export default AddAdmin
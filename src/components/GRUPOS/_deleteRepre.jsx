import React, { useState } from 'react'

import {Button, Container, Modal} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './grupo.css'

import api from '../../routes/api';
import { useNavigate } from 'react-router-dom';
import { useGrupoContext } from '../../context/grupoContext/grupoContext';
import { useuserContext } from '../../context/userContext/userContext';

const DeleteRepre = ({grupo,users}) => {
    

const { fetchData } = useGrupoContext();
const { fetchUsers } = useuserContext();

  const navegar = useNavigate()
    
  const notify = () => toast.error(`Representante eliminado de grupo ${data.nombreGrupo} !`, {
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
  
  const [showDeleteRepre, setShowDeleteRepre] = useState(false);
  const handleCloseDeleteRepre = () => setShowDeleteRepre(false);
  const handleShowDeleteRepre = () =>{
    if(data.nombreRepre !== "" || data.nombreGrupo){setShowDeleteRepre(true)}
    else{setMessage("Inserte todos los datos!")}};
  
  
  const [data, setData] = useState({
    nombreRepre: "",
    nombreGrupo: "",
    idGrupo: ""
  })
  
  const [message, setMessage] = useState();

    
  function handleChangeSelect(evt) {
    const value = evt.target.value;
      
    setData({
        ...data,
        [evt.target.name]: value
    });

    grupo.map((elem)=>{
        if(elem.nombre === value){
            setData({
                ...data,
                idGrupo: elem._id,
                [evt.target.name]: value
            });
        }
    })
  }
  
  const deleteRepre = async () =>{
    handleClose()
    handleCloseDeleteRepre()
    await api.put("/api/grupos/eliminarrepre", data)
      .then(async(response) => {
        
          await api.put("/api/users/deletegrupo", {
              nombre: data.nombreRepre,
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

  const verRepre = () =>{
    if(data.nombreGrupo === ""){
        return (
            <>
            </>
        ) 
    }
    else{

        const representantes = users.filter((elem) => elem.rol === "representante" && elem.grupo.length > 0 && elem.grupo.some((grup) => grup.nombre === data.nombreGrupo));

        return(
            <>
                <h6 className='mt-2'>Representantes:</h6>
                <select name="nombreRepre" id="cars" onClick={handleChangeSelect}>
                    <option value=""></option>
                    {representantes.map((elem, i)=>{
                        return <option value={elem.name} key={i}>{elem.name}</option>
                    })}
                </select>  
            </>
        )
        
       }
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

                <a onClick={()=>{handleShow()}}>Eliminar Agente</a> 
                <Modal size="lg" centered show={show} onHide={handleClose} scrollable={true}>
                    <Modal.Header closeButton>
                    <Modal.Title className='w-100 text-center'>Eliminar Agente</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='' style={{scrollBehavior: "auto", overflowY: 'auto'}}> 
                            <div className="mt-3 d-flex flex-column">
                                <h6>Grupo:</h6>
                                <select name="nombreGrupo" id="cars" onClick={handleChangeSelect}>
                                     <option value=""></option>
                                    {grupo.map((elem,i)=>{
                                            return <option value={elem.nombre} key={i}>{elem.nombre}</option>
                                    })}
                                </select>    
                                        {verRepre()}
                                <h5 className='text-center m-3 '>{message}</h5>
                            </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Container>
                        <div className='w-100 d-flex justify-content-center'>
                            <Button variant="outline-danger" onClick={()=>{handleShowDeleteRepre()}}>Eliminar</Button>    
                            <Button variant="outline-primary" className='mx-2' onClick={handleClose}>
                                Cancelar
                            </Button>
                        </div>
                    </Container>
                    </Modal.Footer>
                </Modal>

                <Modal centered show={showDeleteRepre} onHide={handleCloseDeleteRepre} scrollable={true}>
                    <Modal.Header closeButton> 
                        <Modal.Title className='text-center'>Seguro desea eliminar a {data.nombreRepre} del grupo {data.nombreGrupo} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='d-flex' style={{scrollBehavior: "auto", overflowY: 'auto'}}> 
                        <div className='w-100 d-flex justify-content-center'>
                            <Button variant="outline-success" className='px-3' onClick={()=>deleteRepre()}>
                            SI
                            </Button>
                            
                            <Button variant="outline-danger" className='px-3 mx-2' onClick={handleCloseDeleteRepre}>
                            NO
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
    )
    }else{
        return <>
                <a onClick={()=>{handleShow()}}>Eliminar Representante</a> 
                <Modal size="lg" centered show={show} onHide={handleClose} scrollable={true}>
                    <Modal.Header closeButton>
                    <Modal.Title className='w-100 text-center'>No existen grupos</Modal.Title>
                    </Modal.Header>
                </Modal>
        </>
    }
  
}

export default DeleteRepre

import React, { useState } from 'react'

import {Button, Container, Modal, Spinner} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './grupo.css'

import api from '../../routes/api.js'
import { useGrupoContext } from '../../context/grupoContext/grupoContext.jsx';
import { useuserContext } from '../../context/userContext/userContext.jsx';


const DeleteGrupo = ({grupo,nombre}) => {

  const { fetchData } = useGrupoContext();
  const { fetchUsers } = useuserContext();

  const navegar = useNavigate()

const notify = () => toast.error(`Grupo eliminado!`, {
  position: "bottom-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  });
  
  const [showEliminarGrupo, setShowEliminarGrupo] = useState(false);
  const handleCloseShowEliminarGrupo = () => setShowEliminarGrupo(false);
  const handleShowEliminarGrupo = () => setShowEliminarGrupo(true);

  const [pending, setPending] = useState(false);  

  const deleteGrupo = async () =>{
    setPending(true)
    fetchData()
    fetchUsers()
    handleCloseShowEliminarGrupo()
    let data = {
        nombre: nombre
    }
    
    await api.delete("/api/grupos", {data})
    .then((response) => {
    })
    
    !grupo[0].admins.map(async(elem)=>{     
      await api.put("/api/users/deletegrupo", {nombre: elem.name})
      .then((response) => {
          })
        })

        !grupo[0].representante.map(async(elem)=>{     
          await api.put("/api/users/deletegrupo", {nombre: elem.name})
          .then((response) => {
          })
        })
        
    notify()
    setPending(false)
    navegar("/grupos")
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

                <Button variant="outline-danger" className='m-2 p-1 px-2 rounded-circle' onClick={()=>{handleShowEliminarGrupo()}}><span className="mt-1 material-symbols-outlined">delete</span></Button>    


                <Modal size="lg" centered show={showEliminarGrupo} onHide={handleCloseShowEliminarGrupo} scrollable={true}>
                    <Modal.Header closeButton> 
                        <Modal.Title className='text-center'>Seguro desea eliminar el grupo {nombre} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='d-flex' style={{scrollBehavior: "auto", overflowY: 'auto'}}> 
                        <div className='w-100 d-flex justify-content-center'>
                            <Button variant="outline-success" className='px-3' onClick={()=>deleteGrupo()}>
                            SI
                            </Button>
                            
                            <Button variant="outline-danger" className='px-3 mx-2' onClick={handleCloseShowEliminarGrupo}>
                            NO
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
  )}
}

export default DeleteGrupo
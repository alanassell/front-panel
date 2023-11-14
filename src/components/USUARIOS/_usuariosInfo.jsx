import React, { useState } from 'react'

import {Modal} from 'react-bootstrap'

import './usuarios.css'


const UsuariosInfo = ({user}) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    
  
        return (
            <>
                <a onClick={()=>{handleShow()}}><span className="material-symbols-outlined">read_more</span></a> 
                <Modal className='modalInfo' centered show={show} onHide={handleClose} scrollable={true}>
                    <Modal.Header closeButton>
                    <Modal.Title className='w-100 text-center'>Info del user: {user.name} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='' style={{scrollBehavior: "auto", overflowY: 'auto'}}> 
                            <h6>Comicion:</h6>
                        
                            <hr/>
                    </Modal.Body>
                </Modal>
            </>
    )
    
}

export default UsuariosInfo 
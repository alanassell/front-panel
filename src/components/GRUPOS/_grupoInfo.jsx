import React, { useState } from 'react'

import {Button, Container, Modal} from 'react-bootstrap'

import './grupo.css'


const GrupoInfo = ({grupo}) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    
  
    if(grupo.length !== 0){
        return (
            <>
                <a onClick={()=>{handleShow()}}><span className="material-symbols-outlined">read_more</span></a> 
                <Modal className='modalInfo' centered show={show} onHide={handleClose} scrollable={true}>
                    <Modal.Header closeButton>
                    <Modal.Title className='w-100 text-center'>Info del grupo {grupo.nombre}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='' style={{scrollBehavior: "auto", overflowY: 'auto'}}> 
                            <h6>Agente:</h6>
                            {grupo.representante.map((elem,i)=>{
                                return <p className='ms-3 m-0' key={i}>- {elem.name}</p>
                            })}
                            <hr/>
                            <h6>Admins:</h6>
                            {grupo.admins.map((elem,i)=>{
                                return <p className='ms-3 m-0' key={i}>- {elem.name}</p>
                            })}
                            <hr/>
                            <h6>Jugadores:</h6>
                            {grupo.jugadores.map((elem,i)=>{
                                return (
                                    <div className='d-flex'>
                                        <p className='ms-3 m-0' key={i}>Id: {elem.id}</p>
                                        <p className='ms-3 m-0' key={i}>{elem.nombre}</p>
                                    </div>
                                )
                            })}
                            <hr/>
                    </Modal.Body>
                </Modal>
            </>
    )
    }else{
        return <></>
    }
}

export default GrupoInfo 
import React, { useState } from 'react'

import {Container, Modal, Button} from 'react-bootstrap'



const EventoInfo = ({evento}) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    
  
        return (
            <>
                <a onClick={()=>{handleShow()}}><span className="material-symbols-outlined">read_more</span></a> 
                <Modal className='modalInfo' centered show={show} onHide={handleClose} scrollable={true}>
                    <Modal.Header closeButton>
                    <Modal.Title className='w-100 text-center'>Info del evento: {evento.nombre} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='' style={{scrollBehavior: "auto", overflowY: 'auto'}}> 
                            <h6>Nombre:</h6>
                            <p>{evento.nombre}</p>
                            <hr />
                            <h6>Grupo:</h6>
                            <p>{evento.grupo[0].nombre}</p>
                            <hr />
                            <h6>Categoria:</h6> 
                            <p>{evento.categoria}</p>
                            <hr />
                            <h6>Color en Ingles:</h6>
                            <p>{evento.nombre}</p>
                            <hr />
                            <h6>jugadores:</h6>
                            <p>{evento.jugadores}</p>
                            <hr />
                            <h6>Entrada:</h6>
                            <p>${evento.entrada}</p>
                            <hr />
                            <h6>Premio:</h6>
                            <p>${evento.premio}</p>
                            <hr />
                            <h6>Puntos:</h6>
                            <p>{evento.puntos}</p>
                            <hr />
                            <h6>Comicion:</h6>
                            <p>{evento.comicion}</p>
                            <hr />
                            <h6>Descripcion:</h6>
                            <p>{evento.descripcion}</p>
                            <hr />
                    </Modal.Body>
                    <Modal.Footer>
                    <Container>
                        <div className='w-100 d-flex justify-content-center'>
                            <Button variant="outline-primary" className='mx-2' onClick={handleClose}>
                                Cancelar
                            </Button>
                        </div>
                    </Container>
                    </Modal.Footer>
                </Modal>
            </>
    )
    
}

export default EventoInfo 
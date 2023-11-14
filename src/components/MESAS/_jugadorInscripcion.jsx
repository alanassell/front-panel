import React, { useState } from 'react'
import { Button, Container, Modal, ModalBody } from 'react-bootstrap';

const JugadorInscripcion = ({jugador, evento}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
        <a variant="primary" className="m-2" onClick={handleShow}>
          
          {jugador.nombre.charAt(0).toUpperCase() + jugador.nombre.slice(1)}

        </a>
    
        <Modal size="lg" centered show={show} onHide={handleClose} scrollable={true}>
            <ModalBody>
              Te inscribiste en una mesa de ${evento.entrada}, tu saldo actual es: ${jugador.saldo}
            </ModalBody>
            <Modal.Footer>
              <Container>
                  <div className='w-100 d-flex justify-content-center'>
                      <Button variant="outline-success" href={`https://wa.me/2221431471/?text=Te inscribiste en @2221431471 una mesa de $${evento.entrada}, tu saldo actual es: $${jugador.saldo}.`} target="parent" >Copiar</Button>    
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

export default JugadorInscripcion
import React, { useState } from 'react';
import { Button, Container, Modal, ModalBody, Spinner } from 'react-bootstrap';
import api from '../../routes/api.js';
import { ToastContainer, toast } from 'react-toastify';

const FinalizarMesa = ({ mesa}) => {

  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    ganador: ""
  });
  const [pending,setPending]=useState(false)
  const [showFinalizarMesa, setShowFinalizarMesa] = useState(false);
  const [showMensajeSaldo, setShowMensajeSaldo] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseShowFinalizarMesa = () => {setShowFinalizarMesa(false)};
  const handleShowFinalizarMesa = async () => {setShowFinalizarMesa(true)};

  const handleChange = (evt) => {
    const value = evt.target.value;
    setData((prevData) => ({
      ...prevData,
      ganador: value,
    }));
  };

  const finalizarMesa = async () => {
    try {
      setPending(true)
      let jugadorGanador = mesa.jugadores.find((juga) => juga.nombre === data.ganador);
      let idJugador = jugadorGanador ? jugadorGanador._id : null;
      let mesaData = {
        idJugador: idJugador,
        premio: mesa.evento.premio,
        idMesa: mesa._id 
      }
      await api.put("/api/mesas/finalizarmesa", mesaData)
      .then((response) => {
          handleClose()
          handleCloseShowFinalizarMesa()
          window.location.href="/mesas" 
          setPending(false)
      })
    } catch (error) {
      setPending(false)
      console.error('Error al finalizar mesa:', error);
    }
  };


  if(pending){
    return(<Container className='d-flex justify-content-center align-items-center'><Spinner animation="border" variant="primary" /></Container>)
  }else{
    return (
      <>
       {/* <ToastContainer position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"/> */}

        <Button variant="primary" className="m-2" onClick={handleShow}>
          Finalizar mesa
        </Button>
    
          <Modal size="lg" centered show={show} onHide={handleClose} scrollable={true}>
            <Modal.Header closeButton>
              <Modal.Title>Finalizar </Modal.Title>
            </Modal.Header>
            <ModalBody>
                <h6>Selecione ganador</h6>
                <select name="nombreGrupo" id="cars" onClick={handleChange}>
                    <option value=""></option>
                    {mesa?.jugadores.map((jugador,i)=>{
                        return <option value={jugador.nombre} key={i}>{jugador.nombre}</option>
                    })}
                </select>
            </ModalBody>
            <Modal.Footer>
              <Container>
                  <div className='w-100 d-flex justify-content-center'>
                      <Button variant="outline-success" onClick={()=>{handleShowFinalizarMesa()}}>Finalizar</Button>    
                      <Button variant="outline-primary" className='mx-2' onClick={handleClose}>
                          Cancelar
                      </Button>
                  </div>
              </Container>
            </Modal.Footer>
          </Modal>

          <Modal centered show={showFinalizarMesa} onHide={handleCloseShowFinalizarMesa} scrollable={true}>
                <Modal.Header closeButton> 
                    <Modal.Title className='text-center'>Seguro desea finalizar la mesa {mesa.evento.nombre} </Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex' style={{scrollBehavior: "auto", overflowY: 'auto'}}> 
                    <h6>Ganador de la mesa: {data.ganador} </h6>
                    <div className='w-100 d-flex justify-content-center'>
                        <Button variant="outline-success" className='px-3' onClick={()=>finalizarMesa()}>
                        SI
                        </Button>
                        
                        <Button variant="outline-danger" className='px-3 mx-2' onClick={handleCloseShowFinalizarMesa}>
                        NO
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
      );
    }
}

export default FinalizarMesa 
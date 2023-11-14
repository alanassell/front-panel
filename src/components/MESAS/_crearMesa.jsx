import React, { useState } from 'react';
import { Button, Container, Modal, ModalBody, Spinner } from 'react-bootstrap';
import api from '../../routes/api.js';
import { ToastContainer, toast } from 'react-toastify';

const CrearMesa = ({ evento, user , jugadores}) => {
  console.log(jugadores);
  const notify = () => toast.success(`Mesa ${evento.nombre} creada!`, {
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
  const [data, setData] = useState({});
  const [pending,setPending]=useState(false)
  const [message, setMessage] = useState();
  const [showCrearMesa, setShowCrearMesa] = useState(false);
  const [showMensajeSaldo, setShowMensajeSaldo] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseShowCrearMesa = () => {setShowCrearMesa(false)};
  const handleShowCrearMesa = async () => {
    setPending(true)
    const hasDuplicates = hasDuplicateIds();
    // let existeId = verificarJugadores()
    // if (!existeId) {
    //   setPending(false)
    // } 
    // else´
     if (hasDuplicates) {
      setPending(false)
      setMessage('Hay jugadores repetidos!');
    }
    else {
      const hasInsufficientBalance = await checkSaldo();
      if (!hasInsufficientBalance) {
        setPending(false)
        setShowCrearMesa(true);
      }else{
        setPending(false)
      }
    }
  };

  const handleCloseMensajeSaldo = () => {
    setShowMensajeSaldo(false)
    window.location.href="/mesas"
  };
  const handleShowMensajeSaldo = () => setShowMensajeSaldo(true);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const hasDuplicateIds = () => {
    const idsSet = new Set();
    for (const jugador in data) {
      const id = data[jugador];
      if (idsSet.has(id)) {
        return true;
      }
      idsSet.add(id);
    }
    return false;
  };

  function verificarJugadores() {
    const grupoJugadoresIds = Object.values(data);

    for (const jugadorId of grupoJugadoresIds) {
      console.log(jugadorId);
      jugadores.map((jugador) => {
        console.log(jugador.id);
        if(jugador.id === Number(jugadorId) && jugador.grupo[0].nombre === evento.grupo[0].nombre){
          return false
        }
      });
      // const jugadorExistente = jugadores.find((jugador) => jugador.id === Number(jugadorId) && jugador.grupo[0].nombre === evento.grupo[0].nombre);
      // if (!jugadorExistente) {
      //   setMessage(`El jugador con ID ${jugadorId} no existe.`);
      //   return false;
      // }
    }
  
    return false;
  }
  
  const obtenerSaldoJugador = async (idJugador, grupo) => {
    try {
      const response = await api.get(`/api/jugadores/saldo/${idJugador}/${grupo}`);
      const saldoObtenido = response.data.result.saldo;
      const nombre = response.data.result.nombre;
      return {saldoObtenido,nombre};
    } catch (error) {
      console.error('Error al obtener el saldo del jugador:', error);
      return -1;
    }
  };

  const checkSaldo = async () => {
    try {
      const jugadores = Object.entries(data);
      const grupos = Array(evento.jugadores).fill(evento.grupo[0].nombre);
      const saldos = await Promise.all(jugadores.map(([nombre, id], index) => obtenerSaldoJugador(id, grupos[index])));
      
      const jugadoresSinSaldo = [];
      saldos.forEach((saldoInfo, index) => {
        const { saldoObtenido, nombre } = saldoInfo; // Destructuramos el objeto saldoInfo para obtener el saldoObtenido y el nombre del jugador
        if (saldoObtenido < evento.entrada) {
          jugadoresSinSaldo.push({
            nombre: nombre,
            saldo: saldoObtenido,
          });
        }
      });
  
      if (jugadoresSinSaldo.length > 0) {
        const jugadoresInfo = jugadoresSinSaldo.map(({ nombre, saldo }) => `${nombre.toUpperCase()} Saldo insuficiente, su saldo es $${saldo}.`);
        setMessage(jugadoresInfo.join('\n'));
      }
  
      return jugadoresSinSaldo.length > 0;
    } catch (error) {
      console.error('Error al verificar saldos:', error);
      return true; // O maneja el error de otra manera según tus necesidades
    }
  };

  const crearMesa = async () => {
    try {
      let jugadoresArray = Object.values(data);
      setPending(true)
      let mesa = {
        grupo: evento.grupo[0].nombre,
        evento: evento.nombre,
        jugadores: jugadoresArray,
        estado: true,
        creador: user.name
      }
      await api.post("/api/mesas", mesa)
      .then((response) => {
            notify()
            handleClose()
            handleCloseShowCrearMesa()
            handleShowMensajeSaldo()            
            setPending(false)
      })
    } catch (error) {
      setPending(false)
      console.error('Error al crear mesa:', error);
    }
  };

  const añadirJugadores = () => {
    return Array.from({ length: evento.jugadores }, (_, index) => {
      const jugadorNumber = index + 1;
      return (
        <div key={`jugador-${jugadorNumber}`}>
          <h6>Jugador {jugadorNumber}</h6>
          <input
            type="Number"
            name={`jugador${jugadorNumber}`}
            autoComplete="off"
            placeholder={`Ingrese ID del jugador ${jugadorNumber}`}
            onChange={handleChange}
          />
          {jugadorNumber % 2 !== 0 && <h6 className="pb-3">vs</h6>}
        </div>
      );
    });
  };

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


        <Button variant="primary" className="m-2" onClick={handleShow}>
          {evento.nombre}
        </Button>
    
          <Modal size="lg" centered show={show} onHide={handleClose} scrollable={true}>
            <Modal.Header closeButton>
              <Modal.Title>Creando {evento.nombre} </Modal.Title>
            </Modal.Header>
            <ModalBody>
              {añadirJugadores()}
              {message && <h5 className='text-center m-3'>{message}</h5>}
            </ModalBody>
            <Modal.Footer>
              <Container>
                  <div className='w-100 d-flex justify-content-center'>
                      <Button variant="outline-success" onClick={()=>{handleShowCrearMesa()}}>Crear</Button>    
                      <Button variant="outline-primary" className='mx-2' onClick={handleClose}>
                          Cancelar
                      </Button>
                  </div>
              </Container>
            </Modal.Footer>
          </Modal>

          <Modal centered show={showCrearMesa} onHide={handleCloseShowCrearMesa} scrollable={true}>
                <Modal.Header closeButton> 
                    <Modal.Title className='text-center'>Seguro desea crear la nueva mesa {evento.nombre} </Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex' style={{scrollBehavior: "auto", overflowY: 'auto'}}> 
                    <div className='w-100 d-flex justify-content-center'>
                        <Button variant="outline-success" className='px-3' onClick={()=>crearMesa()}>
                        SI
                        </Button>
                        
                        <Button variant="outline-danger" className='px-3 mx-2' onClick={handleCloseShowCrearMesa}>
                        NO
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal centered show={showMensajeSaldo} onHide={handleCloseMensajeSaldo} scrollable={true}>
                      <Modal.Header closeButton> 
                          <>
                              <p>
                              🤚🏻Mano a mano✋🏻
                              <br/>
                              Una partida 🃏
                              <br/>
                              A 30 y sin flor
                              <br/>
                              ===================🔥
                              <br/>
                              [📥] Entrada ${evento.entrada}
                              <br/>
                              [💰] Premio ${evento.premio}
                              <br/>
                              @
                              <br/>
                              vs
                              <br/>
                              @
                              <br/>
                              ===================🔥
                              </p>
                          </>
                      </Modal.Header>
                      <Modal.Body className='d-flex' style={{scrollBehavior: "auto", overflowY: 'auto'}}> 
                          <div className='w-100 d-flex justify-content-center'>
                              <Button variant="outline-success" className='px-3'>
                              COPIAR
                              </Button>
                              <Button variant="outline-danger" className='px-3 mx-2' onClick={handleCloseMensajeSaldo}>
                              CERRAR
                              </Button>
                          </div>
                      </Modal.Body>
                  </Modal>
        </>
      );
    }
}

export default CrearMesa 
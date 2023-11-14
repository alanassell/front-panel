import React, { useState } from 'react'
import { Button, Offcanvas, Tab, Tabs } from 'react-bootstrap';
import CrearMesa from './_crearMesa';

const ElegirMesa = ({eventos, user, jugadores}) => {
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    
  return (
    <>    
      <a className='crearMesa' onClick={()=>{handleShow()}}>Crear mesa</a> 


      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Crea una mesa</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Tabs defaultActiveKey="home" id="justify-tab-example" className="mb-3">
            <Tab eventKey="home" title="1v1" className='w-50'>
              {eventos?.map((elem, i)=>{  
                if(elem.categoria === "mam"){
                  return(
                    <CrearMesa evento={elem} key={i} user={user} jugadores={jugadores} />
                  )
                }})}
            </Tab>
            <Tab eventKey="profile" title="Torneo" className='w-50'>
               {eventos?.map((elem, i)=>{
                if(elem.categoria === "tor"){
                  return(
                    <CrearMesa evento={elem} key={i} user={user} jugadores={jugadores} />
                  ) 
                }})}
            </Tab>
            <Tab eventKey="longer-tab" title="Campeonato" className='w-50'>
                {eventos?.map((elem, i)=>{
                if(elem.categoria === "camp"){
                  return(
                    <CrearMesa evento={elem} key={i} user={user}  jugadores={jugadores} />
                  )
                }})}
            </Tab>
          </Tabs>
        </Offcanvas.Body>
      </Offcanvas>
    </>
    
  )
}

export default ElegirMesa

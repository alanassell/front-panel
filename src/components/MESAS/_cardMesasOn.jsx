import React from 'react'
import { Button, Card } from 'react-bootstrap'
import JugadorInscripcion from './_jugadorInscripcion';
import FinalizarMesa from './_FinalizarMesas';

const CardMesasOn = ({mesa}) => {
  return (
    <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>
            <h4>{mesa.evento.nombre.toUpperCase()}</h4>
            <h6>{mesa.time}</h6>
      </Card.Title>
      <Card.Text>
        <h6>Jugadores:</h6>
        {mesa?.jugadores.map((jugador)=>{
            return <JugadorInscripcion jugador={jugador} evento={mesa.evento} />
        })}
        <h6>Creador:</h6>
        {mesa.creador.name.charAt(0).toUpperCase() + mesa.creador.name.slice(1)}
      </Card.Text>
      <FinalizarMesa mesa={mesa} />
    </Card.Body>
    </Card>  
  )
}

export default CardMesasOn
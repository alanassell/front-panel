import React from 'react'
import { Button, Card } from 'react-bootstrap'

const CardMesasOff = ({mesa}) => {
  return (
    <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>
            <h4>{mesa.evento.nombre.toUpperCase()}</h4>
            <h6>{mesa.time}</h6>
            <h6>{mesa.day}</h6>
      </Card.Title>
      <Card.Text>
        <h6>Jugadores:</h6>
        {mesa?.jugadores.map((jugador)=>{
            return <p>{jugador.nombre.charAt(0).toUpperCase() + jugador.nombre.slice(1)}</p>
        })}
        <h6>Creador:</h6>
        {mesa.creador.name.charAt(0).toUpperCase() + mesa.creador.name.slice(1)}
        <h6>Ganador:</h6>
        {/* {mesa.ganador.nombre} */}
      </Card.Text>
      {/* <Button variant="primary">Cerrar</Button> */}
    </Card.Body>
    </Card>  
  )
}

export default CardMesasOff
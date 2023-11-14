import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NavegationBar from '../components/NAVBAR/navBar';
import { Login } from '../components/LOGIN/login';
import { Home } from '../components/HOME/home';
import Grupo from '../components/GRUPOS/grupo';
import Usuarios from '../components/USUARIOS/usuarios';
import Jugadores from '../components/JUGADORES/jugadores';
import Eventos from '../components/EVENTOS/eventos';
import { MesasEnJuego } from '../components/MESAS/mesasEnJuego';
import { Mesasfinalizadas } from '../components/MESAS/mesasTerminadas';
import MesasTotalesTerminadas from '../components/MESAS/_mesasTotalesTerminadas';
import { Balance } from '../components/BALANCE/balance';
import { GrupoProvider } from '../context/grupoContext/grupoContext';
import { UserProvider } from '../context/userContext/userContext';
import { JugadoresProvider } from '../context/jugadoresContext/jugadoresContext';
import { EventoProvider } from '../context/eventosContext/eventoContext';

function RoutesApp() {
  return (
    <UserProvider>
      <GrupoProvider>
        <JugadoresProvider>
          <EventoProvider>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
              <NavegationBar />
              <Login />
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/grupos" element={<Grupo />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/jugadores" element={<Jugadores />} />
                <Route path="/eventos" element={<Eventos />} />
                <Route path="/mesas" element={<MesasEnJuego />} />
                <Route path="/mesasfinalizadas" element={<Mesasfinalizadas />} />
                <Route path="/filtrarmesas" element={<MesasTotalesTerminadas />} />
                <Route path="/balance" element={<Balance />} />
              </Routes>
            </BrowserRouter>
          </EventoProvider>
        </JugadoresProvider>
      </GrupoProvider>
    </UserProvider>
  );
}

export default RoutesApp;
import React, { createContext, useContext, useState } from 'react';
import api from '../../routes/api.js'

const EventoContext = createContext();

export const useEventoContext = () => useContext(EventoContext);

export const EventoProvider = ({ children }) => {

  const [dataEventos, setData] = useState([]);
  const [pending, setPending] = useState(true);

  const updateData = (newData) => {
    setData(newData);
  };

  const updatePending = (status) => {
    setPending(status);
  };

  const fetchEventos = async () => {
    try {
      const response = await api.get('/api/eventos');
      const newData = response.data;
      updateData(newData);
    } catch (error) {
      console.error(error);
    } finally {
      updatePending(false);
    }
  };


  const contextValue = {
    dataEventos,
    fetchEventos,
    updatePending
  };

  return (
    <EventoContext.Provider value={contextValue}>
      {children}
    </EventoContext.Provider>
  );
};
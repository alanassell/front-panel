import React, { createContext, useContext, useState } from 'react';
import api from '../../routes/api.js'

const jugadoresContext = createContext();

let user = JSON.parse(localStorage.getItem("user"));

export const useJugadoresContext = () => useContext(jugadoresContext);

export const JugadoresProvider = ({ children }) => {

  const [dataJugadores, setDataJugadores] = useState([]);
  const [pending, setPending] = useState(true);

  const updateData = (newData) => {
    setDataJugadores(newData);
  };

  const updatePending = (status) => {
    setPending(status);
  };

  const fetchJugadores = async () => {
    try {
      const response = await api.get("/api/jugadores/tabla")
      const newData = response.data;
      
      let jugadoresTabla = [];
        if (user.rol === "admin") {
          jugadoresTabla = newData.filter(
            (juga) => juga.grupo[0].nombre === user.grupo[0].nombre
          );
        } else if (user.rol === "representante") {
          user.grupo.forEach((grupo) => {
            jugadoresTabla = newData.filter(
              (juga) => juga.grupo[0].nombre === grupo.nombre
            );
          });
        } else {
          jugadoresTabla = newData;
        }
        setDataJugadores(jugadoresTabla);

        updateData(newData)
        
    } catch (error) {
      console.error(error);
    } finally {
      updatePending(false);
    }
  };


  const contextValue = {
    dataJugadores,
    pending,
    updateData,
    updatePending,
    fetchJugadores,
  };

  return (
    <jugadoresContext.Provider value={contextValue}>
      {children}
    </jugadoresContext.Provider>
  );
};
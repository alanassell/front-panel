import React, { createContext, useContext, useState } from 'react';
import api from '../../routes/api.js'

const GrupoContext = createContext();

export const useGrupoContext = () => useContext(GrupoContext);

export const GrupoProvider = ({ children }) => {

  const [dataGrupos, setData] = useState([]);
  const [pending, setPending] = useState(true);

  const updateData = (newData) => {
    setData(newData);
  };

  const updatePending = (status) => {
    setPending(status);
  };

  const fetchData = async () => {
    try {
      const response = await api.get('/api/grupos');
      const newData = response.data;
      updateData(newData);
    } catch (error) {
      console.error(error);
    } finally {
      updatePending(false);
    }
  };


  const contextValue = {
    dataGrupos,
    pending,
    updateData,
    updatePending,
    fetchData,
  };

  return (
    <GrupoContext.Provider value={contextValue}>
      {children}
    </GrupoContext.Provider>
  );
};
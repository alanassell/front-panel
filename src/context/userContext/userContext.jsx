import React, { createContext, useContext, useState } from 'react';
import api from '../../routes/api.js'

const userContext = createContext();

let user = JSON.parse(localStorage.getItem("user"));

export const useuserContext = () => useContext(userContext);

export const UserProvider = ({ children }) => {

  const [dataUsers, setData] = useState([]);
  const [pending, setPending] = useState(true);
  const [usuario,setUsuario]=useState()

  const updateData = (newData) => {
    setData(newData);
  };

  const updatePending = (status) => {
    setPending(status);
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get("/api/users")
      const newData = response.data;
      
      updateData(newData);
      
      const foundUser = newData.find((elem) => elem.name === user.name);
      if (foundUser) {
          setUsuario(foundUser);
      }

    } catch (error) {
      console.error(error);
    } finally {
      updatePending(false);
    }
  };


  const contextValue = {
    dataUsers,
    pending,
    usuario,
    updateData,
    updatePending,
    fetchUsers,
  };

  return (
    <userContext.Provider value={contextValue}>
      {children}
    </userContext.Provider>
  );
};
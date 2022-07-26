import React, { createContext, useState } from 'react';
import { useFetch } from '../lib/UseQuerry';

export const MainContext = createContext();

const MainContextProvider = ({ children }) => {
  const [tab, setTab] = useState('');
  const handleTab = (value) => {
    setTab(value);
  };

  return (
    <MainContext.Provider
      value={{
        tab,
        handleTab
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;

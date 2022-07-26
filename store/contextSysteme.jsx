import React, { createContext, useState } from 'react';
import { useFetch } from '../lib/UseQuerry';

export const SystemeContext = createContext();

const SystemeContextProvider = ({ children }) => {
  const { data, loading, error } = useFetch();
  const [currentSysteme, setCurrentSysteme] = useState();
  const handleChange = (e) => {
    if (isEdit) {
      setIsAlert(true);
    } else {
      setIsEdit(false);
      data.forEach((element) => {
        Object.values(element).includes(e.target.value)
          ? setCurrentSysteme(element)
          : null;
      });
    }
  };

  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = () => {
    setIsEdit(true);
  };

  const [isAlert, setIsAlert] = useState(false);

  const handleCancelAlert = () => {
    setIsAlert(false);
  };

  const handleDiscardAlert = () => {
    setIsAlert(false);
    setIsEdit(false);
  };

  return (
    <SystemeContext.Provider
      value={{
        data,
        loading,
        error,
        currentSysteme,
        setCurrentSysteme,
        handleChange,
        isEdit,
        setIsEdit,
        handleEdit,
        isAlert,
        handleCancelAlert,
        handleDiscardAlert
      }}
    >
      {children}
    </SystemeContext.Provider>
  );
};

export default SystemeContextProvider;

// TEST FUNCTION
const newSysteme = {
  name_systeme: 'respiratoir',
  desc_systeme: 'lorem'
};

const createSysteme = async () => {
  const response = await fetch(`${server}/api/systeme`, {
    method: 'POST',
    body: JSON.stringify({ newSysteme }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) =>
    response.ok ? console.log('success') : console.log('error')
  );
};

const deleteSysteme = async () => {
  const idSysteme = 5;
  const response = await fetch(`${server}/api/systeme/${idSysteme}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) =>
    response.ok ? console.log('success') : console.log('error')
  );
};

const modifySysteme = {
  name_systeme: 'nerveux',
  desc_systeme: 'lorem',
  image_systeme: 'none'
};

const updateSys = async () => {
  const idSysteme = 5;
  const response = await fetch(`${server}/api/systeme/${idSysteme}`, {
    method: 'PUT',
    body: JSON.stringify({ modifySysteme }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) =>
    response.ok ? console.log('success') : console.log('error')
  );
};

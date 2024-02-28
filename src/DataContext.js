// DataContext.js
import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [fileData, setFileData] = useState(null);
  const [orderData, setOrderData] = useState(null); // Show a number in header

  const updateFileData = (newData) => {
    setFileData(newData);
  };
  const updateOrderData = (newOrderData) => {
    setOrderData(newOrderData);
  };
  return (
    <DataContext.Provider value={{ fileData, updateFileData, orderData, updateOrderData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}

import { createContext, useContext, useState } from 'react';

export const RowIdContext = createContext();

export const RowIdProvider = ({ children }) => {
  const [rowId, setRowId] = useState(null);

  return (
    <RowIdContext.Provider value={{ rowId, setRowId }}>
      {children}
    </RowIdContext.Provider>
  );
};

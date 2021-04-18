import React, { createContext, useState } from 'react';

export const NotebookContext = createContext([])

export const NotebookProvider = ({ children }) => {
  const [selectedNotebook, setSelectedNotebook] = useState()
  
  return(
    <NotebookContext.Provider value={[selectedNotebook, setSelectedNotebook]}>
      {children}
    </NotebookContext.Provider>
  );
}
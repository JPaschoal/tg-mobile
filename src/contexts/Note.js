import React, { createContext, useState } from 'react';

export const NoteContext = createContext([])

export const NoteProvider = ({ children }) => {
  const [selectedNote, setSelectedNote] = useState()
  
  return(
    <NoteContext.Provider value={ [ selectedNote, setSelectedNote]}>
      {children}
    </NoteContext.Provider>
  );
}
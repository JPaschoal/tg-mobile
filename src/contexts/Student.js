import React, { createContext, useState } from 'react';

export const StudentContext = createContext([])

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState(false)
  
  return(
    <StudentContext.Provider value={[student, setStudent]}>
      {children}
    </StudentContext.Provider>
  );
}
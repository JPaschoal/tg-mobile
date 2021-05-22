import React, { createContext, useState } from 'react';

export const ForumContext = createContext([])

export const ForumProvider = ({ children }) => {
  const [selectedSubForum, setSelectedSubForum] = useState()
  const [selectedSemester, setSelectedSemester] = useState()
  
  return(
    <ForumContext.Provider 
      value={{
        subForum: [selectedSubForum, setSelectedSubForum], 
        semester: [selectedSemester, setSelectedSemester]
      }}
    >
      {children}
    </ForumContext.Provider>
  );
}
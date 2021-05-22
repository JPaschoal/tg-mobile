import React, { createContext, useState } from 'react';

export const ForumContext = createContext([])

export const ForumProvider = ({ children }) => {
  const [selectedSubForum, setSelectedSubForum] = useState()
  const [selectedSemester, setSelectedSemester] = useState()
  const [selectedSubject, setSelectedSubject] = useState()
  const [selectedTopic, setSelectedTopic] = useState()
  
  return(
    <ForumContext.Provider 
      value={{
        subForum: [selectedSubForum, setSelectedSubForum], 
        semester: [selectedSemester, setSelectedSemester],
        subject: [selectedSubject, setSelectedSubject],
        topic: [selectedTopic, setSelectedTopic]
      }}
    >
      {children}
    </ForumContext.Provider>
  );
}
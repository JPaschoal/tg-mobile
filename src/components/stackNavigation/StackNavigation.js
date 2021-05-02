import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'

import NotebooksList from '../../screens/notebooks/NotebooksList/NotebooksList'
import NotesList from '../../screens/notes/notesList/notesList';
import { NotebookProvider } from '../../contexts/Notebook';
import { NoteProvider } from '../../contexts/Note'
import Note from '../../screens/notes/note/Note'

const Stack = createStackNavigator()

const StackNavigation = () => {
  return (
    <NotebookProvider>
      <NoteProvider>
        <Stack.Navigator 
          headerMode="none"
        >
          <Stack.Screen name="Cadernos" component={NotebooksList} />
          <Stack.Screen name="Anotações" component={NotesList} />
          <Stack.Screen name="Anotação" component={Note} />
        </Stack.Navigator>
      </NoteProvider>
    </NotebookProvider>
  );
}

export default StackNavigation;
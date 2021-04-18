import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'

import NotebooksList from '../../screens/notebooks/NotebooksList/NotebooksList'
import NotesList from '../../screens/notes/notesList/notesList';
import { NotebookProvider } from '../../contexts/Notebook';

const Stack = createStackNavigator()

const StackNavigation = () => {
  return (
    <NotebookProvider>
      <Stack.Navigator 
        headerMode="none"
      >
        <Stack.Screen name="Cadernos" component={NotebooksList} />
        <Stack.Screen name="Anotações" component={NotesList} />
      </Stack.Navigator>
    </NotebookProvider>
  );
}

export default StackNavigation;
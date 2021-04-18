import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'

import NotebooksList from '../../screens/notebooks/NotebooksList/NotebooksList'

const Stack = createStackNavigator()

const StackNavigation = () => {
  return (
    <Stack.Navigator 
      headerMode="none"
    >
      <Stack.Screen name="Cadernos" component={NotebooksList} />
    </Stack.Navigator>
  );
}

export default StackNavigation;
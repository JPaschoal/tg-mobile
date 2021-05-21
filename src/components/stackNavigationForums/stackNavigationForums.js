import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import Forums from '../../screens/forums/Forums';
import Forum from '../../screens/forums/Forum'

const Stack = createStackNavigator()

const StackNavigationForums = () => {
  return (
    <Stack.Navigator 
      headerMode="none"
    >
      <Stack.Screen name="Forums" component={Forums} />
      <Stack.Screen name="Forum" component={Forum}/>
    </Stack.Navigator>
  );
}

export default StackNavigationForums;
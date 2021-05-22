import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import Forums from '../../screens/forums/Forums';
import Forum from '../../screens/forums/Forum';
import SubForum from '../../screens/forums/SubForum';
import { ForumProvider } from '../../contexts/Forum';

const Stack = createStackNavigator()

const StackNavigationForums = () => {
  return (
    <ForumProvider>
      <Stack.Navigator 
        headerMode="none"
      >
        <Stack.Screen name="Forums" component={Forums} />
        <Stack.Screen name="Forum" component={Forum}/>
        <Stack.Screen name="SubForum" component={SubForum}/>
      </Stack.Navigator>
    </ForumProvider>
  );
}

export default StackNavigationForums;
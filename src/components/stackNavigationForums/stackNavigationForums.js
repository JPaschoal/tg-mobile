import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import Forums from '../../screens/forums/Forums';
import Forum from '../../screens/forums/Forum';
import SubForum from '../../screens/forums/SubForum';
import { ForumProvider } from '../../contexts/Forum';
import Topics from '../../screens/forums/Topics';
import Topic from '../../screens/forums/Topic';

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
        <Stack.Screen name="Topics" component={Topics}/>
        <Stack.Screen name="Topic" component={Topic}/>
      </Stack.Navigator>
    </ForumProvider>
  );
}

export default StackNavigationForums;
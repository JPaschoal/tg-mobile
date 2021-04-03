import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Drawer from './components/drawer/Drawer'
import Notebooks from './screens/notebooks/Notebooks'
import Forums from './screens/forums/Forums'
import Logout from './screens/logout/Logout'

const Tab = createBottomTabNavigator();

export default Routes = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Drawer" component={Drawer} />
        <Tab.Screen name="Notebooks" component={Notebooks} />
        <Tab.Screen name="Forums" component={Forums} />
        <Tab.Screen name="Logout" component={Logout} />
      </Tab.Navigator>
    </NavigationContainer>

  )
}


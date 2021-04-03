import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Profile from '../../screens/profile/Profile'
import Grade from '../../screens/grade/Grade'

const Drawer = createDrawerNavigator();

const drawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Perfil">
      <Drawer.Screen name="Perfil" component={Profile} />
      <Drawer.Screen name="Notas" component={Grade} />
    </Drawer.Navigator>
  );
}

export default drawer;
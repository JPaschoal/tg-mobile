import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Profile from '../../screens/student/profile/Profile'
import Grade from '../../screens/student/grade/Grade'
import Schedule from '../../screens/student/schedules/Schedule'

const Drawer = createDrawerNavigator();

const drawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Perfil">
      <Drawer.Screen name="Perfil" component={Profile} />
      <Drawer.Screen name="Notas" component={Grade} />
      <Drawer.Screen name="Horário" component={Schedule} />
    </Drawer.Navigator>
  );
}

export default drawer;
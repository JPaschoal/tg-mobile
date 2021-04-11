import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import Drawer from './components/drawer/Drawer'
import Notebooks from './screens/notebooks/Notebooks'
import Forums from './screens/forums/Forums'
import Logout from './screens/logout/Logout'
import Login from './screens/login/Login'
import { AuthContext } from './contexts/Auth'

const Tab = createBottomTabNavigator();

export default Routes = () => {
  const [isLogged, setIsLogged] = useContext(AuthContext)

  return (
    isLogged ? (
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconColor = focused ? '#012480' : 'gray'
            if(route.name === 'Aluno') {
              iconName = 'user'
            }
            else if (route.name === 'Cadernos') {
              iconName = 'book'
            }
            else if (route.name === 'Fóruns') {
              iconName = 'message-circle'
            }
            else{
              iconName = 'log-out'
            }
            return <Feather name={iconName} size={15} color={iconColor}/>
          }
        })}
        tabBarOptions={{
          activeTintColor: '#012480',
          inactiveTintColor: 'gray',
        }}
        >
          <Tab.Screen name="Aluno" component={Drawer} />
          <Tab.Screen name="Cadernos" component={Notebooks} />
          <Tab.Screen name="Fóruns" component={Forums} />
          <Tab.Screen name="Logout" component={Logout} />
        </Tab.Navigator>
      </NavigationContainer>
    ) : (
      <Login />
    )

  )
}


import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

import Background from '../../components/background/Background'
import StudentHeader from '../../components/studentHeader/StudentHeader';

const Profile = ({ navigation }) => {
  return (
    <Background>
      <StudentHeader title="Perfil" openDrawer={navigation.openDrawer}/>
      <Text>Profileeee</Text>
    </Background>
  );
}

export default Profile;
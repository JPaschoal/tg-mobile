import React, { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';

import Background from '../../components/background/Background'
import StudentHeader from '../../components/studentHeader/StudentHeader';
import api from '../../services/api'
import userPicture from '../../../assets/user-picture.png'

const Profile = ({ navigation }) => {
  const [profile, setProfile] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('perfil')
    .then(response => {
      setProfile(response.data)
      setLoading(false)
    })
  }, [])

  let formatedDate
  if(profile){
    const date = new Date(profile.birthday)
    formatedDate = ((date.getDate()) + "/" + ((date.getMonth() + 1)) + "/" + date.getFullYear()) 
  }

  return (
    <Background>
      {loading ? (
        <View><Text>Loading...</Text></View>
      ) : (
        <View>
          <StudentHeader title="Perfil" openDrawer={navigation.openDrawer}/>
          <View>
            <Image
              source={userPicture}
            />
          </View>
          <View>
            <Text>Nome: {profile.name}</Text>
            <Text>Email: {profile.email}</Text>
            <Text>CPF: {profile.cpf}</Text>
            <Text>Data de nascimento: {formatedDate}</Text>
            <Text>Curso: {profile.course}</Text>
            <Text>RA: {profile.code}</Text>
            <Text>Periodo: {profile.period}</Text>
            <Text>PP: {profile.progress}</Text>
            <Text>PR: {profile.averageGrade}</Text>
            <Text>Unidade: {profile.unit}</Text>
          </View>
        </View>
      )}
    </Background>
  );
}

export default Profile;
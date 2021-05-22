import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// import { Container } from './styles';

const Comment = ({ comment }) => {

  const formatedHours = (date) => {
    const newDate = new Date(date)
    const utcSP = -180
    newDate.setMinutes(newDate.getMinutes() + utcSP)
    return `${newDate.getHours()}:${newDate.getMinutes()}`
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{comment.text}</Text>
      <View style={styles.commentFooter}>
        <Text style={styles.footerText}>Autor: {comment.student.ra}</Text>
        <Text style={styles.footerText}>Enviado: {formatedHours(comment.sender_at)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderColor: 'rgba(35, 49, 170, 0.1)',
    borderWidth: 3,
    borderRadius: 10,
    marginBottom: 10
  },
  commentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 16,
    marginVertical: 10
  },
  footerText: {
    fontSize: 12,
    marginBottom: 10
  }
})

export default Comment;
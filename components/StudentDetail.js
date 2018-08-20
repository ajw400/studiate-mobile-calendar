import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { tintColor } from '../constants/Colors'

export default class StudentDetail extends Component {
  render() {
    const { student } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{student.first_name} {student.last_name}</Text>
        <Text style={styles.tint}>{student.email}</Text>
        <Text>{student.birthdate}</Text>
        <Text>{student.phone}</Text>
        <Text>{student.address} {student.city} {student.zipcode}</Text>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 30
  },
  tint: {
    color: tintColor
  }

})

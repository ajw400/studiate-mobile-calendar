import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class StudentDetail extends Component {
  render() {
    const { student } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{student.first_name} {student.last_name}</Text>
        <Text>Phone: {student.phone}</Text>
        <Text>Address: {student.address}</Text>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 30
  },

})

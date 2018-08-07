import React, { Component } from 'react'
import { View, ActivityIndicator, StatusBar, StyleSheet } from 'react-native'
import { isLoggedIn } from '../utils/auth'


export default class AuthLoading extends Component {
  constructor() {
    super()
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    const loggedIn = await isLoggedIn()
    this.props.navigation.navigate(loggedIn ? 'Main' : 'Auth')
  }
  render() {
    return(
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

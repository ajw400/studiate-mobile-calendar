import React, { Component } from 'react'
import { View, Button, StyleSheet } from 'react-native'
import { login } from '../utils/auth'

export default class Auth extends Component {

  render() {
    return(
      <View style={styles.container}>
        <Button title="Sign in" onPress={this.loginAsync} />
      </View>
      )
  }

  loginAsync = async () => {
    login()
    .then(() => this.props.navigation.navigate("Main"))
    .catch(err => console.log("error", err))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

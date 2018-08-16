import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { logout } from '../utils/auth'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  logoutAsync = async () => {
    // this.props.navigation.navigate("Main")
    logout()
    .then(() => this.props.navigation.navigate("AuthLoading"))
    .catch(err => console.log("error", err))
  }

  render() {
    return(
    <View style={styles.container}>
      <Text>
        Camera settings are coming soon!
      </Text>
      <TouchableOpacity onPress={this.logoutAsync}>
        <Text>Logout</Text>
      </TouchableOpacity>
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

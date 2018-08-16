import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { FaceDetector } from 'expo';
import { Ionicons } from '@expo/vector-icons';

var pictureWidth = Dimensions.get('window').width * .85;
var pictureHeight = Dimensions.get('window').height * .85;


export default class Photo extends React.Component {
  state = {
    selected: false,
  };
  _mounted = false;

  componentDidMount() {
    this._mounted = true;
    console.log("pictureSize", pictureWidth, pictureHeight)
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    const { uri, currentPhoto } = this.props;
    return (
      <View style={styles.pictureWrapper}>
          <Image
            style={styles.picture}
            source={{ uri }}
          />
      </View>
      );
  };
}

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    resizeMode: 'contain',
  },
  pictureWrapper: {
    flex: 1,
    width: pictureWidth,
    height: pictureHeight,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    margin: 5,
  },
});

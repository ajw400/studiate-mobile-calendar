import React from 'react';
import { DirectUpload } from "activestorage"
import { Image, StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { ImageManipulator, FileSystem, Permissions } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import Photo from './Photo'
import { PHOTOS_DIR } from '../utils/uploadPhoto'

export default class GalleryScreen extends React.Component {

  saveToQueue = async () => {
    let { currentPhoto, goBack } = this.props
    const fileName = Date.now()
    const filePath = `${PHOTOS_DIR}/${fileName}.jpg`
    hwRatio = currentPhoto.height / currentPhoto.width
    if (currentPhoto.exif && currentPhoto.exif.Orientation) {
      console.log(currentPhoto.exif)
      currentPhoto = await ImageManipulator.manipulate(currentPhoto.uri, [{rotate: -currentPhoto.exif.Orientation}, { resize: { width: 600, height: 600 * hwRatio }}])
    }
    console.log("after if")
    FileSystem.moveAsync({
      from: currentPhoto.uri,
      to: filePath,
    }).then(() => goBack())
  }

  render() {
    const { goBack, currentPhoto } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.button} onPress={goBack}>
            <MaterialIcons name="arrow-back" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.saveToQueue}>
            <Text style={styles.whiteText}>Save to Studiate!</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentComponentStyle={{ flex: 1 }}>
          <View style={styles.pictures}>
              <Photo
                key={currentPhoto.uri}
                uri={currentPhoto.uri}
                onSelectionToggle={this.toggleSelection}
              />
              </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4630EB',
  },
  pictures: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  button: {
    padding: 20,
  },
  whiteText: {
    color: 'white',
  }
});

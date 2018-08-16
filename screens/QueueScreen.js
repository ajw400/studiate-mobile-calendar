import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { PHOTOS_DIR } from '../utils/uploadPhoto'
import { FileSystem } from 'expo'
import { MaterialIcons } from '@expo/vector-icons';
import { uploadPhotoAsync} from '../utils/uploadPhoto'
import { login } from '../utils/auth'


export default class QueueScreen extends React.Component {
  static navigationOptions = {
    title: 'Queue',
  }

  state = {
    photos: []
  }

  uploadPhoto = async (fileName) => {
    const filePath = `${PHOTOS_DIR}/${fileName}`
    return uploadPhotoAsync(filePath)
      .then((response) => {
        if (response.status === 200){
          console.log("success!")
          FileSystem.deleteAsync(filePath)
          .then(() => FileSystem.readDirectoryAsync(PHOTOS_DIR))
          .then((photos) => this.setState({ photos }))
          .then(() => console.log("done"))
        } else {
          login()
          console.log("failure!")
        }
      })
  }

  uploadQueue = async () => {
    const { photos } = this.state
    for (const photo of photos) {
      await this.uploadPhoto(photo)
    }
  }

  componentDidMount = async () => {
    console.log("photos dir", PHOTOS_DIR)
    this.subs = [
      this.props.navigation.addListener('willFocus', () => {
        FileSystem.readDirectoryAsync(PHOTOS_DIR)
        .then((photos) => this.setState({ photos }))
      })
    ]
    const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR)
    this.setState({ photos })
    console.log(photos)
  };

  componentWillUnmount() {
    this.subs.forEach((sub) => {
      sub.remove();
    });
  }

  render() {
    const { photos } = this.state
    return (
      <ScrollView style={styles.container}>
      <Text style={styles.text}>The {photos.length} photos below will be uploaded to Studiate when you are connected to WiFi</Text>
      <TouchableOpacity style={styles.button} onPress={this.uploadQueue}>
        <Text style={styles.textWhite}>Upload Now!</Text>
      </TouchableOpacity>
        {photos.map(photo => <Text style={styles.text} key={photo}>{photo}</Text>)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  text: {
    textAlign: 'center'
  },
  textWhite: {
    textAlign: 'center',
    color: 'white'
  },
  button: {
    padding: 20,
    backgroundColor: '#0A2472',
  },
});

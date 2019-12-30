import * as React from 'react';
import { Button, Image, View, ScrollView, TouchableHighlight, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// import ImagePicker from 'react-native-image-picker'
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

// export default class ImagePickerExample extends React.Component {
//   state = {
//     image: null,
//   };

//   render() {
//     let { image } = this.state;

//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Button
//           title="Pick an image from camera roll"
//           onPress={this._pickImage}
//         />
//         {image &&
//           <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
//           <Button
//           title="Back"
//           onPress={() => this.props.navigation.navigate("Profile")}
//         />
//       </View>
//     );
//   }

//   componentDidMount() {
//     this.getPermissionAsync();
//     console.log('hi');
//   }

//   getPermissionAsync = async () => {
//     if (Constants.platform.ios) {
//       const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//       if (status !== 'granted') {
//         alert('Sorry, we need camera roll permissions to make this work!');
//       }
//     }
//   }

//   _pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1
//     });

//     console.log(result);

//     if (!result.cancelled) {
//       this.setState({ image: result.uri });
//     }
//   };
// }
class ImagePickerExample extends React.Component {

state = {
  imageData: null,
}

getPhotoFromGallery = () => {
  ImagePicker.launchImageLibraryAsync(null, (response)  => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else {
      this.setState({ imageData: response });
    }
  });
};

onSubmit = () => {
  const { imageData } = this.state
  const { onSubmit } = this.props

  onSubmit({ imageData })
}

showPickedImage() {
  const { imageData } = this.state;

  if (imageData !== null) {
      return (
        <Image
        source={{ uri: imageData.uri }}
        style={{ alignSelf: 'center', width: 200, height: 200 }}
        />
      );
  } else {
    return (
      <View>
        <TouchableHighlight
          // style={styles.addPhoto}
          onPress={this.getPhotoFromGallery}
        >
          <Text 
          // style={styles.addPhotoText}
          >Add Photo</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

render() {
  const { image, onSubmit } = this.props;

  return (
    <ScrollView>

      <View 
      style={{padding: 100, justifyContent: "center"}}
      // style={styles.container}
      >
        {this.showPickedImage()}

        <Button 
        // style={styles.submit}
          onPress={this.onSubmit}
        title="Add Post" />
      </View>
    </ScrollView>
  );
}
}

export default ImagePickerExample;
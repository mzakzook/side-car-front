import React from 'react';
import { Image, View, ScrollView, TouchableHighlight, Text } from 'react-native'
import { connect } from 'react-redux';
import { withNavigation, StackActions } from 'react-navigation'
import { Hoshi } from 'react-native-textinput-effects';
import RNPickerSelect from 'react-native-picker-select';
import Button from 'react-native-button'
import { bizChanged, getProviders, getMyProviders } from '../actions/provider';


import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {addPhoto} from '../actions/addPhoto'
import { PATH } from '../environment'




class AddBiz extends React.Component {
  // static navigationOptions = {
  //   title: 'SideCar',
  // };

  createFormData = (photo, body) => {
    const data = new FormData();
  
    data.append("provider[images][]", {
      name: "upload.jpg",
      type: "image/jpg",
      uri:
        Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });
  
    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
    
    return data;
  };

  state = {
    biz_name: '',
    tax_id: '',
    placeholder_image: '',
    website: '',
    yelp: '',
    biz_phone: '',
    category: '',
    image: null
  }
  componentDidMount = () => {
    this.getPermissionAsync();
    console.log(this.props)
  }

  // t.string "biz_name"
  //   t.string "tax_id"
  //   t.string "photo_id"
  //   t.string "website"
  //   t.string "yelp"
  //   t.string "biz_phone"
  //   t.string "category"
  //   t.bigint "user_id", null:

  bizNameChanged = (value) => {
    this.setState({
      biz_name: value
    })
  }

  taxIdChanged = (value) => {
    this.setState({
      tax_id: value
    })
  }

  photoIdChanged = (value) => {
    this.setState({
      placeholder_image: value
    })
  }

  websiteChanged = (value) => {
    this.setState({
      website: value
    })
  }

  yelpChanged = (value) => {
    this.setState({
      yelp: value
    })
  }

  bizPhoneChanged = (value) => {
    this.setState({
      biz_phone: value
    })
  }

  categoryChanged = (value) => {
    this.setState({
      category: value
    })
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to allow you to choose existing photos!');
      }
      // await Permissions.askAsync(Permissions.CAMERA);
      
    }
  }
  
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
  
    console.log(result);
  
    if (!result.cancelled) {
      this.setState({ image: result });
      // this.props.addPhoto(this.state.image, this.props.providerId)
    }
  };

  // submitForm = () => {
    
  //   fetch('http://${PATH}:3000/providers', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       provider: {
  //         biz_name: this.state.biz_name,
  //         tax_id: this.state.tax_id,
  //         photo_id: this.state.photo_id,
  //         website: this.state.website,
  //         yelp: this.state.yelp,
  //         biz_phone: this.state.biz_phone,
  //         category: this.state.category,
  //         user_id: this.props.id
  //       }
  //     })
  //   })
  //   .then(res => res.json())
  //   .then(data => {
      
  //     const stuff = data.data.attributes
  //     this.props.bizChanged(stuff)
  //     this.props.getProviders()
  //     this.props.getMyProviders(this.props.id)
  //     this.props.navigation.dispatch(popAction)
  //     this.props.navigation.navigate('ProviderShow')
  //   })
  // }

  submitForm = () => {
    
    fetch(`http://${PATH}:3000/providers`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        'X-User-Email': this.props.email,
        'X-User-Token': this.props.authentication_token
      },
      body: this.createFormData(this.state.image, {
        
          "provider[biz_name]": this.state.biz_name,
          "provider[tax_id]": this.state.tax_id,
          "provider[placeholder_image]": this.state.placeholder_image,
          "provider[website]": this.state.website,
          "provider[yelp]": this.state.yelp,
          "provider[biz_phone]": this.state.biz_phone,
          "provider[category]": this.state.category,
          "provider[user_id]": this.props.id
        
      })
    })
    .then(res => res.json())
    .then(data => {
      
      const stuff = data.data.attributes
      this.props.bizChanged(stuff)
      this.props.getProviders()
      this.props.getMyProviders(this.props.id)
      this.props.navigation.dispatch(popAction)
      this.props.navigation.navigate('ProviderShow')
    })
  }


  render() {

    let { image } = this.state;

    return (
      <View style={styles.viewStyle}>
        <ScrollView>
        <Hoshi label={'Business Name'} inputPadding={16}
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={this.bizNameChanged.bind(this)} />
        <Hoshi label={"Tax ID"} inputPadding={16}
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={this.taxIdChanged.bind(this)} />
        <Hoshi label={"Upload Photo ID"} inputPadding={16}
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={this.photoIdChanged.bind(this)} />
        <Hoshi autoCapitalize='none' label={"Website"} inputPadding={16}
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={this.websiteChanged.bind(this)} />
        <Hoshi autoCapitalize='none' label={"Yelp"} inputPadding={16}
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={this.yelpChanged.bind(this)} />
        <Hoshi label={"Business Phone"} inputPadding={16} 
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={this.bizPhoneChanged.bind(this)} />
         <Button
        
        onPress={this._pickImage}
      >Pick an image from camera roll</Button>
      {image &&
        <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
        <RNPickerSelect
          // placeholder={ "Category" }
          style={pickerStyle}
          onValueChange={(value) => this.categoryChanged(value)}
          items={[
            { label: 'Food Truck', value: 'Food Truck' },
            { label: 'Bartending', value: 'Bartending' }
          ]}
        />
        <Button style={{ color: "black", marginTop: 38 }} onPress={() => this.submitForm()}>Submit</Button>
        <Button style={{ color: "black" }} onPress={() => this.props.navigation.navigate('Profile')}>Back to Profile</Button>
        </ScrollView>
      </View>

    );
  }




}
const mapStateToProps = (state) => {
  return {
    first_name: state.auth.first_name,
    last_name: state.auth.last_name,
    email: state.auth.email,
    avatar: state.auth.avatar,
    cell_number: state.auth.cell_number,
    id: state.auth.id,
    authentication_token: state.auth.authentication_token
  };
};

const styles = {
  viewStyle: {
    marginTop: 50,
    padding: 10
  },
  bottomText: {
    marginTop: 20,
    padding: 5,
    textAlign: 'center'
  }
};

const pickerStyle = {
	inputIOS: {
		color: 'black',
		paddingTop: 19,
		paddingHorizontal: 16,
    paddingBottom: 12,
    fontSize: 18,
    fontWeight: '700'
	},
	underline: { borderTopWidth: 0 },
	icon: {
		position: 'absolute',
		backgroundColor: 'transparent',
		borderTopWidth: 5,
		borderTopColor: '#00000099',
		borderRightWidth: 5,
		borderRightColor: 'transparent',
		borderLeftWidth: 5,
		borderLeftColor: 'transparent',
		width: 0,
		height: 0,
		top: 20,
		right: 15,
	},
};

const popAction = StackActions.pop({
  n: 1,
});


export default withNavigation(connect(mapStateToProps, { bizChanged, getMyProviders, getProviders })(AddBiz));






  


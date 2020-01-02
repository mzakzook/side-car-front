import React from 'react';
import { View, Button, AsyncStorage, Image } from 'react-native'
import LoginForm from '../components/LoginForm';
// import sidecarimage from '../../assets/images/sidecarimage.png'
class SignInScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'SideCar',
  // };

  render() {
    return (
      
      <View>
        <Image source={require('../../assets/images/sidecarimage.png')}
              style={{ marginTop: 50, height: 200, width: 200, alignSelf: 'center', borderRadius: 25 }}/>
        <LoginForm navigation={this.props.navigation}/>
      </View>
    );
  }

}

export default SignInScreen;
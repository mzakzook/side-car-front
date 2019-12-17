import React from 'react';
import { View, Button, AsyncStorage } from 'react-native'
import LoginForm from '../components/LoginForm';

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'SideCar',
  };

  render() {
    return (
      <View>
        <LoginForm navigation={this.props.navigation}/>
      </View>
    );
  }

}

export default SignInScreen;
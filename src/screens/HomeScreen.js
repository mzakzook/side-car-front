import React from 'react';
import { View, Button, Text, AsyncStorage } from 'react-native'
import NewUserForm from '../components/NewUserForm'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'SideCar',
  };

  render() {
    return (
      <View>
        <Text style={{
          textAlign: 'center',
          padding: 50,
          fontSize: 30,
          // color: '#A569BD',
          fontWeight: 'bold'
        }}
        >Hello</Text>
      <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

export default HomeScreen;
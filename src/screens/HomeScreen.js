import React from 'react';
import { View, Button, Text, AsyncStorage } from 'react-native'
import { connect } from 'react-redux';
import { logoutUser } from '../actions/'
import NewUserForm from '../components/NewUserForm'



class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'SideCar',
  };

  componentDidMount = () => {
    console.log(this.props)
  }

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
    this.props.logoutUser()
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };





}
export default connect(null, { logoutUser })(HomeScreen);


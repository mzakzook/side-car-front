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
        >Hello {this.props.first_name}</Text>
        <Button title="Sign out" onPress={this._signOutAsync} />
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
const mapStateToProps = (state) => {
  return {
    first_name: state.auth.first_name
  };
};

export default connect(mapStateToProps, { logoutUser })(HomeScreen);


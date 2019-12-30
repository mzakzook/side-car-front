import React from 'react';
import { View, Button, Text, AsyncStorage } from 'react-native'
import { connect } from 'react-redux';
import { logoutUser } from '../actions/'
import { withNavigation } from 'react-navigation'



class Profile extends React.Component {
  // static navigationOptions = {
  //   title: 'SideCar',
  // };
  state = {
    providers: []
  }

  componentDidMount = () => {
    fetch(`http://localhost:3000/providers?user_id=${toString(this.props.id)}`)
     .then(res => res.json())
     .then(data => {
       this.setState({
         providers: data
       })
     })
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
        >{this.props.first_name} {this.props.last_name}</Text>
         <Text style={{
          textAlign: 'center',
          padding: 50,
          fontSize: 20,
          // color: '#A569BD',
          fontWeight: 'bold'
        }}
        >{this.props.avatar}</Text>
        <Text style={{
          textAlign: 'center',
          padding: 50,
          fontSize: 20,
          // color: '#A569BD',
          fontWeight: 'bold'
        }}
        >{this.props.email}</Text>
         <Text style={{
          textAlign: 'center',
          padding: 50,
          fontSize: 20,
          // color: '#A569BD',
          fontWeight: 'bold'
        }}
        >{this.props.cell_number}</Text>
        <Button title="Add Business" onPress={() => this.props.navigation.navigate("AddBiz")} />
        <Button title="My Businesses" onPress={() => this.props.navigation.navigate("MyProviders")} />
        <Button title="Sign out" onPress={this._signOutAsync} />
        <Button title="Camera" onPress={() => this.props.navigation.navigate("Camera")} />
      </View>
    );
  }

  _signOutAsync = async () => {
    this.props.logoutUser()
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };



}
const mapStateToProps = (state) => {
  return {
    first_name: state.auth.first_name,
    last_name: state.auth.last_name,
    email: state.auth.email,
    avatar: state.auth.avatar,
    cell_number: state.auth.cell_number,
    id: state.auth.id
  };
};

export default withNavigation(connect(mapStateToProps, { logoutUser })(Profile));


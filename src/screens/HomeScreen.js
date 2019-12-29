import React from 'react';
import { View, Text, AsyncStorage } from 'react-native'
import { connect } from 'react-redux';
import Button from 'react-native-button';
import { findUser } from '../actions/findUser';




class HomeScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'SideCar',
  // };

  componentDidMount() {
    this._bootstrapAsync()
  }

  // // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if (!this.props.id) {
      console.log(userToken)
      this.props.findUser(userToken)
    }
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
        >Hello {this.props.first_name}</Text>
      </View>
    );
  }



}
const mapStateToProps = (state) => {
  return {
    first_name: state.auth.first_name,
    id: state.auth.id
  };
};

export default connect(mapStateToProps, { findUser })(HomeScreen);


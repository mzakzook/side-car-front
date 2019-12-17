import React, { Component } from 'react';
import { View, Text, ActivityIndicator, AsyncStorage, Alert } from 'react-native';
import { Jiro } from 'react-native-textinput-effects';
import Button from 'react-native-button';



class ForgotPassword extends Component {
  
  state = {
    email: ''
  }

  updateEmail = (value) => {
    this.setState({
      email: value
    })
  }

  onButtonSubmit = () => {
    console.log(this.state)
  }

  
  renderButton() {
    return (
      <Button style={{
        fontSize: 20, 
        color: 'black',
        // backgroundColor: '#2ECC71',
        padding: 20,
        marginTop: 10
      }}
      styleDisabled={{color: 'red'}}
      onPress={this.onButtonSubmit.bind(this)}
      >Submit</Button>
    );
  }




  render() {
    return (
      <View style={styles.viewStyle}> 
        <Text>Forgot Password</Text>
        <Jiro autoCapitalize = 'none' label={'Email'} inputPadding={16}
          inputStyle={{ color: 'white' }} borderColor={"black"} onChangeText={this.updateEmail.bind(this)} />
        {this.renderButton()}
        <Button onPress={() => this.props.navigation.navigate('Auth')}>Return to Login</Button>
      </View>
    );
  }
}

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



export default ForgotPassword;
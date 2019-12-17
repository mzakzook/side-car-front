import React, { Component } from 'react';
import { View, Text, ActivityIndicator, AsyncStorage } from 'react-native';
import { Jiro } from 'react-native-textinput-effects';
import _ from 'lodash';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions/';

class LoginForm extends Component {
  

  async componentDidUpdate(prevProps)  {
    if (prevProps.auth_token !== this.props.auth_token) {
      await AsyncStorage.setItem('userToken', this.props.auth_token);
      this.props.navigation.navigate('App');
    }
  }

  onButtonSubmit() {
    // console.log('Submitted: ', `${this.props.email} ${this.props.password}`);
    const { email, password } = this.props;
    this.props.loginUser({email, password});
  }
 
  emailChanged(value) {
    // const email = _.lowerCase(value.trim());
    this.props.emailChanged(value);
  }

  passwordChanged(value) {
    this.props.passwordChanged(value);
  }

  renderError() {
    if (this.props.error) {
      return (
        <Text style={{
          textAlign: 'center',
          fontSize: 20,
          // color: '#cc3333'
        }}
        >Sorry authentication failed</Text>
      );
    }
    return null;
  }

  renderButton() {
    if (this.props.spinner) {
      return (
        <ActivityIndicator style={{height: 80}} size="large" />
      );
    } 
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
      >Login</Button>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };


  render() {
    return (
      <View style={styles.viewStyle}> 
      <Text {...this.renderError()} />
        <Jiro autoCapitalize = 'none' label={'Email'} inputPadding={16}
          inputStyle={{ color: 'white' }} borderColor={"black"} onChangeText={this.emailChanged.bind(this)} value={this.props.email} />
        <Jiro label={"Password"} inputPadding={16}
          inputStyle={{ color: 'white' }} borderColor={"black"} onChangeText={this.passwordChanged.bind(this)} secureTextEntry /> 
        {this.renderButton()}
        <Text style={styles.bottomText}>Forgot Password?</Text>
        <Text style={styles.bottomText}>New? Create an Account</Text>
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

const mapStateToProps = (state) => {
  return {
    email: state.auth.email,
    password: state.auth.password, 
    error: state.auth.errorFlag,
    spinner: state.auth.spinner,
    auth_token: state.auth.auth_token
  };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);
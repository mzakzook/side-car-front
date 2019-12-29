import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import Button from 'react-native-button';
import { connect } from 'react-redux';
import { firstNameChanged, lastNameChanged, avatarChanged, cellNumberChanged, emailChanged, passwordChanged, createNewUser } from '../actions/newUser';

class NewUserForm extends Component {

  // async componentDidUpdate(prevProps) {
  //   if (prevProps.auth_token !== this.props.auth_token) {
  //     await AsyncStorage.setItem('userToken', this.props.auth_token);
  //     this.props.navigation.navigate('App');
  //   }
  // }

  onButtonSubmit() {
    // console.log('Submitted: ', `${this.props.email} ${this.props.password}`);
    const { firstName, lastName, email, avatar, password, cellNumber, navigation } = this.props;
    this.props.createNewUser({ firstName, lastName, email, avatar, password, cellNumber, navigation });
  }

  emailChanged(value) {
    // const email = _.lowerCase(value.trim());
    this.props.emailChanged(value);
  }

  firstNameChanged(value) {
    this.props.firstNameChanged(value);
  }

  lastNameChanged(value) {
    this.props.lastNameChanged(value)
  }

  passwordChanged(value) {
    this.props.passwordChanged(value)
  }

  avatarChanged(value) {
    this.props.avatarChanged(value)
  }

  cellNumberChanged(value) {
    this.props.cellNumberChanged(value)
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
        <ActivityIndicator style={{ height: 80 }} size="large" />
      );
    }
    return (
      <Button style={{
        fontSize: 20,
        // color: '#ffffff',
        // backgroundColor: '#2ECC71',
        padding: 20,
        marginTop: 10,
        color: 'black'
      }}
        styleDisabled={{ color: 'red' }}
        
        onPress={this.onButtonSubmit.bind(this)}
      >Create New Account</Button>
    );
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        
        <Text {...this.renderError()} />
        <Hoshi label={'First Name'} inputPadding={16}
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={this.firstNameChanged.bind(this)} />
        <Hoshi label={"Last Name"} inputPadding={16}
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={this.lastNameChanged.bind(this)} />
        <Hoshi label={"Cell Phone"} inputPadding={16}
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={this.cellNumberChanged.bind(this)} />
        <Hoshi label={"Avatar URL"} inputPadding={16}
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={this.avatarChanged.bind(this)} />
        <Hoshi autoCapitalize = 'none' label={"Email"} inputPadding={16}
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={this.emailChanged.bind(this)} />
        <Hoshi secureTextEntry autoCapitalize = 'none' label={"Password"} inputPadding={16}
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={this.passwordChanged.bind(this)} />
        {this.renderButton()}
        <Button style={{color: "black"}} onPress={() => this.props.navigation.navigate('Auth')}>Return to Login</Button>
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
    firstName: state.newUser.firstName,
    lastName: state.newUser.lastName,
    avatar: state.newUser.avatar,
    cellNumber: state.newUser.cellNumber,
    email: state.newUser.email,
    password: state.newUser.password,
    error: state.newUser.errorFlag,
    spinner: state.newUser.spinner,
  };
};

export default connect(mapStateToProps, { firstNameChanged, lastNameChanged, avatarChanged, cellNumberChanged, emailChanged, passwordChanged, createNewUser })(NewUserForm);
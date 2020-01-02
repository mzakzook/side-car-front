import React from 'react';
import { View, Text, AsyncStorage } from 'react-native'
import { connect } from 'react-redux';
import { withNavigation, StackActions, NavigationActions } from 'react-navigation'
import { Hoshi } from 'react-native-textinput-effects';
import RNPickerSelect from 'react-native-picker-select';
import Button from 'react-native-button'
import { bizChanged, getMyProviders, getProviders } from '../actions/provider';
import { updateUser } from '../actions/findUser';
import { PATH } from '../environment'



class EditProfile extends React.Component {
  // static navigationOptions = {
  //   title: 'SideCar',
  // };

  state = {
    email: '',
    first_name: '',
    last_name: '',
    cell_number: '',
    avatar: '',
    password: ''
  
  }
  componentDidMount = () => {
    console.log(this.props)
  }



  emailChanged = (value) => {
    this.setState({
      email: value
    })
  }


  firstNameChanged = (value) => {
    this.setState({
      first_name: value
    })
  }

  lastNameChanged = (value) => {
    this.setState({
      last_name: value
    })
  }

  cellNumberChanged = (value) => {
    this.setState({
      cell_number: value
    })
  }

  passwordChanged = (value) => {
    this.setState({
      password: value
    })
  }

  avatarChanged = (value) => {
    this.setState({
      avatar: value
    })
  }



  



  submitForm = () => {

    let saveData = {}
    if (this.state.avatar.length > 0) {
      saveData["avatar"] = this.state.avatar
    }
    if (this.state.first_name.length > 0) {
      saveData["first_name"] = this.state.first_name
    }
    if (this.state.last_name.length > 0) {
      saveData["last_name"] = this.state.last_name
    }
    if (this.state.email.length > 0) {
      saveData["email"] = this.state.email
    }
    if (this.state.password.length > 0) {
      saveData["password"] = this.state.password
    }
    if (this.state.cell_number.length > 0) {
      saveData["cell_number"] = this.state.cell_number
    }
    

    if (Object.entries(saveData).length !== 0 && saveData.constructor === Object) {
      fetch(`http://${PATH}:3000/users/${this.props.id}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: 
            saveData
          
        })
      })
        .then(res => res.json())
        .then(data => {
debugger
          const stuff = data.data.attributes
          
          this.props.updateUser(stuff)
          
          
          this.props.navigation.navigate('ProviderShow')
        })
    } else {
      this.props.navigation.dispatch(popAction)
    }
  }

  render() {
    return (
      <View style={styles.viewStyle}>

        <Hoshi inputPadding={16} placeholder={this.props.first_name}
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={this.firstNameChanged.bind(this)} />
        <Hoshi inputPadding={16} placeholder={this.props.last_name}
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={this.lastNameChanged.bind(this)} />
        <Hoshi inputPadding={16} placeholder={this.props.cell_number}
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={this.cellNumberChanged.bind(this)} />
        <Hoshi autoCapitalize = 'none' inputPadding={16} placeholder={this.props.avatar}
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={this.avatarChanged.bind(this)} />
        <Hoshi autoCapitalize = 'none' placeholder={this.props.email} inputPadding={16}
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={this.emailChanged.bind(this)} />
        <Hoshi secureTextEntry autoCapitalize = 'none' placeholder={this.props.password} inputPadding={16}
          inputStyle={{ color: 'black' }} borderColor={"black"} onChangeText={this.passwordChanged.bind(this)} />
        <Button style={{ color: "black", marginTop: 38 }} onPress={() => this.props.navigation.navigate("Profile")}>Cancel</Button>

        <Button style={{ color: "black" }} onPress={() => this.submitForm()}>Save</Button>
        
       
      </View>

    );
  }




}
const mapStateToProps = (state) => {
  return {
    email: state.auth.email,
    first_name: state.auth.first_name,
    last_name: state.auth.last_name,
    id: state.auth.id,
    cell_number: state.auth.cell_number,
    avatar: state.auth.avatar
  
  };
};


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

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'App' })],
});

const popAction = StackActions.pop({
  n: 1,
});




export default withNavigation(connect(mapStateToProps, { updateUser })(EditProfile));


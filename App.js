import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'
import React from 'react';
import Reducers from './src/reducers';
import thunkMiddleware from 'redux-thunk'


// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here & ForgotPassword.

// , Teacher: TeacherHomeScreen

const AppStack = createStackNavigator({ Home: HomeScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

let Navigation = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);



// renderNavBar() {
  // if (this.props.spinner) {
  //   return (
  //     <ActivityIndicator style={{ height: 80 }} size="large" />
  //   );
  // }
  // return (
  //   <Button style={{
  //     fontSize: 20,
  //     color: '#ffffff',
  //     backgroundColor: '#2ECC71',
  //     padding: 20,
  //     marginTop: 10
  //   }}
  //     styleDisabled={{ color: 'red' }}
  //     onPress={this.onButtonSubmit.bind(this)}
  //   >Create New Account</Button>
  // );
  // }

class App extends React.Component {

  render() {
    const loggerMiddleware = createLogger();
    const store = createStore(
      Reducers, 
      applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
      )
    );

    return (
      <Provider store={store}>
        <Navigation />
        
      </Provider>
    )
  }
}



export default App;
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'
import React from 'react';
import Reducers from './src/reducers';
import thunkMiddleware from 'redux-thunk'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import NewUserForm from './src/components/NewUserForm'
import ForgotPassword from './src/screens/ForgotPassword';

// const AppStack = createStackNavigator({ Home: HomeScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });



const MainTabs = createBottomTabNavigator({
  Feed: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: "Feed"
    }
  },
  Search: {
    screen: NewUserForm,
    navigationOptions: {
      tabBarLabel: "Search"
    }
  },
  Discover: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: "Discover"
    }
  }
});





const AppStack = createStackNavigator(
  {
    App: MainTabs,
    Promotion1: {
      screen: HomeScreen
    }
  }
);

let Navigation = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
      NewUser: NewUserForm,
      ForgotPassword: ForgotPassword
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);


class App extends React.Component {
  render() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const loggerMiddleware = createLogger();
    const store = createStore(
      Reducers,
      composeEnhancers( 
        applyMiddleware(        
          thunkMiddleware,
          loggerMiddleware
        ) 
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



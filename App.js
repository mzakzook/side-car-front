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
import Profile from './src/components/Profile';
import Discover from './src/components/Discover';
import ProviderShow from './src/components/ProviderShow'
import MyMapView from './src/components/MyMapView'
import AddBiz from './src/components/AddBiz'
import MyProviders from './src/components/MyProviders'
import EditBiz from './src/components/EditBiz'
import ImagePickerExample from './src/components/ImagePickerExample'
import EditEvent from './src/components/EditEvent'
import EditProfile from './src/components/EditProfile'

// const AppStack = createStackNavigator({ Home: HomeScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

const DiscStack = createStackNavigator(
  {
    Discover: {
      screen: Discover
    },
    ProviderShow: {
      screen: ProviderShow
    }
  }
  ,
  {
    headerMode: 'none'
  }
)

const ProfStack = createStackNavigator(
  {
    Profile: {
      screen: Profile
    },
    MyProviders: {
      screen: MyProviders
    },
    AddBiz: {
      screen: AddBiz
    },
    EditBiz: {
      screen: EditBiz
    }
  }
  ,

  {
    headerMode: 'none'
  }
)

const MainTabs = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: "Home"
    }
  },
  Discover: {
    screen: DiscStack,
    navigationOptions: {
      tabBarLabel: "Discover"
    }
  },
  Profile: {
    screen: ProfStack,
    navigationOptions: {
      tabBarLabel: "Profile"
    }
  }  
});





const AppStack = createStackNavigator(
  {
    App: MainTabs
  }
);





let Navigation = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
      NewUser: NewUserForm,
      ForgotPassword: ForgotPassword,
      Camera: ImagePickerExample,
      EditEvent: EditEvent,
      EditProfile: EditProfile
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



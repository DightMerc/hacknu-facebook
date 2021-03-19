// In App.js in a new project

import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import Auth from './screens/draw/auth.js';
import CodeCheck from './screens/draw/code_check.js';
import CreateProfile from './screens/draw/create_profile.js';
import ChooseCommunity from './screens/draw/choose_community.js';
import Home from './screens/draw/home.js';
import CommunityMap from './screens/draw/map.js';
import EditProfile from './screens/draw/edit_profile.js';

import { AsyncStorage } from 'react-native';

const Stack = createStackNavigator();

import { decode, encode } from 'base-64'

import GetRequestTypeList from './network/GetRequestTypeList.js'
import GetMaterialList from './network/GetMaterialList.js'
import GetResponsibleList from './network/GetResponsibleList.js'
import GetAllRequestTypes from './database/request_type.js'

import Engine from './database/base.js'

let engine = new Engine()

if (!global.engine) {
  global.engine = engine
}

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}


let customFonts = {
  'Montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
  'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
  'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),

};


export default class App extends React.Component {

  state = {
    fontsLoaded: false,
    screen: 'Auth',
    loading: true,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {

    AsyncStorage.getItem("user1").then(value => {
      if (value == null) {
        this.setState({ screen: 'Auth' })
      }
      else {
        this.setState({ screen: 'Home' })
      }
    }
    )

    this._loadFontsAsync();
    this.LoadStaticInfo()
  }

  LoadStaticInfo = () => {
    GetRequestTypeList().then(
      (result) => {
        engine.SetRequestType(result.result)
      }
    )

    GetMaterialList().then(
      (result) => {
        engine.SetMaterial(result.result)
      }
    )

    GetResponsibleList().then(
      (result) => {
        engine.SetResponsible(result.result)
      }
    )
  }

  render() {

    if (!this.state.fontsLoaded) {
      return <AppLoading />
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={this.state.screen}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Auth" component={Auth} />
            <Stack.Screen name="CodeCheck" component={CodeCheck} />
            <Stack.Screen name="CreateProfile" component={CreateProfile} />
            <Stack.Screen name="ChooseCommunity" component={ChooseCommunity} />
            <Stack.Screen name="CommunityMap" component={CommunityMap} />
            <Stack.Screen name="EditProfile" component={EditProfile} />

          </Stack.Navigator>
        </NavigationContainer>
      )
    }
  }
}

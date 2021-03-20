import * as React from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, Pressable, TouchableOpacity, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native';
// import { TextInput } from 'react-native-gesture-handler';
import TextInputModified from '../controls/TextInput.js'
import { CommonActions } from '@react-navigation/native';
import { AsyncStorage } from 'react-native';
import COLORS from '../colors.js';
import ButtonCustom from '../controls/ButtonCustom';
import Select from '../controls/Select.js';

import PostSetCategory from '../../network/PostSetCategory.js'

import GetCategoriesList from '../../network/GetCategoriesList.js'


export default class AuthScreen extends React.Component {

  state = {
    Login: '',
    LoginInvalid: false,
    nomenclature: [
      {
        id: '1',
        title: 'Anime',
      },
      {
        id: '2',
        title: 'Rock',
      },
      {
        id: '3',
        title: 'Coffee',
      },
      {
        id: '4',
        title: '18+',
      },
    ],
    team: ''
  }

  onChangeCode = (value) => {
    this.setState({ Login: value })
  }

  componentDidMount(){
    GetCategoriesList().then(
      (result)=>{
        console.log(result)
        this.setState({
          nomenclature: result.result
        })
      }
    )
  }
  

  Login = () => {
    Keyboard.dismiss()
    if (this.validate()) {
      AsyncStorage.getItem("device").then(device => {

        PostSetCategory(device, this.state.team).then(
          (result)=>{
            console.log(result)
            if (!result.error){
  
              AsyncStorage.setItem('team', this.state.Login).then(
                () => {
                  
                  this.props.navigation.navigate('Home')
        
                }
              )
  
            }
          }
        )

      })


    }
  }

  validate = () => {
    if (this.state.team != 'Teams'){
      return true
    }
    return false
  }

  communityChanged = (value) => {
    this.setState({team: value})
  }

  render() {
    return (
      <ImageBackground source={require('../../assets/background.png')} style={styles.ImageBackground}>
        <StatusBar barStyle='dark-content' />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <View style={styles.Container}>
            <View style={styles.SmallContainer}>
              <Text style={styles.TitleLabel}>Choose team</Text>
            </View>
            <Select title="Teams"
                children={this.state.nomenclature}
                onChange={this.communityChanged}
              />
            <View style={styles.SmallContainer}>
              <ButtonCustom
                type="green"
                disabled={false}
                onPress={this.Login}
                style={{ width: '100%' }}>
                Next
              </ButtonCustom>
            </View>

          </View>

        </TouchableWithoutFeedback>
      </ImageBackground>
    )
  }
}


const styles = StyleSheet.create({
  ImageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  Container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    marginHorizontal: 23
  },
  SmallContainer: {
    alignItems: 'center',
    paddingVertical: 10
  },
  TitleLabel: {
    fontFamily: 'Montserrat',
    fontSize: 24,
    fontWeight: '600',
    fontStyle: 'normal'
  },
  TextInputInactive: {
    height: 40,
    width: '100%',
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.SECONDARY,
    borderWidth: 1,
    paddingLeft: 11,
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
  TextInputActive: {
    height: 40,
    width: '100%',
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.MAIN,
    borderWidth: 1,
    paddingLeft: 11,
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
  TextInputError: {
    height: 40,
    width: '100%',
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.INVALID,
    borderWidth: 1,
    paddingLeft: 11,
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
  SubmitButton: {
    height: 46,
    width: '100%',
    backgroundColor: COLORS.MAIN,
    alignItems: 'center',
    justifyContent: 'center'
  },
  SubmitButtonText: {
    color: COLORS.WHITE,
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'normal'
  },
})
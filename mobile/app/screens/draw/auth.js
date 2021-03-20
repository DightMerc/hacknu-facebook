import * as React from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, Pressable, TouchableOpacity, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native';
// import { TextInput } from 'react-native-gesture-handler';
import TextInputModified from '../controls/TextInput.js'
import { CommonActions } from '@react-navigation/native';
import { AsyncStorage } from 'react-native';
import COLORS from '../colors.js';
import ButtonCustom from '../controls/ButtonCustom';

import PostPhoneAuth from '../../network/PostPhoneAuth.js'


export default class AuthScreen extends React.Component {

  state = {
    Login: '',
    LoginInvalid: false,
  }

  onChangePhone = (value) => {
    this.setState({ Login: value })
  }

  Login = () => {
    Keyboard.dismiss()
    if (this.validate()) {
      AsyncStorage.getItem("device").then(value => {
       
        PostPhoneAuth(value, this.state.Login).then(
          (result)=>{
              if (!result.error){
                AsyncStorage.setItem('user', 'true').then(
                  () => {
                    
                    this.props.navigation.navigate('CodeCheck', {code: '1984'})
          
                  }
                )
              }
          }
        )
      }
      )
      
    }
  }

  validate = () => {
    let result = true
    if (!this.PhoneInput.validate()) {
      result = false
    }

    return result
  }

  render() {
    return (
      <ImageBackground source={require('../../assets/background.png')} style={styles.ImageBackground}>
        <StatusBar barStyle='dark-content' />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <View style={styles.Container}>
            <View style={styles.SmallContainer}>
              <Text style={styles.TitleLabel}>Login</Text>
            </View>
            <View style={styles.SmallContainer}>
              <TextInputModified
                ref={(input) => { this.PhoneInput = input }}
                placeholder='Phone number'
                errorPlaceholder='Phone number*'
                placeholderTextColor={COLORS.BLACK}
                value={this.state.Login}
                onChangeText={text => this.onChangePhone(text)}
                keyboardType='phone-pad'
                onSubmitEditing={() => { this.Login() }}
              />
            </View>
            <View style={styles.SmallContainer}>
              <ButtonCustom
                type="green"
                disabled={false}
                onPress={this.Login}
                style={{ width: '100%' }}>
                Send code
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
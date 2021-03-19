import * as React from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, Pressable, TouchableOpacity, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native';
// import { TextInput } from 'react-native-gesture-handler';
import TextInputModified from '../controls/TextInput.js'
import { CommonActions } from '@react-navigation/native';
import { AsyncStorage } from 'react-native';
import COLORS from '../colors.js';
import ButtonCustom from '../controls/ButtonCustom';

import * as ImagePicker from 'expo-image-picker';


export default class AuthScreen extends React.Component {

  state = {
    Login: '',
    LoginInvalid: false,
    UsernameTitle: 'Your account',
    image: require('../../assets/unknown.jpg')
  }

  async componentDidMount(){
    
  }

  onChangeUsername = (value) => {
    this.setState({ Login: value, UsernameTitle: value })
  }

  pickImage = async () => {
    console.log('click')
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      this.setState({image: {uri: result.uri}})
      console.log(this.image.base64)
    }
  };

  Login = () => {
    Keyboard.dismiss()
    if (this.validate()) {

      AsyncStorage.setItem('user', 'true').then(
        () => {
          
          this.props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { name: 'ChooseCommunity' },
              ]
            })
          );
        }
      )
    }
  }

  validate = () => {
    let result = true
    if (!this.UsernameInput.validate()) {
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
            <TouchableOpacity
              style={styles.ProfilePhoto}
              onPress={this.pickImage}
            >
            <Image
              style={styles.ProfilePhoto}
              source={this.state.image}
              ref={(image)=>{this.image = image}}
            />
            </TouchableOpacity>
            <View style={styles.SmallContainer}>
              <Text style={styles.TitleLabel}>{this.state.UsernameTitle}</Text>
            </View>
            <View style={styles.SmallContainer}>
              <TextInputModified
                ref={(input) => { this.UsernameInput = input }}
                placeholder='Username'
                errorPlaceholder='Username*'
                placeholderTextColor={COLORS.BLACK}
                value={this.state.Login}
                onChangeText={text => this.onChangeUsername(text)}
                onSubmitEditing={() => { this.Login() }}
              />
            </View>
            <View style={styles.SmallContainer}>
              <ButtonCustom
                type="green"
                disabled={false}
                onPress={this.Login}
                style={{ width: '100%' }}>
                Sign Up
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
  ProfilePhoto: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    borderRadius: 75
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
import * as React from 'react';

import { StyleSheet, KeyboardAvoidingView, View, TouchableOpacity, Text } from 'react-native'
import COLORS from '../colors';

import TextInputModified from './TextInput.js'
import ButtonCustom from '../controls/ButtonCustom.js';

export default class SearchBar extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
    invalid: false,
    focused: false
  }

  GetStyle = () => {
    if (this.state.focused) {
      return styles.TextInputActive
    }
    else {
      if (this.state.invalid) {
        return styles.TextInputError
      } else {
        return styles.TextInputInactive
      }
    }
  }

  focus = () => {
    this.TextInput.focus()
  }

  validate = () => {
    console.log(this.props.nameTest)
    if (this.props.value.length > 0) {
      return true
    }
    else {
      this.setState({ invalid: true })
      return false
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={{
        // flex: 1
      }} behavior={Platform.OS === "ios" ? "position" : "height"} >
        <View style={styles.SearchBar}>
          <Text style={{
            alignSelf: 'flex-start',
            marginHorizontal: 24,
            marginTop: 24,
            fontFamily: 'Montserrat-SemiBold',
            fontWeight: '600',
            fontSize: 24,
            fontStyle: 'normal'
          }}>Поиск</Text>

          <View style={{
            marginHorizontal: 24,
            marginTop: 12
          }}>

            <TextInputModified
              ref={(input) => { this.SearchInput = input }}
              placeholder='Номер'
              errorPlaceholder={this.props.errorPlaceholder}
              value={this.props.value}
              onChangeText={text => this.props.onChange(text)}
              autoFocus={this.props.autoFocus}
              keyboardType={this.props.keyboardType}
              onSubmitEditing={this.props.onSubmit}
            />
          </View>
          <View style={styles.btnContainer}>
            <ButtonCustom type='white' disabled={false} onPress={this.props.onCancel} style={styles.btn}>Отмена</ButtonCustom>
            <ButtonCustom type='green' disabled={false} onPress={this.props.onSubmit} style={styles.btn}>Поиск</ButtonCustom>
          </View>
        </View>
      </KeyboardAvoidingView>
    )


  }
}

const styles = StyleSheet.create({
  SearchBar: {
    height: 200,
    width: '100%',
    backgroundColor: COLORS.WHITE,
    zIndex: 2,
    shadowColor: COLORS.MAIN,
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 1,
  },
  btnContainer: {
    //backgroundColor: '#f0f',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    paddingHorizontal: 12
  },
  btn: {
    flexGrow: 1,
    marginHorizontal: 10
  }
})
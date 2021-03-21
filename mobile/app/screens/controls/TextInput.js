import * as React from 'react';

import { TextInput, StyleSheet } from 'react-native'
import COLORS from '../colors';


export default class TextInputModified extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
    invalid: false,
    focused: false
  }

  GetStyle = () => {
    if (this.state.focused) {
      if (this.props.height) {
        return { ...styles.TextInputActive, height: this.props.height }
      }
      else {
        return styles.TextInputActive
      }
    }
    else {
      if (this.state.invalid) {
        if (this.props.height) {
          return { ...styles.TextInputError, height: this.props.height }
        }
        else {
          return styles.TextInputError
        }
      } else {
        if (this.props.height) {
          return { ...styles.TextInputInactive, height: this.props.height }
        }
        else {
          return styles.TextInputInactive
        }
      }
    }
  }

  focus = () => {
    this.TextInput.focus()
  }

  validate = () => {
    // console.log(this.props.nameTest)
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
      <TextInput
        ref={(input => { this.TextInput = input })}
        placeholder={this.state.invalid ? this.props.errorPlaceholder : this.props.placeholder}
        placeholderTextColor={this.state.invalid ? COLORS.INVALID : COLORS.SECONDARY}
        secureTextEntry={this.props.secureTextEntry}
        value={this.props.value}
        onChangeText={this.props.onChangeText}
        onFocus={() => { this.setState({ focused: true, invalid: false }) }}
        onBlur={() => { this.setState({ focused: false }) }}
        onSubmitEditing={this.props.onSubmitEditing}
        autoFocus={this.props.autoFocus}
        keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}
        multiline={this.props.multiline}
        style={
          this.GetStyle()
        }></TextInput>
    )


  }
}

const styles = StyleSheet.create({
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
    borderRadius: 4
    // color: '#1F7D4B'
  },
  TextInputActive: {
    height: 40,
    width: '100%',
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.ACTIVE,
    borderWidth: 1,
    paddingLeft: 11,
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: 'Montserrat',
    borderRadius: 4

    // color: '#1F7D4B'
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
    borderRadius: 4,
  },
})
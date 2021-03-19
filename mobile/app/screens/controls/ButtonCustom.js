import * as React from 'react';

import { StyleSheet, TouchableHighlight, View, Text } from 'react-native'
import { AddFileIcon } from '../../assets/svg-icons/addFile-icon';
import COLORS from '../colors';


export default class ButtonCustom extends React.Component {

  constructor(props) {
    super(props)
  }
  state = {
    disabled: this.props.disabled,
    type: this.props.type,
    pressed: false,
  }
  render() {
    if (this.props.type === 'green') {
      if (!this.props.disabled) {
        return (
          <View style={{ ...styles.buttonViewGreen, ...this.props.style }}>
            <TouchableHighlight
              style={styles.button}
              onPress={this.props.onPress}
              underlayColor={COLORS.ACTIVE}>
              <View style={styles.content}>
                <Text style={styles.textGreen}>{this.props.children}</Text>
              </View>
            </TouchableHighlight>
          </View>
        )
      }
      else {
        return (
          <View style={{ ...styles.buttonViewGreen, ...this.props.style, opacity: 0.5 }}>
            <TouchableHighlight
              style={styles.button}
              underlayColor={COLORS.DISABLED}>
              <View style={styles.content}>
                <Text style={styles.textGreen}>{this.props.children}</Text>
              </View>
            </TouchableHighlight>
          </View >
        )
      }
    }
    else if (this.props.type === 'white') {
      if (!this.props.disabled) {
        return (
          <View style={{ ...styles.buttonViewWhite, ...this.props.style }}>
            <TouchableHighlight
              style={styles.button}
              onPress={this.props.onPress}
              underlayColor={COLORS.GRAY}>
              <View style={styles.content}>
                <Text style={styles.textWhite}>{this.props.children}</Text>
              </View>
            </TouchableHighlight>
          </View>
        )
      }
      else {
        return (
          <View style={{ ...styles.buttonViewWhite, ...this.props.style, opacity: 0.5 }}>
            <TouchableHighlight
              style={styles.button}
              underlayColor={COLORS.WHITE}>
              <View style={styles.content}>
                <Text style={styles.textWhite}>{this.props.children}</Text>
              </View>
            </TouchableHighlight>
          </View >
        )
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  content: {
    flexDirection: 'row',
  },
  button: {
    paddingHorizontal: 43,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center'
  },
  buttonViewGreen: {
    backgroundColor: COLORS.MAIN,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    color: COLORS.WHITE,
  },
  textGreen: {
    color: COLORS.WHITE,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '600',
  },


  buttonViewWhite: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.TEXT,
    borderRadius: 3,
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
    color: COLORS.WHITE,
  },
  textWhite: {
    color: COLORS.TEXT,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '600',
  }
})
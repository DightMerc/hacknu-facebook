import * as React from 'react';

import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native'
import COLORS from '../colors';


export default class CheckBox extends React.Component {

  constructor(props) {
    super(props)
  }
  render() {
    return (
      this.props.checked?

      <TouchableOpacity style={{...styles.Container, height: this.props.height, width: this.props.width, backgroundColor: COLORS.MAIN}} onPress={this.props.onPress}>
        <Image source={require('../../assets/Check.png')} />
      </TouchableOpacity>
      :
    <TouchableOpacity style={{...styles.Container, height: this.props.height, width: this.props.width, backgroundColor: COLORS.WHITE}} onPress={this.props.onPress}>
      </TouchableOpacity>
    )


  }
}

const styles = StyleSheet.create({
  Container: {
    // marginVertical: 4,
    // marginHorizontal: 24,
    // flexDirection: 'row',
    borderColor: COLORS.MAIN,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'

  },
 
})
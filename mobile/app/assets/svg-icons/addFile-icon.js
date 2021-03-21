import React, { useState } from 'react'
import { View, Text, StyleSheet, } from 'react-native'
import { block } from 'react-native-reanimated'
import Svg, { Path, Rect } from 'react-native-svg'
import COLORS from '../../screens/colors'


export const AddFileIcon = ({ color, type = 'green' }) => {
  if (type === 'green') {
    return (
      <View style={styles.container}>
        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path d="M13.5156 4.68749H17.2739L12.9297 0.343307V4.10155C12.9297 4.42483 13.1923 4.68749 13.5156 4.68749Z" fill="#145533" />
          <Path d="M15.8594 20H4.14062C3.17133 20 2.38281 19.2115 2.38281 18.2422V1.75781C2.38281 0.788516 3.17133 0 4.14062 0H11.7578V4.10156C11.7578 5.07086 12.5463 5.85938 13.5156 5.85938H17.6172V18.2422C17.6172 19.2115 16.8287 20 15.8594 20Z" fill="#1F7D4B" />
          <Rect x="6.5" y="10" width="7" height="2" rx="1" fill="white" />
          <Rect x="9" y="14.5" width="7" height="2" rx="1" transform="rotate(-90 9 14.5)" fill="white" />
        </Svg>
      </View>
    )
  }
  else if (type === 'white') {
    return (
      <View style={styles.container}>
        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path d="M13.5156 4.68749H17.2739L12.9297 0.343307V4.10155C12.9297 4.42483 13.1923 4.68749 13.5156 4.68749Z" fill={COLORS.SECONDARY} />
          <Path d="M15.8594 20H4.14062C3.17133 20 2.38281 19.2115 2.38281 18.2422V1.75781C2.38281 0.788516 3.17133 0 4.14062 0H11.7578V4.10156C11.7578 5.07086 12.5463 5.85938 13.5156 5.85938H17.6172V18.2422C17.6172 19.2115 16.8287 20 15.8594 20Z" fill={COLORS.WHITE} />
          <Rect x="6.5" y="10" width="7" height="2" rx="1" fill={COLORS.MAIN} />
          <Rect x="9" y="14.5" width="7" height="2" rx="1" transform="rotate(-90 9 14.5)" fill={COLORS.MAIN} />
        </Svg>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight: 10
  }
});
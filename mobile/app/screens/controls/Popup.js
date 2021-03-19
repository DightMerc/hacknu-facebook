import React, { useState } from 'react'
import { View, ScrollView, KeyboardAvoidingView, Text, StyleSheet, Modal, Button } from 'react-native'
import COLORS from '../colors'
import ButtonCustom from './ButtonCustom'


export const Popup = ({ children, visible, closeBtn, onClose, noPadding }) => {
  return (

    <Modal visible={visible} animationType='fade' transparent={true}>

      <View style={styles.wrap}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : "height"}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            showsVerticalScrollIndicator={false}>
            <View style={!!noPadding ? { ...styles.content, paddingVertical: 0 } : styles.content}>
              {children}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        {
          closeBtn ?
            <View style={styles.closeBtnContainer}>
              <ButtonCustom onPress={onClose} type='green' disbles={false}>Закрыть</ButtonCustom>
            </View>
            :
            null
        }
      </View>
    </Modal>
  )
}


const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#000000BB',
    flex: 1,
    //flexShrink: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 75,
    //position: 'relative'
  },
  content: {
    paddingVertical: 20,
    backgroundColor: COLORS.WHITE,
    // flex: 1
  },
  closeBtnContainer: {
    position: 'absolute',
    bottom: 0,
    left: 24,
    width: '100%',
    //backgroundColor: '#f0f',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,

  },
})
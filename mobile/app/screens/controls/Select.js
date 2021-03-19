import * as React from 'react';

import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native'
import COLORS from '../colors';
import { Popup } from './Popup';


export default class Select extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
    title: this.props.title,
    collapsed: false,
    value: ''
  }
  onValueChange = (value) => {
    this.setState({ title: value, value })
    this.props.onChange(value)
  }

  

  render() {
    return (
      <View style={styles.Container}>
        <TouchableOpacity onPress={() => { this.setState({ collapsed: !this.state.collapsed }) }} style={styles.ToggleBar}>
          <View style={styles.Content}>
            <View style={styles.TitleHolder}>
              <Text style={styles.Title}>{this.state.title}</Text>
            </View>
          </View>
          <View style={styles.Toggle}>
            <Image
              style={styles.ToggleIcon}
              source={this.state.collapsed ? require('../../assets/Arrow.png') : require('../../assets/ArrowUp.png')}
            />
          </View>
        </TouchableOpacity>
        <View>
          <Popup
            visible={this.state.collapsed}
            closeBtn={true}
            onClose={() => { this.setState({ collapsed: false }) }}
            noPadding={true}
            children={this.props.children.map((item, index, arr) => {
              return (
                <TouchableOpacity
                  style={styles.itemContainer}
                  key={item.id}
                  onPress={() => {
                    this.onValueChange(item.title),
                      this.setState({ collapsed: false })
                  }}>
                  <Text>{item.title}</Text>
                </TouchableOpacity>
              )
            })} />
        </View>
      </View>
    )


  }
}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
  },
  IconHolder: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10
  },
  Icon: {
    alignSelf: 'center',
    width: 30,
    height: 30
  },
  TitleHolder: {
    flex: 6,
    justifyContent: 'center',
    marginHorizontal: 10
  },
  Title: {
    alignSelf: 'flex-start',
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal'
  },
  CounterHolder: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  CounterCurrent: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    color: COLORS.MAIN,
  },
  CounterMax: {
    fontFamily: 'Montserrat',
    fontSize: 11,
    fontWeight: '600',
    fontStyle: 'normal',
    color: COLORS.BLACK
  },
  ToggleBar: {
    height: 48,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,

    // shadowColor: COLORS.MAIN,
    // shadowOffset: { width: 0, height: 10 },
    // shadowOpacity: 0.15,
    // shadowRadius: 10,
    // elevation: 1,

    borderColor: '#BA98A9',
    borderBottomWidth: 1
  },
  Content: {
    flex: 9,
    flexDirection: 'row'
    // borderColor: '#BA98A9',
    // borderWidth: 1
  },
  Toggle: {
    flex: 1,
    // borderColor: '#BA98A9',
    // borderWidth: 1,
    justifyContent: 'center'
  },
  ToggleIcon: {
    alignSelf: 'center'
  },
  itemContainer: {
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    //borderBottomColor: COLORS.SECONDARY,
    //borderBottomWidth: 1,
    borderTopColor: COLORS.SECONDARY,
    borderTopWidth: 1,
    borderStyle: 'solid',
    height: 48,
    backgroundColor: COLORS.LIGHT
  },

})
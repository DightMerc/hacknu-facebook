import * as React from 'react';

import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native'
import COLORS from '../colors';


export default class DropDown extends React.Component {

  constructor(props) {
    super(props)
  }

  state = {
    collapsed: true
  }
  render() {
    return (
      <View style={styles.Container}>
        <TouchableOpacity onPress={() => { this.setState({ collapsed: !this.state.collapsed }) }} style={styles.ToggleBar}>
          <View style={styles.Content}>
            {
              this.props.icon ?
                <View style={styles.IconHolder}>
                  <Image
                    style={styles.Icon}
                    source={require('../../assets/File.png')}
                  />
                </View>
                :
                null
            }
            <View style={styles.TitleHolder}>
              <Text style={styles.Title}>{this.props.title}</Text>
            </View>
            {
              this.props.counter ?
                <View style={styles.CounterHolder}>
                  <Text style={styles.CounterCurrent}>{this.props.counter.current}/</Text>
                  <Text style={styles.CounterMax}>{this.props.counter.max}</Text>

                </View>
                :
                null
            }
          </View>
          <View style={styles.Toggle}>
            <Image
              style={styles.ToggleIcon}
              source={this.state.collapsed ? require('../../assets/Arrow.png') : require('../../assets/ArrowUp.png')}
            />
          </View>
        </TouchableOpacity>
        {
          !this.state.collapsed ?
            this.props.children
            :
            null
        }
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
  }
})
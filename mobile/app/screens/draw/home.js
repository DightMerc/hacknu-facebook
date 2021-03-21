import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



import CommunityMap from './map.js';
import EditProfile from './edit_profile.js'


import { ApplicationIcon } from '../../assets/svg-icons/application-icon.js';
import { SubtractIcon } from '../../assets/svg-icons/subtract-icon.js';
import COLORS from '../colors.js';

const Tab = createBottomTabNavigator();


function SubScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}


export default class HomeScreen extends React.Component {

  render() {
    return (
      <Tab.Navigator style={styles.TabBar}
        tabBarOptions={{
          style: styles.TabBar,
          labelStyle: styles.label,
          labelPosition: 'below-icon'
        }}>
        <Tab.Screen name="CommunityMap" component={CommunityMap}

          options={{
            tabBarLabel: 'Navigator',
            tabBarIcon: ({ focused, color, size }) => (
              <ApplicationIcon focused={focused} />
              //<Text>l</Text>

            ),
          }} />
        <Tab.Screen name="Settings" component={EditProfile}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ focused, color, size }) => (
              <SubtractIcon focused={focused} />

            ),
          }} />
      </Tab.Navigator >
    )
  }
}


const styles = StyleSheet.create({
  TabBar: {
    height: 100,
    paddingTop: 20,
    paddingBottom: 20
  },
  label: {
    fontSize: 12,
    lineHeight: 15,
    color: COLORS.TEXT
  }
})
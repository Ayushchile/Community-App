/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
// TopTabNav.tsx
/* eslint-disable prettier/prettier */
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Search from './TopBar/Search';
import Chat from './TopBar/ChatHome';
import { View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TopTab = createMaterialTopTabNavigator();

export default function TopTabNav() {
  return (
    <TopTab.Navigator
      initialRouteName="Search"
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: 'white' },
      }}>
      <TopTab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <MaterialIcons
                name="search"
                size={24}
                color={focused ? '#16247d' : '#111'}
              />
            </View>
          ),
        }}
      />
      <TopTab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <MaterialIcons
                name="message"
                size={24}
                color={focused ? '#16247d' : '#111'}
              />
            </View>
          ),
        }}
      />
    </TopTab.Navigator>
  );
}

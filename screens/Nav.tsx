/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { People, Notification, Profile, Add } from './BottomTab';
import {Home} from './BottomTab';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import Search from './TopBar/Search';
// import Chat from './TopBar/Chat';

const Tab = createBottomTabNavigator();
// const TopTab = createMaterialTopTabNavigator();

export default function Nav() {
  return (
    <>
    {/* { <TopTab.Navigator
      initialRouteName="Discover"
      tabBarOptions={{
        activeTintColor: 'black',
        labelStyle: { fontSize: 12 },
        style: { backgroundColor: 'white' },
      }}>
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <MaterialIcons
                name="search"
                size={24}
                color={focused ? '#16247d' : '#111'} />
            </View>
          ),
        }} />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <MaterialIcons
                name="message"
                size={24}
                color={focused ? '#16247d' : '#111'} />
            </View>
          ),
        }} />

    </TopTab.Navigator> } */}
    <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Entypo name="home" size={24} color={focused ? 'purple' : '#111'} />
              </View>
            ),
          }} />
        <Tab.Screen
          name="People"
          component={People}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <MaterialIcons
                  name="group"
                  size={24}
                  color={focused ? 'purple' : '#111'} />
              </View>
            ),
          }} />
        <Tab.Screen
          name="Add"
          component={Add}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <MaterialIcons
                  name="add-circle"
                  size={24}
                  color={focused ? 'purple' : '#111'} />
              </View>
            ),
          }} />
        <Tab.Screen
          name="Notification"
          component={Notification}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <MaterialIcons
                  name="notifications"
                  size={24}
                  color={focused ? 'purple' : '#111'} />
              </View>
            ),
          }} />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <MaterialIcons
                  name="person"
                  size={24}
                  color={focused ? 'purple' : '#111'} />
              </View>
            ),
          }} />
      </Tab.Navigator></>
  );
}


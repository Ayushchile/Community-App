/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Appbar } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import Timeline from './PrimaryScreen/TimeLine';
import Forum from './PrimaryScreen/Forum';
import Polls from './PrimaryScreen/Polls/Polls';
import Events from './PrimaryScreen/Event/Events';

const Tab = createMaterialTopTabNavigator();

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Action icon="magnify" onPress={() => navigation.navigate('Search')} />
        <Appbar.Content title=" " />
        <Image
          source={require('../assets/klann.png')} // Use the imported local image
          style={styles.image}
        />
        <Appbar.Content title=" " />
        <Appbar.Action icon="chat" onPress={() => navigation.navigate('home')} />
      </Appbar.Header>
      <Tab.Navigator
        initialRouteName="Timeline"
        tabBarOptions={{
          activeTintColor: 'black',
          labelStyle: { fontSize: 12 },
          style: { backgroundColor: 'white' },
        }}
      >
        <Tab.Screen
          name="Timeline"
          component={Timeline}
          options={{ tabBarLabel: 'Timeline' }}
        />
        <Tab.Screen
          name="Forum"
          component={Forum}
          options={{ tabBarLabel: 'Forum' }}
        />
        <Tab.Screen
          name="Polls"
          component={Polls}
          options={{ tabBarLabel: 'Polls' }}
        />
        <Tab.Screen
          name="Events"
          component={Events}
          options={{ tabBarLabel: 'Events' }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appbar: {
    backgroundColor: 'white',
  },
  image: {
    width: 35, // Set width same as the icon size
    height: 35, // Set height same as the icon size
    resizeMode: 'contain', // Ensure the image scales correctly
  },
});

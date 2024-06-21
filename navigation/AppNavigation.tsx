/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Nav';
import OnboardingScreen from '../screens/Onboarding';
import AddPoll from '../screens/PrimaryScreen/Polls/AddPoll';
import AddEvents from '../screens/PrimaryScreen/Event/AddEvents';
import Search from '../screens/TopBar/Search';
import Home from '../screens/Home';
import SignupScreen from '../screens/Signup';
import LoginScreen from '../screens/Login';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import ChatHomeScreen from '../screens/TopBar/ChatHome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ChatScreen from '../screens/TopBar/Chat';
import firestore from '@react-native-firebase/firestore';
import { StatusBar, StyleSheet } from 'react-native';

type RootStackParamList = {
    home: undefined;
    chat: { uid: string; name: string };
    login: undefined;
    signup: undefined;
    Onboarding: undefined;
    Nav: undefined;
    AddPoll: undefined;
    AddEvents: undefined;
    Home: undefined;
    ChatHome: undefined;
    ChatHomeScreen: undefined;
    Search: undefined;
  };

  const Stack = createStackNavigator<RootStackParamList>();

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: 'green',
    },
  };

  function AppNavigation() {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    useEffect(() => {
      const unregister = auth().onAuthStateChanged(userExist => {
        if (userExist) {
          firestore()
            .collection('users')
            .doc(userExist.uid)
            .update({
              status: 'online',
            });
          setUser(userExist);
        } else {
          setUser(null);
        }
      });

      return () => {
        unregister();
      };
    }, []);

    return (
      <PaperProvider theme={theme}>
        <StatusBar barStyle="light-content" backgroundColor="green" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerTintColor: '#AA336A',
            }}
          >
            {user ? (
              <>
              <Stack.Screen
              name="Onboarding"
              component={OnboardingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Nav"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Search"
              component={Search}
              options={{ title: 'Search' }}
            />
            <Stack.Screen
              name="AddPoll"
              component={AddPoll}
              options={{ headerShown: true, title: 'Create New Poll' }}
            />
            <Stack.Screen
              name="AddEvents"
              component={AddEvents}
              options={{ headerShown: true, title: 'Create New Event' }}
            />
                <Stack.Screen
                  name="home"
                  options={{
                    headerRight: () => (
                      <MaterialIcons
                        name="account-circle"
                        size={34}
                        color="#AA336A"
                        style={{ marginRight: 10 }}
                        onPress={() => auth().signOut()}
                      />
                    ),
                    title: 'Klann',
                  }}
                >
                  {props => <ChatHomeScreen {...props} user={user!} />}
                </Stack.Screen>
                <Stack.Screen
                  name="chat"
                  options={({ route }) => ({ title: route.params?.name })}
                >
                  {props => <ChatScreen {...props} user={user!} />}
                </Stack.Screen>
              </>
            ) : (
              <>
                <Stack.Screen
                  name="login"
                  component={LoginScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="signup"
                  component={SignupScreen}
                  options={{ headerShown: false }}
                />
              </>
            )}

            {/* Additional Screens */}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
  }

  export default AppNavigation;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
  });

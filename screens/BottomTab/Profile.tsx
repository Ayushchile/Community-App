/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//import { Card, IconButton } from 'react-native-paper';


const Profile = () => {

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar backgroundColor={'gray'} />
      <View style={{ width: '100%' }}>
        <Image
          source={require('../../assets/cover.jpg')}
          resizeMode="cover"
          style={{ height: 228, width: '100%' }}
        />
      </View>

      <View style={{ flex: 1, alignItems: 'center' }}>
        <Image
          source={require('../../assets/default-profile.png')}
          resizeMode="contain"
          style={{
            height: 190,
            width: 180,
            borderRadius: 800,
            borderColor: 'pink',
            borderWidth: 2,
            marginTop: -90,
          }}
        />

        <Text style={{ fontSize: 20, color: 'purple', marginVertical: 8 }}>
          Default User
        </Text>
        <Text style={{ color: 'black' }}>
          Graphics Designer
        </Text>

        <View style={{ flexDirection: 'row', marginVertical: 6, alignItems: 'center' }}>
          <MaterialIcons name="location-on" size={24} color="black" />
          <Text style={{ marginLeft: 4 }}>Delhi, India</Text>
        </View>


        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              width: 124,
              height: 36,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'purple',
              borderRadius: 10,
              marginHorizontal: 10,
            }}
          >
            <Text style={{ color: 'white' }}>Timeline</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 124,
              height: 36,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'purple',
              borderRadius: 10,
              marginHorizontal: 10,
            }}
          >
            <Text style={{ color: 'white' }}>About</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>About Me</Text>
          <Card style={{ backgroundColor: 'gray', padding: 20, width: 200, height: 200 }}>
            <IconButton icon="account-circle" color="white" size={15} />
          </Card>
        </View>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Material Status</Text>
        <Card style={{ backgroundColor: 'gray', padding: 20, width: 200, height: 200 }}>
            <IconButton icon="account-circle" color="white" size={15} />
          </Card>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Work Status</Text>
        <Card style={{ backgroundColor: 'gray', padding: 20, width: 200, height: 200 }}>
            <IconButton icon="account-circle" color="white" size={15} />
          </Card>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Work</Text>
        <Card style={{ backgroundColor: 'gray', padding: 20, width: 200, height: 200 }}>
            <IconButton icon="account-circle" color="white" size={15} />
          </Card>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>College</Text>
        <Card style={{ backgroundColor: 'gray', padding: 20, width: 200, height: 200 }}>
            <IconButton icon="account-circle" color="white" size={15} />
          </Card>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>School</Text> */}
      </View>

    </View>
  );
};

export default Profile;

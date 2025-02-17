/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Signup({ navigation }: { navigation: any }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [showNext, setShowNext] = useState(false);
    const [loading, setLoading] = useState(false);

    const userSignup = async () => {
        setLoading(true);

        if (!email || !password || !image || !name) {
            alert('Please fill all the fields!');
            setLoading(false);
            return;
        }

        try {
            const result = await auth().createUserWithEmailAndPassword(email, password);

            await firestore().collection('users').doc(result.user.uid).set({
                name: name,
                email: result.user.email,
                uid: result.user.uid,
                pic: image,
                status: 'Online',
            });

            setLoading(false);
        } catch (error) {
            alert('Something went wrong: ');
            setLoading(false);
        }
    };

    const pickImageAndUpload = () => {
        launchImageLibrary({
            quality: 0.5,
            mediaType: 'photo',
        }, (fileobj) => {
            if (!fileobj || !fileobj.assets || !fileobj.assets[0]) {
                Alert.alert('Error picking image');
                return;
            }
            const uploadTask = storage().ref().child(`/userprofile/${Date.now()}`).putFile(fileobj.assets?.[0]?.uri ?? '');

            uploadTask.on('state_changed',
                (snapshot) => {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (progress === 100) {Alert.alert('image uploaded');}
                },
                (_error) => {
                    Alert.alert('error uploading image');
                },
                () => {
                    if (uploadTask.snapshot) {
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            setImage(downloadURL);
                        });
                    } else {
                        // Handle the case where uploadTask.snapshot is null
                        Alert.alert('Error uploading image: Snapshot is null');
                    }
                }
            );
        });
    };
    return (
        <KeyboardAvoidingView behavior="position">
            <View style={styles.box1}>
                <Text style={styles.text}>Welcome to Klann!</Text>
                <Image style={styles.img} source={require('../assets/klann.png')} />
            </View>
            <View style={styles.box2}>
                {!showNext &&
                    <>
                        <TextInput label="Email" value={email} onChangeText={(text) => setEmail(text)} mode="outlined" />
                        <TextInput label="Password" mode="outlined" value={password} onChangeText={(text) => setPassword(text)} secureTextEntry />
                    </>
                }

                {showNext ?
                    <>
                        <TextInput label="Name" value={name} onChangeText={(text) => setName(text)} mode="outlined" />
                        <Button mode="contained" onPress={() => pickImageAndUpload()} >Select Profile Photo</Button>
                        <Button mode="contained" disabled={!image} onPress={() => userSignup()} >Signup</Button>
                    </>
                    :
                    <Button mode="contained" onPress={() => setShowNext(true)} >Next</Button>
                }

                <TouchableOpacity onPress={() => navigation.goBack()}><Text style={{ textAlign: 'center' }}>Already have an account ?</Text></TouchableOpacity>
            </View>
            {loading && <ActivityIndicator size="large" color="#00ff00" />}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 22,
        color: '#AA336A',
        margin: 10,
    },
    img: {
        width: 200,
        height: 200,
    },
  box1: {
        alignItems: 'center',
    },
    box2: {
        paddingHorizontal: 40,
        justifyContent: 'space-evenly',
        height: '50%',
    },
});
function alert(_arg0: string) {
    throw new Error('Function not implemented.');
}


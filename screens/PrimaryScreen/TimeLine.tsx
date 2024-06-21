/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Post = {
    id: string;
    name: string;
    text: string;
    timestamp: number;
    avatar: any; // Update the type according to the image source type if necessary
    image: any;  // Update the type according to the image source type if necessary
};

const posts: Post[] = [
    {
        id: "1",
        name: "User1",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        timestamp: 1569109273726,
        avatar: require("../../assets/avatar1.png"),
        image: require("../../assets/tempPost1.jpg"),
    },
    {
        id: "2",
        name: "User2",
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        timestamp: 1569109273726,
        avatar: require("../../assets/avatar2.png"),
        image: require("../../assets/tempPost2.jpg"),
    },
    {
        id: "3",
        name: "User3",
        text: "Amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant.",
        timestamp: 1569109273726,
        avatar: require("../../assets/avatar3.png"),
        image: require("../../assets/tempPost3.jpg"),
    },
    {
        id: "4",
        name: "User4",
        text: "At varius vel pharetra vel turpis nunc eget lorem. Lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor. Adipiscing tristique risus nec feugiat in fermentum.",
        timestamp: 1569109273726,
        avatar: require("../../assets/avatar4.jpg"),
        image: require("../../assets/tempPost4.jpg"),
    },
];

type Props = {};

export default class HomeScreen extends React.Component<Props> {
    renderPost = (post: Post) => {
        return (
            <View style={styles.feedItem}>
                <View style={{ flexDirection: "row" }}>
                        <Image source={post.avatar} style={styles.avatar} />
                        <View>
                            <Text style={styles.userName}>{post.name}</Text>
                        </View>
                </View>
                <View style={{ flex: 1 }}>
                    <Image source={post.image} style={styles.postImage} resizeMode="cover" />
                    <Text style={styles.post}>{post.text}</Text>
                    <View style={{ flexDirection: "row", marginTop: 7}}>
                        <MaterialIcons name="favorite" size={24} color="#73788B" style={{ marginRight: 16 }} />
                        <MaterialIcons name="comment" size={24} color="#73788B" />
                    </View>
                </View>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.feed}
                    data={posts}
                    renderItem={({ item }) => this.renderPost(item)}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    headerTitle: {
        marginTop:20,
        fontSize: 25,
        fontWeight: "500",
    },
    feed: {
        marginHorizontal: 16,
    },
    feedItem: {
        backgroundColor: "#E6E6FA",
        borderRadius: 10,
        padding: 8,
        marginVertical: 8,
    },
    avatar: {
        width: 35,
        height: 35,
        borderRadius: 18,
        marginRight: 16,
    },
    userName:{
        paddingTop:7,
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#454D65",
    },
    post: {
        fontSize: 14,
        color: "#838899",
    },
    postImage: {
        width: '100%',
        height: 300,
        borderRadius: 5,
        marginVertical: 16,
        borderWidth: 2,
        borderColor: 'white',
    },
});

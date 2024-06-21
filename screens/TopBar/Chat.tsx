/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
 
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

interface Message {
  _id: string;
  text: string;
  createdAt: Date;
  user: {
    _id: string;
    name?: string;
    avatar?: string;
  };
}

interface ChatProps {
  user: { uid: string };
  route: { params: { uid: string } };
}

const Chat: React.FC<ChatProps> = ({ user, route }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { uid } = route.params; // uid of user we are chatting with

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAllMessages = async () => {
    const docid = uid > user.uid ? `${user.uid}-${uid}` : `${uid}-${user.uid}`;
    const querySnap = await firestore()
      .collection('chatroom')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .get();

    const allmsg: Message[] = querySnap.docs.map(docSnap => {
      const data = docSnap.data();
      return {
        _id: docSnap.id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
      };
    });

    setMessages(allmsg);
  };

  useEffect(() => {
    getAllMessages();
  }, [getAllMessages]);

  const onSend = (messagesArray: any[]) => {
    const msg = messagesArray[0];
    const mymsg = {
        ...msg,
        sentBy:user.uid,
        sentTo:uid,
        createdAt:new Date(),
    };
    setMessages(previousMessages =>GiftedChat.append(previousMessages, mymsg));
    const docid = uid > user.uid ? user.uid + '-' + uid : uid + '-' + user.uid; //to generate same docid for two users chatting with each other

    firestore().collection('chatroom')
    .doc(docid)  //created to add security rules in future
    .collection('messages')
    .add({...mymsg, createdAt:firestore.FieldValue.serverTimestamp()}); //to get the server time bcause it will same for all users
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: user.uid,
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: '#AA336A',
                },
                left: {
                  backgroundColor: 'pink',
                },
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default Chat;

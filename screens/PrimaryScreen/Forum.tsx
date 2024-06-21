/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat, Bubble, IMessage } from 'react-native-gifted-chat';
interface Message extends IMessage {
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

const Chat: React.FC<ChatProps> = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const uid = '1234'; // uid of user we are chatting with
  const uid2 = '5678'; // My uid 
  const uid3 = '1111'; // uid of user we are chatting with

  useEffect(() => {
    const initialMessages: Message[] = [
      {
        _id: '1',
        text: 'Hi there!',
        createdAt: new Date(),
        user: {
          _id: uid,
          name: 'User1', 
          avatar: require('../../assets/avatar1.png'),
        },
      },
      {
        _id: '3',
        text: 'Hi!',
        createdAt: new Date(),
        user: {
          _id: uid3,
          name: 'User3', 
          avatar: require('../../assets/avatar3.png'),
        },
      },
      {
        _id: '2',
        text: 'Hello Everyone',
        createdAt: new Date(),
        user: {
          _id: uid2,
          name: 'You', 
          avatar: require('../../assets/avatar2.png'),
        },
      },
    ];
    setMessages(initialMessages);
  }, [uid, uid2]);

  const onSend = (messagesArray: Message[]) => {
    const msg = messagesArray[0];
    const mymsg = {
      ...msg,
      user: {
        _id: uid2,
        name: 'You', 
        avatar: require('../../assets/avatar2.png'),
      },
      createdAt: new Date(),
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg));
  };

  const renderMessage = (props: any) => {
    const { currentMessage } = props;
    return (
      <View style={{ paddingHorizontal: 10, paddingBottom: 5 }}>
        <Text style={styles.senderName}>{currentMessage.user.name}</Text>
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
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: uid2,
        }}
        renderBubble={renderMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  senderName: {
    fontSize: 12,
    color: 'gray',
  },
});

export default Chat;

/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Image, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Option {
  value: string;
  key: number;
  selected?: boolean; // Added selected field
}

interface Poll {
  question: string;
  options: Option[];
}

export default function Polls() {
  const navigation = useNavigation();
  const route = useRoute();
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    if (route.params?.newPoll) {
      const newPoll = route.params.newPoll as Poll;
      setPolls((prevPolls) => [...prevPolls, newPoll]);
    }
  }, [route.params?.newPoll]);

  const handleOptionSelection = (poll: Poll, optionIndex: number) => {
    const updatedPolls = polls.map((p) => {
      if (p === poll) {
        const updatedOptions = p.options.map((option, index) => {
          return index === optionIndex ? { ...option, selected: true } : { ...option, selected: false };
        });
        return { ...p, options: updatedOptions };
      }
      return p;
    });
    setPolls(updatedPolls);
  };

  const renderOption = (option: Option, index: number, poll: Poll) => (
    <TouchableOpacity
      key={option.key}
      onPress={() => handleOptionSelection(poll, index)}
      style={[styles.optionContainer, option.selected && styles.selectedOption]} // Apply styles based on selected status
    >
      <Text style={styles.optionText}>{option.value}</Text>
    </TouchableOpacity>
  );

  const renderPoll = ({ item }: { item: Poll }) => (
    <View style={styles.pollItem}>
      <Text style={styles.pollQuestion}>{item.question}</Text>
      {item.options.map((option, index) => renderOption(option, index, item))}
    </View>
  );

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      {polls.length === 0 ? (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../../../assets/polls.png')} style={{ width: 400, height: 300 }} />
        </View>
      ) : (
        <FlatList
          data={polls}
          renderItem={renderPoll}
          keyExtractor={(item, index) => index.toString()}
          style={{ width: '100%' }}
          contentContainerStyle={{ alignItems: 'center', paddingBottom: 100 }}
        />
      )}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          navigation.navigate('AddPoll');
        }}>
        <Text style={styles.addBtnText}>Create Poll</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  addBtn: {
    height: 50,
    backgroundColor: 'purple',
    borderRadius: 30,
    position: 'absolute',
    bottom: 50,
    right: 20,
    padding: 14,
  },
  addBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  pollItem: {
    backgroundColor: '#E6E6FA',
    padding: 20,
    marginVertical: 8,
    width: 380,
    borderRadius: 10,
    alignItems: 'center',
  },
  pollQuestion: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pollOption: {
    fontSize: 16,
    color: 'black',
  },
  optionContainer: {
    backgroundColor: '#CBC3E3',
    padding: 10,
    width: 330,
    borderRadius: 40,
    marginVertical: 5,
  },
  optionText: {
    fontSize: 16,
    color: 'white',
  },
  selectedOption: {
    backgroundColor: 'purple', // Selected option style
    color: 'black',
  },
});

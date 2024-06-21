/* eslint-disable prettier/prettier */
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import OptionItem from './OptionItem';

interface Option {
  value: string;
  key: number;
}

export default function AddPoll() {
  const navigation = useNavigation();
  const [question, setQuestion] = useState<string>('');
  const [options, setOptions] = useState<Option[]>([
    { value: '', key: 0 },
    { value: '', key: 1 },
  ]);

  const editOption = (item: Option, ind: number, txt: string) => {
    let tempOptions = [...options];
    tempOptions[ind] = { ...tempOptions[ind], value: txt };
    setOptions(tempOptions);
  };

  const addOption = () => {
    let tempOptions = [...options, { value: '', key: options.length }];
    setOptions(tempOptions);
  };

  const savePoll = () => {
    if (question.trim() && options.some(option => option.value.trim())) {
      const newPoll = { question, options };
      navigation.navigate('Polls', { newPoll });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.captionArea}>
          <TextInput
            placeholder="Enter your question here..."
            value={question}
            onChangeText={setQuestion}
            multiline
          />
        </View>
        {options.map((item, index) => (
          <OptionItem
            key={item.key}
            item={item}
            onChangeText={(txt: string) => {
              editOption(item, index, txt);
            }}
          />
        ))}
        <TouchableOpacity
          style={styles.addButton}
          onPress={addOption}
        >
          <Text style={styles.addButtonText}>Add Option</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Button title="Save" onPress={savePoll} color="purple" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 20,
  },
  captionArea: {
    width: '100%',
    borderRadius: 10,
    height: 80,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    padding: 10,
  },
  addButton: {
    padding: 10,
    borderRadius: 30,
    width: 100,
    marginTop: 20,
    backgroundColor: 'purple',
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  footer: {
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
});

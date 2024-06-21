/* eslint-disable prettier/prettier */
import { View, TextInput, StyleSheet } from 'react-native';
import React from 'react';

interface OptionItemProps {
  item: {
    value: string;
    key: number;
  };
  onChangeText: (text: string) => void;
}

export default function OptionItem({ item, onChangeText }: OptionItemProps) {
  return (
    <View style={styles.optionItem}>
      <TextInput
        placeholder="Option"
        value={item.value}
        onChangeText={onChangeText}
        style={styles.optionInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  optionItem: {
    width: '90%',
    borderRadius: 20,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: 'white',
  },
  optionInput: {
    width: '100%',
    height: '100%',
  },
});

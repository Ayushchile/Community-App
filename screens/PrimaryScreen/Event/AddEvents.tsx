/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import CalendarPicker, { DateChangedCallback } from 'react-native-calendar-picker';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';

export default function AddEvents() {
  const [selectedStartDate, setSelectedStartDate] = useState('DD/MM/YYYY');
  const [selectedEndDate, setSelectedEndDate] = useState('DD/MM/YYYY');
  const [question, setQuestion] = useState<string>('');
  const [selectImage, setSelectImage] = useState<string>('');
  const navigation = useNavigation();

  const minDate = new Date(); // Today
  const maxDate = new Date(2027, 6, 3);

  const onDateChange: DateChangedCallback = (date, type) => {
    const newDate: string = JSON.stringify(date);
    const newDate1: string = newDate.substring(1, newDate.length - 1);
    const dates: string[] = newDate1.split('T');
    const date1: string[] = dates[0].split('-');
    const day: string = date1[2];
    const month: string = date1[1];
    const year: string = date1[0];
    if (type === 'END_DATE') {
      if (day === undefined) {
        setSelectedEndDate('DD/MM/YYYY');
      } else {
        setSelectedEndDate(day + '/' + month + '/' + year);
      }
    } else {
      setSelectedStartDate(day + '/' + month + '/' + year);
      setSelectedEndDate('DD/MM/YYYY');
    }
  };

  const saveEvent = () => {
    const newEvent = {
      question,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      image: selectImage,
    };
    navigation.navigate('Events', { newEvent });
  };

  const ImagePicker = () => {
    let option = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(option, response => {
      if (response.assets && response.assets.length > 0) {
        setSelectImage(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.captionArea}>
          <TextInput
            placeholder="Enter Event Title"
            value={question}
            onChangeText={setQuestion}
            multiline
            style={{ height: '100%', padding: 10 }}
          />
        </View>
        {selectImage ? (
          <Image source={{ uri: selectImage }} style={styles.image} />
        ) : null}
        <TouchableOpacity onPress={ImagePicker}>
          <Text style={styles.galleryText}>Add Image</Text>
        </TouchableOpacity>
        <Text>Pick Start and End Dates</Text>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={minDate}
          maxDate={maxDate}
          todayBackgroundColor="pink"
          selectedDayColor="purple"
          selectedDayTextColor="white"
          onDateChange={onDateChange}
        />
        <Text style={styles.dateText}>{'Start Date : ' + selectedStartDate}</Text>
        <Text style={styles.dateText}>{'End Date : ' + selectedEndDate}</Text>
      </ScrollView>
      <View style={styles.footer}>
        <Button title="Save" onPress={saveEvent} color="purple" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    alignItems: 'center',
    padding: 20,
  },
  captionArea: {
    width: '100%',
    borderRadius: 10,
    height: 60,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 400,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  galleryText: {
    fontSize: 18,
    color: 'purple',
    marginBottom: 40,
  },
  dateText: {
    fontSize: 15,
    color: 'purple',
    padding: 20,
  },
  footer: {
    padding: 20,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
});


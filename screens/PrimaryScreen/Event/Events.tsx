/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Image, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Event {
  question: string;
  startDate: string;
  endDate: string;
  selection?: 'Yes' | 'No'; // Add selection field to Event interface
  image?: string;
}

export default function Events() {
  const navigation = useNavigation();
  const route = useRoute();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (route.params?.newEvent) {
      const newEvent = route.params.newEvent as Event;
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
  }, [route.params?.newEvent]);

  const handleSelection = (index: number, selection: 'Yes' | 'No') => {
    const updatedEvents = events.map((event, i) => (
      i === index ? { ...event, selection } : event
    ));
    setEvents(updatedEvents);
  };

  const renderEvent = ({ item, index }: { item: Event, index: number }) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventTextheading}>{item.question}</Text>
      <Text style={styles.eventText}>{`Start Date: ${item.startDate}`}</Text>
      <Text style={styles.eventText}>{`End Date: ${item.endDate}`}</Text>
      {item.image && ( // Render image if available
        <Image source={{ uri: item.image }} style={styles.eventImage} />
      )}
      <View style={styles.selectionContainer}>
        <TouchableOpacity
          style={[styles.selectionButton, item.selection === 'Yes' && styles.selectedButtonYes]}
          onPress={() => handleSelection(index, 'Yes')}
        >
          <Text style={styles.selectionText}>Yes,I am Attending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.selectionButton, item.selection === 'No' && styles.selectedButtonNo]}
          onPress={() => handleSelection(index, 'No')}
        >
          <Text style={styles.selectionText}>No, Not Attending</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      {events.length === 0 ? (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../../../assets/events.png')} style={{ width: 300, height: 300 }} />
        </View>
      ) : (
        <FlatList
          data={events}
          renderItem={renderEvent}
          keyExtractor={(item, index) => index.toString()}
          style={{ width: '100%' }}
          contentContainerStyle={{ alignItems: 'center', paddingBottom: 100 }}
        />
      )}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          navigation.navigate('AddEvents');
        }}>
        <Text style={styles.addBtnText}>Create Event</Text>
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
  eventItem: {
    backgroundColor: '#E6E6FA',
    padding: 20,
    marginVertical: 8,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
  },
  eventText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  selectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  selectionButton: {
    backgroundColor: '#CBC3E3',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  selectedButtonYes: {
    backgroundColor: 'green',
  },
  selectedButtonNo: {
    backgroundColor: 'red',
  },
  selectionText: {
    color: 'white',
    fontSize: 16,
  },
  eventTextheading: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
  },
  eventImage: {
    width: 300,
    height: 400,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 10, // Add border radius for rounded corners
  },
});

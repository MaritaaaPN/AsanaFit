import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../theme';

const SessionItem = ({ item, index }) => {
  return (
    <View style={styles.sessionItem}>
      <View style={styles.numberContainer}>
        <Text style={styles.number}>{index + 1}</Text>
      </View>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View>
        <Text style={styles.duration}>{item.duration}</Text>
        <Text style={styles.sessionTitle}>{item.title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sessionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  numberContainer: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: '#fff',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  number: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  duration: {
    color: 'green',
    fontSize: 12,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SessionItem;

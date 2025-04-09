import React from 'react';
import { Text, View, Image, Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme';
 
const CardItem = ({ item, onPress }) => {
  return (
    <Pressable style={styles.card} onPress={() => onPress(item.title)}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 250,
    borderRadius: 15,
    backgroundColor: '#f9f9f9',
    marginRight: 16,
    padding: 12,
    elevation: 4,
  },
  cardImage: {
    width: '100%',
    height: 140,
    borderRadius: 10,
  },
  category: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: 'gray',
    marginTop: 2,
  },
});

export default CardItem;

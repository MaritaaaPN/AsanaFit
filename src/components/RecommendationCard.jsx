import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../theme'; // pastikan path-nya benar

const RecommendationCard = ({ title, duration, description, image }) => (
  <View style={stylesTopPicks.card}>
    <Image source={{ uri: image }} style={stylesTopPicks.image} />
    <View style={stylesTopPicks.textContainer}>
      <Text style={stylesTopPicks.duration}>{duration}</Text>
      <Text style={stylesTopPicks.cardTitle}>{title}</Text>
      <Text style={stylesTopPicks.description}>{description}</Text>
    </View>
  </View>
);   

const stylesTopPicks = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 120,
    height: 170,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  duration: {
    color: 'green',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  description: {
    fontSize: 12,
    color: '#555',
  },
});

export default RecommendationCard;

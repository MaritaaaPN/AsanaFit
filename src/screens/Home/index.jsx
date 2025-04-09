import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, FlatList, Pressable } from 'react-native';
import { SearchNormal } from 'iconsax-react-native';
import { fontType, colors } from '../../theme';
import { sessions, cardData, recommendations } from '../../data';
import { SessionItem, CardItem, RecommendationCard } from '../../components';  

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handlePress = (title) => {
    console.log(`Card "${title}" pressed`);
  };

  const filteredSessions = sessions.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>ASANA FIT</Text>
      <Text style={styles.subtitle}>
        Hai User! Mulai aktivitas Anda dengan Program Pemula untuk mempelajari dasar penting Yoga & Fitness.
      </Text>

      {/* Search Bar */}
      <View style={searchBar.searchBar}>
        <TextInput
          style={searchBar.input}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Pressable style={searchBar.button}>
          <SearchNormal size={15} color={colors.white()} />
        </Pressable>
      </View>

      {/* Sesi Latihan */}
      <FlatList
        data={filteredSessions}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <SessionItem item={item} index={index} />}
      />

      <Text style={styles.sectionTitle}>Daily Activities</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {cardData.map((item, index) => (
          <CardItem key={index} item={item} onPress={handlePress} />
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Rekomendasi</Text>
      <FlatList
        data={recommendations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RecommendationCard {...item} />}
      />
    </ScrollView>
  );
};

const searchBar = StyleSheet.create({
  searchBar: { 
    flexDirection: 'row', 
    backgroundColor: '#f1f1f1', 
    borderRadius: 10, 
    padding: 5, 
    marginBottom: 10, 
  },
  input: { 
    flex: 1, 
    padding: 10,
  },
  button: { 
    padding: 10, 
    backgroundColor: 'green', 
    borderRadius: 10,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'green',
  },
  subtitle: {
    fontSize: 14,
    color: 'black',
    marginVertical: 10,
  },
  progressBar: {
    display: 'none',
    // height: 5,
    // backgroundColor: '#ccc',
    // borderRadius: 5,
    // marginVertical: 15,
  },
  sessionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  numberContainer: {
    width: 30,
    height: 30,
    borderRadius: 30, // 30 agar benar-benar bulat
    backgroundColor: '#fff', 
    borderWidth: 1, // Ketebalan garis tepi
    //borderColor: 'green', // Warna garis tepi hijau
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  number: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green'
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: 'green',
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  card: {
    width: 250,
    borderRadius: 15,
    backgroundColor: '#f9f9f9',
    marginRight: 16,
    padding: 12,
    elevation: 4, // Efek bayangan
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

export default Home;

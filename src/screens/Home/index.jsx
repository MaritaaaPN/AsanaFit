import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  FlatList,
  ScrollView,
  Pressable,
} from 'react-native';
import { SearchNormal } from 'iconsax-react-native';
import { fontType, colors } from '../../theme';
import { sessions, cardData, recommendations } from '../../data';
import { SessionItem, CardItem, RecommendationCard } from '../../components';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollClamped = Animated.diffClamp(scrollY, 0, 100);

  // Animasi untuk deskripsi
  const descOpacity = scrollClamped.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const descTranslateY = scrollClamped.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -20],
    extrapolate: 'clamp',
  });

  const filteredSessions = sessions.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Sticky Header */}
      <View style={styles.stickyHeader}>
        <Text style={styles.title}>ASANA FIT</Text>
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
      </View>

      {/* Animated Deskripsi */}
      <Animated.View
        style={[
          styles.animatedDesc,
          {
            opacity: descOpacity,
            transform: [{ translateY: descTranslateY }],
          },
        ]}
      >
        <Text style={styles.subtitle}>
          Hai User! Mulai aktivitas Anda dengan Program Pemula untuk mempelajari dasar penting Yoga & Fitness.
        </Text>
      </Animated.View>

      {/* Scrollable Content */}
      <Animated.ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingTop: 160, paddingBottom: 40 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {/* Sesi Latihan */}
        <FlatList
          data={filteredSessions}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => <SessionItem item={item} index={index} />}
        />

        <Text style={styles.sectionTitle}>Daily Activities</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {cardData.map((item, index) => (
            <CardItem key={index} item={item} onPress={() => {}} />
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Rekomendasi</Text>
        <FlatList
          data={recommendations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RecommendationCard {...item} />}
        />
      </Animated.ScrollView>
    </View>
  );
};

const searchBar = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 5,
    marginTop: 10,
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
    paddingHorizontal: 20,
  },
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 10,
    zIndex: 10,
  },
  animatedDesc: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    zIndex: 9,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: 'black',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: 'green',
  },
});

export default Home;

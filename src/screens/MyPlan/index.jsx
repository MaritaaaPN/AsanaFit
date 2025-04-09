import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { colors, fontType } from '../../theme';
import { scheduleData, statsData, todoData } from '../../data';
import ItemPlan from '../../components/ItemPlan';
import ProgressCircle from '../../components/ProgressCircle';


const MyPlan = () => {
  const [todos, setTodos] = useState(todoData);

  const toggleDone = id => {
    const updated = todos.map(item =>
      item.id === id ? { ...item, done: !item.done } : item
    );
    setTodos(updated);
  };  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>My Plan</Text>

    {/* Weekly Goal Progress */}
    <ProgressCircle value={60} />
    
    {/* Section: Stats */}
    <Text style={styles.subheading}>Statistics</Text>
      <View style={styles.stats}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{statsData.totalSessions}</Text>
          <Text style={styles.statLabel}>Sessions</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{statsData.caloriesBurned}</Text>
          <Text style={styles.statLabel}>Calories</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{statsData.streak}🔥</Text>
          <Text style={styles.statLabel}>Streak</Text>
        </View>
      </View>

      {/* Section: Schedule */}
      <Text style={styles.subheading}>Schedule</Text>
      {scheduleData.map(item => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.cardTitle}>{item.activity}</Text>
          <Text style={styles.cardText}>{item.time} • {item.duration}</Text>
        </View>
      ))}

      {/* Section: To-Do List */}
      <Text style={styles.subheading}>To-Do List</Text>
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ItemPlan
            task={item.task}
            done={item.done}
            onPress={() => toggleDone(item.id)}
          />
        )}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

export default MyPlan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  heading: {
    fontSize: 22,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.green(),
    marginBottom: 16,
  },
  subheading: {
    fontSize: 16,
    fontFamily: fontType['Pjs-SemiBold'],
    color: colors.black(),
    marginBottom: 8,
    marginTop: 20,
  },
  card: {
    backgroundColor: colors.grey(0.05),
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardTitle: {
    fontFamily: fontType['Pjs-Medium'],
    fontSize: 14,
    color: colors.black(),
  },
  cardText: {
    fontFamily: fontType['Pjs-Regular'],
    fontSize: 12,
    color: colors.grey(0.6),
    marginTop: 4,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.grey(0.05),
    borderRadius: 12,
    marginHorizontal: 4,
  },
  statValue: {
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 16,
    color: colors.green(),
  },
  statLabel: {
    fontFamily: fontType['Pjs-Regular'],
    fontSize: 12,
    color: colors.grey(0.6),
    marginTop: 4,
  },
});

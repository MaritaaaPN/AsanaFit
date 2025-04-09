import React, { useState } from 'react';
import {StyleSheet,Text,View,FlatList,TextInput,Alert,} from 'react-native';
import { SearchNormal1 } from 'iconsax-react-native';
import { colors, fontType } from '../../theme';
import { activitiesData } from '../../data';
import ItemActivities from '../../components/ItemActivities';

const Activities = () => {
  const [searchText, setSearchText] = useState('');

  const filteredData = activitiesData.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleActivityPress = item => {
    Alert.alert('Activity Selected', `You pressed: ${item.title}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Discover Activities</Text>

      <View style={styles.searchWrapper}>
        <SearchNormal1 size={18} color={colors.grey(0.5)} />
        <TextInput
          placeholder="Search for yoga or fitness..."
          placeholderTextColor={colors.grey(0.5)}
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {filteredData.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No activities found.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ItemActivities item={item} onPress={handleActivityPress} />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default Activities;

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
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grey(0.05),
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 20,
  },
  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 14,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.black(),
  },
  list: {
    paddingBottom: 20,
  },
  emptyState: {
    marginTop: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.grey(0.5),
  },
});

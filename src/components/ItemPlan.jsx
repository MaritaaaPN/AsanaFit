import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TickCircle, CloseCircle } from 'iconsax-react-native';
import { colors, fontType } from '../theme';

const ItemPlan = ({ task, done, onPress }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={[styles.text, done && styles.doneText]}>{task}</Text>
      {done ? (
        <TickCircle size={20} color={colors.green()} />
      ) : (
        <CloseCircle size={20} color={colors.red()} />
      )}
    </TouchableOpacity>
  );
};  

export default ItemPlan;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: colors.grey(0.05),
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.black(),
  },
  doneText: {
    textDecorationLine: 'line-through',
    color: colors.grey(0.6),
  },
});

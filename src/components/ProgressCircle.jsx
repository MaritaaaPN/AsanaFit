import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { colors, fontType } from '../theme';

const ProgressCircle = ({ value = 65 }) => {
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={230} // Ukuran diperbesar
        width={20}
        fill={value}
        tintColor={colors.green()}
        backgroundColor="#E0E0E0"
        rotation={0}
        duration={1000}
      >
        {(fill) => (
          <Text style={styles.percentageText}>
            {`${Math.round(fill)}%`}
          </Text>
        )}
      </AnimatedCircularProgress>
      <Text style={styles.label}>Progres Mingguan</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 15,
  },
  percentageText: {
    fontFamily: fontType['Poppins-Bold'],
    fontSize: 28,
    color: colors.green(),
  },
  label: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
    fontFamily: fontType['Poppins-Regular'],
  },
});

export default ProgressCircle;
